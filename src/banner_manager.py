#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Functions:
    - insert_banner: insert all banners
    - insert_english_banners: insert english banners
    - insert_french_banners: insert french banners
    - insert_spanish_banners: insert spanish banners

    - remove_language_banners: remove banners for a specific language

    - manage_banners: master function to perform all operations based on parameters
"""

# relvant imports
import os
import re
import glob
import logging
from pathlib import Path
from typing import List, Optional, Dict, Tuple, Callable, Union

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Constants
BANNER_MARKERS = {
    'start': '<!-- BANNER_START -->',
    'end': '<!-- BANNER_END -->'
}

# Path to banner component files
BANNER_COMPONENTS = {
    'en': 'banners/banner_component.html',
    'fr': 'banners/banner_component_fr.html',
    'es': 'banners/banner_component_es.html'
}

# Language directory patterns
LANGUAGE_PATTERNS = {
    'en': ['**/index.html', '**/en/**/*.html'],
    'fr': ['**/fr/**/*.html', '**/fr.html'],
    'es': ['**/es/**/*.html', '**/es.html']
}


def read_banner_component(language: str, base_path: str) -> Optional[str]:
    """
    params - > language,whicherver language is needed
    base_path - > dir with banners
    """
    if language not in BANNER_COMPONENTS:
        logger.error(f"Unknown language: {language}")
        return None
    
    file_path = os.path.join(base_path, BANNER_COMPONENTS[language])
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        logger.error(f"Banner component file not found: {file_path}")
        return None



def get_html_files(base_path: str, patterns: List[str]) -> List[str]:
   # find all matching html files
    all_files = []
    for pattern in patterns:
        # Convert the pattern to an absolute path
        abs_pattern = os.path.join(base_path, pattern)
        matched_files = glob.glob(abs_pattern, recursive=True)
        all_files.extend(matched_files)
    
    # remove duplicates while maintaining order
    return list(dict.fromkeys(all_files))


def insert_banner(html_content: str, banner_content: str) -> str:
   # adds banner to page after teh body tag


    # if banner exixts then remove it
    html_content = remove_banners(html_content)
    
    
    pattern = re.compile(r'<div\s+class="backup-site-banner".*?</div>\s*</div>', re.DOTALL | re.IGNORECASE)
    html_content = re.sub(pattern, '', html_content)
    
    # remove any existing announcement divs at the top
    pattern = re.compile(r'<div[^>]*>\s*This is a backup site current up to 31/07/2025.*?</div>\s*</div>', re.DOTALL | re.IGNORECASE)
    html_content = re.sub(pattern, '', html_content)
    
    # Find the <body> tag
    body_match = re.search(r'<body[^>]*>', html_content, re.IGNORECASE)
    if body_match:
        # Insert banner after the <body> tag
        insert_pos = body_match.end()
        result = (
            html_content[:insert_pos] + 
            f"\n{BANNER_MARKERS['start']}\n{banner_content}\n{BANNER_MARKERS['end']}\n" +
            html_content[insert_pos:]
        )
        return result
    else:
        # If no <body> tag is found, return the original content
        logger.warning("No <body> tag found in HTML content")
        return html_content


def remove_banners(html_content: str) -> str:
    
    # Remove banners
    pattern = re.compile(
        f'{re.escape(BANNER_MARKERS["start"])}.*?{re.escape(BANNER_MARKERS["end"])}',
        re.DOTALL
    )
    html_content = re.sub(pattern, '', html_content)
    
    

    pattern = re.compile(
        r'<div\s+class="backup-site-banner".*?</div>\s*</div>',
        re.DOTALL | re.IGNORECASE
    )
    html_content = re.sub(pattern, '', html_content)
    
    # Remove any other banners that might contain the backup site text
    pattern = re.compile(
        r'<div[^>]*>\s*This is a backup site current up to 31/07/2025.*?</div>\s*</div>',
        re.DOTALL | re.IGNORECASE
    )
    html_content = re.sub(pattern, '', html_content)
    
    
    
    return html_content


def remove_language_banners(html_content: str, language: str) -> str:
    #remove specific language banners
    language_class = f'banner-{language}'

    pattern = re.compile(
        f'{re.escape(BANNER_MARKERS["start"])}.*?class=["\'][^"\']*{language_class}[^"\']*["\'].*?{re.escape(BANNER_MARKERS["end"])}',
        re.DOTALL | re.IGNORECASE
    )
    return re.sub(pattern, '', html_content)


def process_files(
    files: List[str],
    operation: Callable[[str], str],
    dry_run: bool = False
) -> Tuple[int, int]:
    
    success_count = 0
    error_count = 0
    
    for file_path in files:
        try:
            logger.info(f"Processing file: {file_path}")
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
                
            new_content = operation(original_content)
            
            if not dry_run and new_content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                logger.info(f"Updated file: {file_path}")
            success_count += 1
            
        except Exception as e:
            logger.error(f"Error processing {file_path}: {e}")
            error_count += 1
    
    return success_count, error_count


def insert_english_banners(base_path: str, dry_run: bool = False) -> Tuple[int, int]:
    
    banner_content = read_banner_component('en', base_path)
    if not banner_content:
        logger.error("Failed to read English banner component")
        return 0, 0
    

    files = get_html_files(base_path, LANGUAGE_PATTERNS['en'])
    logger.info(f"Found {len(files)} English HTML files to process")
    
    operation = lambda content: insert_banner(content, banner_content)
    return process_files(files, operation, dry_run)


def insert_french_banners(base_path: str, dry_run: bool = False) -> Tuple[int, int]:
    
    banner_content = read_banner_component('fr', base_path)
    if not banner_content:
        logger.error("Failed to read French banner component")
        return 0, 0
    
    files = get_html_files(base_path, LANGUAGE_PATTERNS['fr'])
    logger.info(f"Found {len(files)} French HTML files to process")

    
    operation = lambda content: insert_banner(content, banner_content)
    return process_files(files, operation, dry_run)


def insert_spanish_banners(base_path: str, dry_run: bool = False) -> Tuple[int, int]:
    
    banner_content = read_banner_component('es', base_path)
    if not banner_content:
        logger.error("Failed to read Spanish banner component")
        return 0, 0
    
    
    files = get_html_files(base_path, LANGUAGE_PATTERNS['es'])
    logger.info(f"Found {len(files)} Spanish HTML files to process")
    
    operation = lambda content: insert_banner(content, banner_content)
    return process_files(files, operation, dry_run)


def remove_all_banners(base_path: str, dry_run: bool = False) -> Tuple[int, int]:
    
    # Collect all HTML files from all language patterns
    all_patterns = []
    for patterns in LANGUAGE_PATTERNS.values():
        all_patterns.extend(patterns)
    
    files = get_html_files(base_path, all_patterns)
    logger.info(f"Found {len(files)} HTML files to process")
    
    return process_files(files, remove_banners, dry_run)


def remove_specific_language_banners(
    base_path: str,
    language: str,
    dry_run: bool = False
) -> Tuple[int, int]:
  
    if language not in LANGUAGE_PATTERNS:
        logger.error(f"Unknown language: {language}")
        return 0, 0
    
    files = get_html_files(base_path, LANGUAGE_PATTERNS[language])
    logger.info(f"Found {len(files)} {language} HTML files to process")
    
    operation = lambda content: remove_language_banners(content, language)
    return process_files(files, operation, dry_run)


def manage_banners(
    base_path: str,
    action: str,
    language: Optional[str] = None,
    dry_run: bool = False
) -> Dict[str, Union[int, str]]:
   
    results = {
        'action': action,
        'language': language,
        'success_count': 0,
        'error_count': 0,
        'status': 'success'
    }
    
    try:
        if action == 'insert':
            if not language:
                logger.error("Language must be specified for insert action")
                results['status'] = 'error'
                results['message'] = "Language must be specified for insert action"
                return results
            
            if language == 'en':
                success, errors = insert_english_banners(base_path, dry_run)
            elif language == 'fr':
                success, errors = insert_french_banners(base_path, dry_run)
            elif language == 'es':
                success, errors = insert_spanish_banners(base_path, dry_run)
            else:
                logger.error(f"Unsupported language: {language}")
                results['status'] = 'error'
                results['message'] = f"Unsupported language: {language}"
                return results
                
        elif action == 'remove':
            if language:
                success, errors = remove_specific_language_banners(base_path, language, dry_run)
            else:
                success, errors = remove_all_banners(base_path, dry_run)
                
        elif action == 'remove_all':
            success, errors = remove_all_banners(base_path, dry_run)
            
        else:
            logger.error(f"Unknown action: {action}")
            results['status'] = 'error'
            results['message'] = f"Unknown action: {action}"
            return results
            
        results['success_count'] = success
        results['error_count'] = errors
        
        message = f"{action.capitalize()} completed: {success} files processed successfully, {errors} errors"
        results['message'] = message
        logger.info(message)
        
    except Exception as e:
        logger.error(f"Error in manage_banners: {e}")
        results['status'] = 'error'
        results['message'] = str(e)
    
    return results


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Manage banner components for multilingual website")
    parser.add_argument("--action", required=True, choices=["insert", "remove", "remove_all"], 
                        help="Action to perform")
    parser.add_argument("--language", choices=["en", "fr", "es"], 
                        help="Language to process (required for insert)")
    parser.add_argument("--path", default=".", help="Base path to process (default: current directory)")
    parser.add_argument("--dry-run", action="store_true", help="Don't modify files, just simulate")
    
    args = parser.parse_args()
    
    result = manage_banners(args.path, args.action, args.language, args.dry_run)
    
    if result['status'] == 'success':
        exit_code = 0
    else:
        exit_code = 1
        
    import sys
    sys.exit(exit_code)
