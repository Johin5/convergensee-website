// ─── Case studies from the website copy doc (Website - ConvergenSEE.pdf) ──────
// Anonymised exactly as the doc writes them. Each entry drives a full detail
// page at /case-studies/<slug> rendered by CaseStudyDetailPage; the grid tiles
// on /case-studies link here. Server-safe: strings and paths only, no hooks.

export const CASE_STUDIES = [
  {
    slug: 'life-insurance',
    name: 'Leading Life Insurance Brand',
    metaTitle: 'Life Insurance Case Study',
    metaDescription:
      'How ConvergenSEE helped a leading life insurance brand scale content operations through CreateIT: 42% faster creative delivery and nearly 50% less time-to-market.',
    heroImage: '/artboard-1.png',
    type: 'Content at scale',
    tagline:
      'Helping a leading life insurance brand scale content faster: nearly 200 creatives a month, planned, produced and delivered through CreateIT.',
    stats: [
      { val: '42%', label: 'Faster creative delivery timelines' },
      { val: '~50%', label: 'Reduction in time-to-market' },
      { val: '2x', label: 'Designer productivity, from 2 to 3-4 creatives a day' },
    ],
    challenge: [
      'The brand needed a large volume of creatives every month, nearly 200, each requiring multiple channel versions.',
      'Even simple emailers with adapts were taking 3–4 days to turn around.',
      'Slow delivery was holding up campaign rollouts and creating operational bottlenecks for the team.',
    ],
    solution: [
      "ConvergenSEE enabled the brand's content operations through CreateIT, bringing structure and consistency to how creatives were planned, produced and delivered.",
      'Introduced clearer briefing formats to reduce rework, and streamlined workflows across creation, adapts, feedback and approvals.',
      'Reduced dependency on manual coordination between teams, and established a scalable production process that supported high-volume content needs.',
    ],
    highlights: [
      { val: '33%', label: 'Reduction in creative resource requirement', tag: 'Content at scale' },
      { val: '200', label: 'Creatives a month, each with multiple channel versions, delivered without bottlenecks', tag: 'CreateIT' },
    ],
  },
  {
    slug: 'small-finance-bank',
    name: 'Emerging Small Finance Bank',
    metaTitle: 'Small Finance Bank Case Study',
    metaDescription:
      'How ConvergenSEE helped an emerging small finance bank scale digital performance marketing through AmplifyIT on CHNC: 5,500+ conversions at ₹192 per conversion in a 90-day pilot.',
    heroImage: '/figma/case-study/img-mahindra4.jpg',
    type: 'Performance marketing',
    tagline:
      'Helping an emerging small finance bank scale digital performance marketing: a 90‑day pilot across Fixed Deposits and Personal Loans, run through AmplifyIT on CHNC.',
    stats: [
      { val: '5,500+', label: 'Conversions: loan enquiries submitted and FD app downloads' },
      { val: '₹192', label: 'Cost per conversion' },
      { val: '7 Cr+', label: 'Impressions across Meta, Google and retargeting' },
    ],
    challenge: [
      'The bank was moving from traditional offline sales channels to digital performance marketing, with two products in scope: Fixed Deposits and Personal Loans.',
      'The goal: test whether performance marketing could deliver higher-quality leads than direct selling agents, at a lower cost per disbursal.',
      'Both products needed awareness, app installs for the FD journey, and high-quality, intent-verified leads for Personal Loans, inside 90 days.',
    ],
    solution: [
      'ConvergenSEE ran a multi-channel performance campaign through AmplifyIT on CHNC: Meta, Google and retargeting campaigns managed through one command centre.',
      'Built an intelligence layer on top that reads every signal and every rupee spent, tracking performance in real time, so spend could be optimised as it happened.',
      'Delivered visibility into exactly what was working, channel by channel.',
    ],
    highlights: [
      { val: '16.5L+', label: 'Total clicks across the 90‑day pilot', tag: 'AmplifyIT' },
      { val: '2', label: 'Products scaled: Fixed Deposits and Personal Loans', tag: 'Performance marketing' },
    ],
  },
]

export const findCaseStudyBySlug = (slug) => CASE_STUDIES.find((c) => c.slug === slug)
