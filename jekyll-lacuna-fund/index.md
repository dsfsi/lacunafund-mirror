---
layout: lacuna
home_hero: true
title: Putting the benefits of machine learning within reach of data scientists, researchers, and social entrepreneurs worldwide.
intro: We mobilize funding for training and evaluation data that solve urgent problems in low- and middle-income contexts globally.
---

<div class="cards"><div class="card"><h3>Our Voice in Data</h3><p>Lacuna Fund — Our Voice in Data from Meridian Institute on Vimeo.</p><p><a class="button" href="https://vimeo.com/867005447">Watch on Vimeo</a></p></div><div class="card"><h3>Explore or apply</h3><p>Discover open datasets and current funding opportunities.</p><p><a href="{{ '/datasets/' | relative_url }}">Explore datasets</a> · <a href="{{ '/apply/' | relative_url }}">Apply for funding</a></p></div></div>

## A first-of-its-kind funder collaborative

Machine learning has shown great potential to address critical needs, but in low- and middle-income contexts globally, a lack of unbiased training and evaluation data puts the benefits out of reach. Lacuna Fund is the world's first collaborative effort to directly address this problem.

Guided by machine learning professionals worldwide, Lacuna Fund provides data scientists, researchers, and social entrepreneurs with resources to produce new training and evaluation data, augment existing datasets to be more representative, or update old datasets to be more sustainable.

<div class="stats"><div class="stat"><strong>{{ site.data.datasets.agriculture.size | plus: site.data.datasets.language.size | plus: site.data.datasets.health.size | plus: site.data.datasets.climate.size }}</strong>Funded datasets listed</div><div class="stat"><strong>4</strong>Domain areas funded</div><div class="stat"><strong>12</strong>Technical advisory panels</div><div class="stat"><strong>8</strong>Funding partners</div></div>

## Filling in the international data map

<div class="cards">{% assign domains = 'agriculture,language,health,climate' | split: ',' %}{% for domain in domains %}<div class="card"><h3>{{ domain | capitalize }}</h3><p>{% if domain == 'agriculture' %}Providing personalized services to smallholder farmers through remote sensing and other critical datasets.{% elsif domain == 'language' %}Translation, speech recognition, and datasets that enable digital communication for all.{% elsif domain == 'health' %}Improving the robustness and availability of AI solutions in healthcare across the value chain.{% else %}Machine learning models made by and for communities most affected by climate change.{% endif %}</p><p><a href="{{ '/datasets/' | append: domain | append: '/' | relative_url }}">Learn more</a></p></div>{% endfor %}</div>

## Supported by a multi-stakeholder collaborative

Lacuna Fund began as a funder collaborative between The Rockefeller Foundation, Google.org, and Canada's International Development Research Centre, and has evolved into a multi-stakeholder engagement supported by development, philanthropic, and research institutions.

<p><a href="{{ '/governance/funders/' | relative_url }}">Learn about our funders collaborative</a></p>
