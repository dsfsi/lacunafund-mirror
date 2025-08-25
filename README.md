Lacuna Fund Website Mirror
==============================

Last updated: August 2025

## Table of contents 
1. [Purpose of the Backup Site](#purpose-of-the-backup-site)
2. [Project Organization](#project-organization)
3. [Instructions for Maintaining the Site](#instructions-for-maintaining-the-site)
   - [GitHub Pages Deployment](#github-pages-deployment)
   - [File Structure](#file-structure)
   - [How to Update Banners](#how-to-update-banners)
   - [Banner Format](#banner-format)
   - [Usage](#usage)
     - [Updating the Banner Date](#updating-the-banner-date)
     - [Command-line Interface](#command-line-interface)
     - [As a Module](#as-a-module)
4. [Link to Live GitHub Pages URL](#link-to-live-github-pages-url)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Authors](#authors)
   - [Contributions](#contributions)

## Purpose of the Backup Site 

This repository contains a static HTTrack backup of the Lacuna Fund website (lacunafund.org). The purpose of this backup site is to:

1. Provide a fallback option if the primary Lacuna Fund website becomes unavailable
2. Preserves a snapshot of the Lacuna Fund website and its content
3. Serve as an emergency alternative accessible through GitHub Pages
4. Maintain access to important Lacuna Fund information and resources 



## Project Organization

    ├── LICENSE
    ├── Makefile           <- Makefile with commands like `make data` or `make train`
    ├── README.md          <- The top-level README for developers using this project.
    ├── data
    │   ├── external       <- Data from third party sources.
    │   ├── interim        <- Intermediate data that has been transformed.
    │   ├── processed      <- The final, canonical data sets for modeling.
    │   └── raw            <- The original, immutable data dump.
    │
    ├── docs               <- A default Sphinx project; see sphinx-doc.org for details
    │
    ├── models             <- Trained and serialized models, model predictions, or model summaries
    │
    ├── notebooks          <- Jupyter notebooks. Naming convention is a number (for ordering),
    │                         the creator's initials, and a short `-` delimited description, e.g.
    │                         `1.0-jqp-initial-data-exploration`.
    │
    ├── references         <- Data dictionaries, manuals, and all other explanatory materials.
    │
    ├── reports            <- Generated analysis as HTML, PDF, LaTeX, etc.
    │   └── figures        <- Generated graphics and figures to be used in reporting
    │
    ├── requirements.txt   <- The requirements file for reproducing the analysis environment, e.g.
    │                         generated with `pip freeze > requirements.txt`
    │
    ├── setup.py           <- makes project pip installable (pip install -e .) so src can be imported
    ├── src                <- Source code for use in this project.
    │   ├── __init__.py    <- Makes src a Python module
    │   │
    │   ├── data           <- Scripts to download or generate data
    │   │   └── make_dataset.py
    │   │
    │   ├── features       <- Scripts to turn raw data into features for modeling
    │   │   └── build_features.py
    │   │
    │   ├── models         <- Scripts to train models and then use trained models to make
    │   │   │                 predictions
    │   │   ├── predict_model.py
    │   │   └── train_model.py
    │   │
    │   └── visualization  <- Scripts to create exploratory and results oriented visualizations
    │   |    └── visualize.py
    │   │
    │   └── banner_manager.py <- Script for managing the banner across all HTML pages
    │
    └── tox.ini            <- tox file with settings for running tox; see tox.testrun.org
    |
    |
    ├── .github
    │   └── workflows      <- GitHub Actions workflow for deploying to GitHub Pages
    │       └── github-pages.yml
    │
    └── lacunafund-httrack-backup <- The HTTrack backup of the lacunafund.org site
        └── banners        <- Contains banner HTML components for different languages
            ├── banner_component.html      <- English banner
            ├── banner_component_fr.html   <- French banner
            └── banner_component_es.html   <- Spanish banner

## Instructions for Maintaining the Site

### GitHub Pages Deployment

The site is automatically deployed to GitHub Pages using the workflow in `.github/workflows/github-pages.yml`. The workflow:

1. Runs when changes are pushed to the master branch
2. Creates a `_site` directory
3. Copies the lacunafund.org backup content to the `_site` directory
4. Deploys the content to GitHub Pages

### File Structure

The banner components should be stored in the following files:

- `banner_component.html` - English banner
- `banner_component_fr.html` - French banner
- `banner_component_es.html` - Spanish banner

### How to Update Banners

1. **Locate the banners folder** in the lacunafund-httrack-backup directory
2. **Edit the banner HTML files** for the language(s) you want to update:
   - `banner_component.html` - English banner
   - `banner_component_fr.html` - French banner
   - `banner_component_es.html` - Spanish banner
3. **Remove existing banners** using the remove command (either remove all banners or specific language banners)
4. **Insert updated banners** using the appropriate insert command for each language

### Banner Format

Banners are inserted after the opening `<body>` tag and are wrapped with marker comments:

```html
<!-- BANNER_START -->
<div class="banner banner-en">
    <!-- Banner content here -->
</div>
<!-- BANNER_END -->
```

### Usage

#### Updating the Banner Date

To update the date displayed in the backup site banner:

1. **Edit the banner component files** in the `lacunafund-httrack-backup/banners/` directory:
   - Edit `banner_component.html` (English) and find this line:
     ```html
     This is a backup site current up to 31/07/2025
     ```
   - Replace "31/07/2025" with the current backup date (DD/MM/YYYY format)
   - Repeat for `banner_component_fr.html` (French) and `banner_component_es.html` (Spanish)

2. **Apply the updated banners** using the banner manager script (see command-line interface below)

#### Command-line Interface

```bash
#STEP 1: Remove existing banners before updating
#remove all banners
python banner_manager.py --action remove_all --path ..\lacunafund-httrack-backup

#OR remove only specific language banners
python banner_manager.py --action remove --language en --path ..\lacunafund-httrack-backup
python banner_manager.py --action remove --language fr --path ..\lacunafund-httrack-backup
python banner_manager.py --action remove --language es --path ..\lacunafund-httrack-backup

#STEP 2: Insert updated banners
#insert English banners
python banner_manager.py --action insert --language en --path ..\lacunafund-httrack-backup

#insert French banners
python banner_manager.py --action insert --language fr --path ..\lacunafund-httrack-backup

#insert Spanish banners
python banner_manager.py --action insert --language es --path ..\lacunafund-httrack-backup

#optional: Dry run (simulate without making changes)
python banner_manager.py --action insert --language en --path ..\lacunafund-httrack-backup --dry-run
```

#### As a Module

```python
from banner_manager import manage_banners

#insert English banners
result = manage_banners("/path/to/site", "insert", "en")

#insert French banners
result = manage_banners("/path/to/site", "insert", "fr")

#insert Spanish banners
result = manage_banners("/path/to/site", "insert", "es")

#remove specific language banners
result = manage_banners("/path/to/site", "remove", "en")

#remove all banners
result = manage_banners("/path/to/site", "remove_all")

#check result
if result['status'] == 'success':
    print(f"Success: {result['message']}")
else:
    print(f"Error: {result['message']}")
```

## Link to Live GitHub Pages URL

The backup site is accessible at: [lacunafund.org](https://www.dsfsi.co.za/lacunafund-mirror/lacunafund.org/index.html)

## Prerequisites 

Provide a summary of the list software and the version required to run the code. An example of this is : 

- Python 3.11.3 

## Installation 

Provide the instructions and code necessary to setup the required software environment for the code. An example of this is : 

1. Run the setup.py to build the src python package
2. Run the requirements.txt to install all the required libraries, modules, and packages.  

```
python setup.py install
pip install -r requirements.txt 
```

## Authors 

* Written by : 
* Contact details : 

### Contributions  

This is optional and provides information about which and how each of the developers contributed.

--------

<p><small>Project based on the <a target="_blank" href="https://drivendata.github.io/cookiecutter-data-science/">cookiecutter data science project template</a>. #cookiecutterdatascience</small></p>