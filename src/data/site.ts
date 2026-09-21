/**
 * All website content lives here, separated from the UI components.
 * To add or edit information, change this file (and src/data/datasets.json)
 * without touching layout code.
 */

export const site = {
  name: "Lacuna Fund",
  tagline: "Mobilizing funding for labeled datasets that solve urgent problems",
  secretariatUrl: "https://merid.org/",
};

export type NavItem = {
  label: string;
  to: string;
  icon: string;
  children?: { label: string; to: string; hash?: string }[];
};

export const navigation: NavItem[] = [
  { label: "Home", to: "/", icon: "home" },
  {
    label: "About",
    to: "/about",
    icon: "info",
    children: [
      { label: "Guiding Principles", to: "/governance", hash: "guiding-principles" },
      { label: "Our Grantmaking", to: "/about", hash: "grantmaking" },
    ],
  },
  {
    label: "Governance",
    to: "/governance",
    icon: "network",
    children: [
      { label: "Steering Committee", to: "/governance/steering-committee" },
      { label: "Technical Advisory Panels", to: "/governance/technical-advisory-panels" },
      { label: "Funders", to: "/governance/funders" },
    ],
  },
  {
    label: "Datasets",
    to: "/datasets",
    icon: "database",
    children: [
      { label: "Agriculture", to: "/datasets/agriculture" },
      { label: "Language", to: "/datasets/language" },
      { label: "Health", to: "/datasets/health" },
      { label: "Climate", to: "/datasets/climate" },
    ],
  },
  { label: "Apply", to: "/apply", icon: "send" },
];

export const home = {
  headline:
    "Putting the benefits of machine learning within reach of data scientists, researchers, and social entrepreneurs worldwide.",
  subhead:
    "We mobilize funding for labeled datasets that solve urgent problems in low- and middle-income contexts globally",
  video: {
    title: "Our Voice in Data",
    caption: "Lacuna Fund - Our Voice in Data from Meridian Institute on Vimeo",
    url: "https://vimeo.com/867005447",
  },
  intro: [
    "Machine learning has shown great potential to address critical needs, but in low- and middle-income contexts globally, a lack of unbiased, labeled data puts the benefits out of reach. Lacuna Fund is the world's first collaborative effort to directly address this problem.",
    "Guided by machine learning professionals worldwide, Lacuna Fund will provide data scientists, researchers, and social entrepreneurs with the resources they need to either produce new labeled datasets to address an underserved population or problem, augment existing datasets to be more representative, or update old datasets to be more sustainable.",
  ],
  fundingPartnersIntro:
    "Lacuna Fund began as a funder collaborative between The Rockefeller Foundation, Google.org, and Canada's International Development Research Centre, but it has since evolved into a multi-stakeholder engagement supported by a range of development, philanthropic, and research institutions.",
  quote: {
    text: "Labeled data is the fuel for machine learning. We're proud to launch Lacuna Fund to give the next generation of engineers and scientists worldwide the fuel they need to build tools that strengthen agriculture systems, support health decisions, and enable natural language processing.",
    author: "Evan Tachovsky",
    role: "Director and Lead Data Scientist, The Rockefeller Foundation",
  },
  pillars: [
    {
      title: "Our Structure",
      body: "Lacuna Fund is a funder collaborative with robust multi-stakeholder decision-making.",
      linkLabel: "Governance",
      to: "/governance",
    },
    {
      title: "Our Funding",
      body: "Explore the domain areas Lacuna Fund grants in and learn about our application process.",
      linkLabel: "Apply",
      to: "/apply",
    },
    {
      title: "Our Story",
      body: "Learn more about the need Lacuna Fund addresses and the Fund's principles.",
      linkLabel: "About",
      to: "/about",
    },
  ],
};

export const about = {
  intro:
    "Lacuna Fund is the world's first collaborative effort to provide data scientists, researchers, and social entrepreneurs in low- and middle-income contexts globally with the resources they need to produce labeled datasets that address urgent problems in their communities.",
  need: [
    "Machine learning has shown great potential to revolutionize everything from how farmers increase their crop yields, to how governments communicate with their citizens during natural disasters, to how healthcare providers respond to global pandemics.",
    "But in low- and middle-income contexts globally, a lack of labeled and unbiased data puts the benefits of machine learning out of reach.",
    "In many cases, data required to build AI applications for real-world problems doesn't exist. And where it does exist, it's often outdated, missing key information, or not representative of underserved populations, leading to bias and decreased accuracy.",
    "Machine learning tools then \u201clearn\u201d these biases, which can lead to harmful outcomes for people of color, women, and other marginalized populations.",
  ],
  collaborative: [
    "Lacuna Fund will provide data scientists, researchers, and social entrepreneurs in low- and middle-income contexts globally with the resources they need to either produce new datasets to address an underserved population or problem, augment existing datasets to be more representative, or update old datasets to be more sustainable.",
    "Guided by machine learning professionals worldwide, Lacuna Fund is designed for and by the communities it will serve.",
    "All datasets produced will be locally developed and owned, and they will be openly accessible to the international community while adhering to best practices regarding ethics and privacy.",
  ],
  pressRelease: {
    label: "Read the press release from the launch of Lacuna Fund",
    url: "https://www.dsfsi.co.za/lacunafund-mirror/wp-content/uploads/sites/11/2020/07/Lacuna-Fund_-Launch-Press-Release-Web.pdf",
  },
  domainsIntro:
    "Worldwide, there are data gaps that lead to less robust and potentially harmful machine learning outcomes. Lacuna Fund is working to fill these gaps in several domains.",
  grantmaking: [
    "The Steering Committee has chosen to focus Lacuna Fund's grantmaking to support the creation, expansion, and maintenance of labeled datasets in three domain areas with key needs: agriculture, health, language, and climate.",
    "We accept applications from non-profit entities, research institutions, for-profit social enterprises, or teams of such organizations through our requests for proposals (RFPs). Organizations seeking to apply should have the technical capacity to conduct dataset labeling, creation, expansion, and/or maintenance.",
    "One requirement of applicants is that the datasets are locally developed and owned. We believe that local researchers need to create this data and see it through to implementation because that's where the greatest potential for systemic change lies.",
  ],
  aims: [
    "Disburse funds to institutions to create, expand, and/or maintain datasets that fill gaps and reduce bias in training data used for machine learning.",
    "Make it possible for underserved populations to take advantage of advances offered by AI.",
    "Deepen understanding by the machine learning and philanthropy communities of how to most effectively and efficiently fund development and maintenance of equitably labeled datasets.",
  ],
  aimsBody: [
    "While Lacuna Fund's objective is to produce more equitable open source datasets, this is bigger than just data collection and labeling. We are working towards data collection protocols that ensure the data is scalable and replicable.",
    "We endeavor to see these protocols applied to other regions and sectors in the future, thereby catalyzing sustainable funding for this essential work.",
    "By helping build the capacity of local organizations to be data collectors, curators, and owners, our goal is to empower these changemakers with the data resources they need to uncover new insights and solutions, embrace innovative solutions, and ultimately fuel systemic change within their communities.",
  ],
};

export type Domain = {
  key: "agriculture" | "language" | "health" | "climate";
  label: string;
  icon: string;
  summary: string;
  datasetIntro: string;
  to: string;
};

export const domains: Domain[] = [
  {
    key: "agriculture",
    label: "Agriculture",
    icon: "sprout",
    summary:
      "Providing personalized services to smallholder farmers is difficult if the data needed to accurately estimate crop yields does not exist. Lacuna Fund grantees are enabling new and more robust AI applications through remote sensing and other critical datasets.",
    datasetIntro:
      "Lacuna Fund agriculture datasets unlock the power of machine learning to alleviate food security challenges, spur economic opportunities, and give researchers, farmers, communities, and policymakers access to superior agricultural datasets. Learn more and download released datasets below.",
    to: "/datasets/agriculture",
  },
  {
    key: "language",
    label: "Language",
    icon: "languages",
    summary:
      "If automated speech recognition (ASR) systems are only built for a small percentage of international languages, the result is a pronounced gap in access to the digital world that is glaring in low- and middle-income contexts globally. Translation, speech recognition, and more datasets enable the promise of digital communication for all.",
    datasetIntro:
      "Lacuna Fund language datasets create openly accessible text and speech resources that fuel natural language processing technologies in diverse languages across low- and middle-income contexts globally. Explore and download released datasets below.",
    to: "/datasets/language",
  },
  {
    key: "health",
    label: "Health",
    icon: "heart-pulse",
    summary:
      "AI can inform healthcare responses, but only with available and representative data. Lacuna Fund health datasets are improving the robustness and availability of AI solutions in healthcare across the value chain.",
    datasetIntro:
      "Lacuna Fund health datasets reduce health disparities by helping providers and patients make decisions that lead to more equitable healthcare outcomes. These datasets can be used to train chatbots, provide reliable medical information to the public, assist with disease screening and diagnosis, and assess the health and treatment of large populations over time (e.g. maternal health or HIV data). Learn more and download released datasets below.",
    to: "/datasets/health",
  },
  {
    key: "climate",
    label: "Climate",
    icon: "cloud-sun",
    summary:
      "Climate change disproportionately affects people in low-and middle-income contexts. Yet often these communities do not have the information they need to make informed decisions about how to mitigate or prepare for climate change. Lacuna Fund supports the creation of machine learning models made by and for communities across the globe most affected by climate change.",
    datasetIntro:
      "Lacuna Fund supports the creation of machine learning datasets and models made by and for communities across the globe most affected by climate change. Climate grantmaking is guided by dedicated climate technical advisory panels.",
    to: "/datasets/climate",
  },
];

export const governance = {
  intro:
    "Lacuna Fund began as a funder collaborative, but it has since evolved into a multi-stakeholder engagement composed of technical experts, thought leaders, local beneficiaries, and end users.",
  principlesIntro:
    "Guided by machine learning professionals worldwide, Lacuna Fund is designed for and by the communities it will serve. Our governance is a multi-tiered structure rooted in the following principles.",
  principles: [
    {
      title: "Accessibility",
      body: "Lacuna Fund is committed to ensuring that labeled datasets created through its funding are accessible to and benefit underserved communities in service of the Fund's goals. Datasets and related intellectual property will utilize appropriate open data licensing to maximize responsible downstream use. (See IP policy for additional details.)",
    },
    {
      title: "Equity",
      body: "Lacuna Fund aims to make AI more equitable by creating datasets that are representative of the Global South and people of color globally and their needs. These datasets should not create or reinforce bias.",
    },
    {
      title: "Ethics",
      body: "Lacuna Fund will fund data collection in a manner consistent with ethical labor standards and require subgrantees to outline steps they will take to protect privacy and prevent harm in the collection, licensing, and use of datasets created with grant funds.",
    },
    {
      title: "Participatory Approach",
      body: "Lacuna Fund strives to meet the needs of affected stakeholders by involving local beneficiaries and end users in the governance of the project as well as in data creation.",
    },
    {
      title: "Quality",
      body: "Data generated by funded efforts should be of high quality, enabling beneficial applications in research, communities, and industry.",
    },
    {
      title: "Transformational Impact",
      body: "The Fund aims to unlock the advances offered by AI for poor and underserved communities by funding datasets that address fundamental gaps in AI.",
    },
  ],
  bodies: [
    {
      title: "Funders",
      body: "Ranging from public-sector agencies to private philanthropies, our funders enable the Lacuna Fund to advance a vision of machine learning that serves the world more equitably.",
      to: "/governance/funders",
      linkLabel: "Learn more about our funders",
    },
    {
      title: "Steering Committee",
      body: "Lacuna Fund is governed by a representative Steering Committee comprised of 5-9 members, with a balance of perspectives that serves the principles of Lacuna Fund. The committee provides strategic direction and oversight for the Fund, working to ensure the Fund's focus, impact, and growth.",
      to: "/governance/steering-committee",
      linkLabel: "Meet the Steering Committee",
    },
    {
      title: "Technical Advisory Panels",
      body: "Domain-specific technical advisory panels (TAPs) provide technical guidance for the Fund, advising on the focus of requests for proposals within each domain area, selecting proposals, and distilling learnings from the funding process.",
      to: "/governance/technical-advisory-panels",
      linkLabel: "Meet the Technical Advisory Panels",
    },
  ],
  secretariat:
    "The Secretariat provides backbone support to the Fund as a whole, including managing the RFP process and distribution of funds. Meridian Institute serves as Secretariat for the Lacuna Fund.",
  policies: [
    {
      label: "Datawise Impact Assessment Report",
      url: "/reports/lacuna-fund-datasets-impact-assessment-report.pdf",
    },
    {
      label: "Conflict of Interest Policy",
      url: "https://www.dsfsi.co.za/lacunafund-mirror/wp-content/uploads/sites/11/2024/04/COI-Policy_LacunaFund.pdf",
    },
    {
      label: "Intellectual Property Policy",
      url: "https://www.dsfsi.co.za/lacunafund-mirror/wp-content/uploads/sites/11/2024/04/IP-Policy_LacunaFund.pdf",
    },
  ],
};

export const steeringCommittee = {
  intro:
    "The Steering Committee governs Lacuna Fund, while maintaining a balance of perspectives that serve our Guiding Principles. Steering Committee members possess an understanding of labeled data globally, and potential transformative interventions in the space of machine learning, equity, and development. They also help us leverage strong relationships with broader communities critical to the Fund's success.",
  role: "Our Steering Committee provides strategic direction and oversight for the Lacuna Fund, working to ensure the Fund's focus, impact, and growth.",
  members: ["Balthas Seibold", "Shikoh Gitau", "Teki Akuetteh"],
};

export const taps = {
  intro:
    "We establish an independent Technical Advisory Panel (TAP) for each Request for Proposals (RFP). TAP members bring strong technical and domain knowledge, and are responsible for identifying data gaps, refining RFPs, and reviewing and selecting proposals for funding. They also outline insights from the funding process and make recommendations for future funding considerations. TAP members contribute their time on a voluntary basis.",
  panels: [
    { year: "2025", name: "Climate and Health" },
    { year: "2024", name: "Antimicrobial Resistance" },
    { year: "2024", name: "Language" },
    { year: "2023", name: "Climate and Forests" },
    { year: "2023", name: "Sexual, Reproductive and Maternal Health and Rights (SRMHR)" },
    { year: "2022", name: "Climate and Health" },
    { year: "2022", name: "Climate and Energy" },
    { year: "2021", name: "Language" },
    { year: "2021", name: "Agriculture" },
    { year: "2021", name: "Equity and Health" },
    { year: "2020", name: "Language" },
    { year: "2020", name: "Agriculture" },
  ],
};

export const funders = {
  intro:
    "Lacuna Fund began as a funder collaborative between The Rockefeller Foundation, Google.org, and Canada's International Development Research Centre, but it has since evolved into a multi-stakeholder engagement supported by a range of development, philanthropic, and research institutions. Collectively, we are committed to creating and mobilizing labeled datasets that both solve urgent local problems and lead to a step change in machine learning's potential worldwide.",
  callout: {
    text: "This project is part of a global IDRC-funded initiative on AI for Global Health",
    url: "https://ai-globalhealthresearch.tghn.org/",
  },
  list: [
    {
      name: "The Rockefeller Foundation",
      body: "The Rockefeller Foundation advances new frontiers of science, data, policy and innovation to solve global challenges related to health, food, power and economic mobility. As a science-driven philanthropy focused on building collaborative relationships with partners and grantees, the Foundation seeks to inspire and foster large-scale human impact that promotes the well-being of humanity throughout the world by identifying and accelerating breakthrough solutions, ideas and conversations.",
      url: "https://www.rockefellerfoundation.org/commitment/innovation/",
    },
    {
      name: "Google.org",
      body: "Google.org brings the best of Google to help solve some of humanity's biggest challenges \u2013 combining funding, innovation, and technical expertise to support underserved communities and provide opportunity for everyone.",
      url: "http://google.org/",
    },
    {
      name: "International Development Research Centre",
      body: "The International Development Research Centre (IDRC) funds research in the Global South to promote growth, reduce poverty, and drive large-scale positive change. As part of Canada's foreign affairs and development efforts, we are a Crown corporation that provides leading thinkers the resources, advice, and training they need to implement and share their solutions with those who need them most. In short, IDRC increases opportunities \u2014 and makes a real difference in people's lives.",
      url: "https://www.idrc.ca/en",
    },
    {
      name: "German Federal Ministry for Economic Cooperation and Development (BMZ)",
      body: "\u201cFAIR Forward \u2013 Artificial Intelligence for All\u201d is a German Development Cooperation initiative striving for a more open, inclusive and sustainable approach to AI on an international level. It is funded by Germany's national AI strategy, and assists partner countries in building sustainable AI ecosystems, focusing on skills & education, access to AI training data and the development of ethical AI policies. In doing so, FAIR Forward supports the provision of open, non-discriminatory and inclusive training data and open-source AI applications, especially in local languages to empower marginalized groups.",
      url: "https://toolkit-digitalisierung.de/en/fair-forward/",
    },
    {
      name: "Wellcome Trust",
      body: "The Wellcome Trust is a global charitable foundation, driven by a mission to ensure everyone benefits from science's potential to improve health and save lives. Wellcome's Data for Science and Health (DSH) program was set up with the explicit ambition of putting trust into practice through changing how data and software in health are funded, developed and governed. By supporting open source, foundational data and software tools, with a focus on usability, adoption and long-term sustainability, DSH wants to make it easier and more equitable for data scientists globally to innovate with health data.",
      url: "https://wellcome.org/what-we-do/our-work/data-science-and-health-trustworthy-data-science",
    },
    {
      name: "Gordon and Betty Moore Foundation",
      body: "The Gordon and Betty Moore Foundation fosters path-breaking scientific discovery, environmental conservation, patient care improvements and preservation of the special character of the Bay Area.",
      url: "http://www.moore.org/",
    },
    {
      name: "Patrick J. McGovern Foundation",
      body: "The Patrick J. McGovern Foundation is a global philanthropy dedicated to advancing AI and data science solutions to create a thriving, equitable, and sustainable future for all. The Foundation's work focuses on bringing together academia, practitioners, and civil society to pursue the potential of AI and data science to address some of the world's most urgent challenges.",
      url: "https://www.mcgovern.org/",
    },
    {
      name: "The Robert Wood Johnson Foundation",
      body: "The Robert Wood Johnson Foundation (RWJF) is committed to improving health and health equity in the United States. In partnership with others, we are working to develop a Culture of Health rooted in equity that provides every individual with a fair and just opportunity to thrive, no matter who they are, where they live, or how much money they have.",
      url: "http://www.rwjf.org/",
    },
  ],
};

export const datasetsOverview = {
  intro:
    "Lacuna Fund supports the creation, expansion, and maintenance of training and evaluation datasets for machine learning and AI. See below to learn more about supported project teams and published datasets.",
};

export const apply = {
  intro:
    "See open, upcoming, and past RFPs, as well as more information about domain areas and the application.",
  eligibility: [
    "Non-profit entities",
    "Research institutions",
    "For-profit social enterprises",
    "Teams of such organizations",
  ],
  requirements: [
    "Applicants apply through Lacuna Fund's requests for proposals (RFPs).",
    "Organizations should have the technical capacity to conduct dataset labeling, creation, expansion, and/or maintenance.",
    "Datasets must be locally developed and owned.",
    "Data collection must follow ethical labor standards, with steps outlined to protect privacy and prevent harm.",
    "Datasets and related intellectual property use appropriate open data licensing to maximize responsible downstream use.",
  ],
  process: [
    {
      step: "01",
      title: "Technical Advisory Panel convened",
      body: "An independent TAP is established for each RFP, identifying data gaps and refining the RFP focus within a domain area.",
    },
    {
      step: "02",
      title: "Request for proposals released",
      body: "Lacuna Fund accepts applications from eligible organizations and teams through open requests for proposals.",
    },
    {
      step: "03",
      title: "Proposal review and selection",
      body: "TAP members review and select proposals for funding based on technical and domain knowledge.",
    },
    {
      step: "04",
      title: "Grants disbursed by the Secretariat",
      body: "Meridian Institute, as Secretariat, manages the RFP process and the distribution of funds.",
    },
    {
      step: "05",
      title: "Datasets published and learnings shared",
      body: "Datasets are locally owned and openly accessible, and panels distill learnings from the funding process for future funding considerations.",
    },
  ],
};
