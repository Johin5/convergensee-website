// ─── Team groups — careers page team switcher ────────────────────────────────
// Members are referenced by the exact `name` in teamRoster.js, so photos and
// roles stay in one place. A person can appear in more than one group.
//
// `openings` is the live vacancy list for that team and the single source for
// the marquee above it — add a role here and it appears in both places.
// Every opening carries `employmentType` + `experience` (shown on role cards,
// job pages and JobPosting JSON-LD) plus a one-line `summary` for the role
// card. Values marked "authored" (all summaries are) were not in the source
// copy doc and need client sign-off.
//
// Blurbs are the approved department copy from the Aug 2026 website content
// doc (all except Production, which the doc doesn't cover). The groupings were
// inferred from job titles — correct any name into the right list and the UI
// follows.

export const TEAM_GROUPS = [
  {
    name: 'Creative',
    openings: [
      {
        title: 'UI/UX Designer',
        summary: "Own end-to-end product flows for client web builds.", // authored
        employmentType: 'Full-Time',
        experience: '2+ years',
        responsibilities: [
          "Own flows end to end: research, wireframes, prototypes, final UI.",
          "Work directly with engineering so what ships matches what was designed.",
          "Keep the design system honest as products and campaigns pile up.",
        ],
        requirements: [
          "2+ years designing digital products, with a portfolio that shows the thinking.",
          "Fluent in Figma, comfortable with prototyping and handoff.",
          "Able to defend a decision without falling in love with it.",
        ],
      },
      {
        title: 'Copywriter',
        summary: "Write campaigns, scripts and the words brands remember.", // authored
        employmentType: 'Full-Time',
        experience: '1–3 years', // authored
        responsibilities: [
          "Write across campaigns, scripts, decks and long-form, in the client's voice, not yours.",
          "Sit in on strategy early so the words are not bolted on at the end.",
          "Turn a rough brief into three sharp options, fast.",
        ],
        requirements: [
          "A portfolio of published work across at least two formats.",
          "Ruthless with your own drafts and calm about edits.",
          "Reads widely enough to steal well.",
        ],
      },
      {
        title: 'Motion Graphics Designer',
        summary: "Take static concepts into motion for social and film.", // authored
        // Role visual — a wide (16:9) shot used as the page's hero, the way
        // case studies open on campaign art. Give any opening an `image`
        // (+ optional `imageAlt`) and its page opens on it. An .mp4 plays as
        // a muted loop; `imagePoster` shows while it streams in.
        image: '/careers/motion-graphics-designer.mp4',
        imagePoster: '/careers/motion-graphics-designer-poster.jpg',
        imageAlt: 'Racing an office chair past the polaroid wall at ConvergenSEE',
        employmentType: 'Full-Time',
        experience: '2+ years', // authored
        responsibilities: [
          "Take static concepts into motion for social, film and product work.",
          "Build reusable templates the team can run with at volume.",
          "Handle the full chain: storyboard, animate, sound, export.",
        ],
        requirements: [
          "Strong After Effects; Cinema 4D or Blender is a plus.",
          "A reel that shows timing and craft, not just plugins.",
          "Delivers to spec across every platform's format list.",
        ],
      },
    ],
    blurb: 'We think as far as we can for your brand. Bold ideas, sharp execution, and the creativity to make you stand out. Then we bring it all to life with care and precision.',
    members: [
      'Vrajesh Daru', 'Rakshita Srivastava', 'Raj Sawant',
      'Ganesh Yedala', 'Wilson Thomas', 'Shreya Chavan', 'Sonali Belwalkar',
      'Advait Dawal', 'Moazzam Ali', 'Mustafa Ansari', 'Sandesh Singh',
      'Sanika Nagulkar', 'Harshali Sonawane', 'Fawwaz Bhati', 'Divya Mittal',
      'Keerti Varma',
    ],
  },
  {
    name: 'Business Operations',
    openings: [
      {
        title: 'Business Operations Associate',
        summary: "Keep projects, budgets and timelines moving across accounts.", // authored
        employmentType: 'Full-Time',
        experience: '1+ year',
        responsibilities: [
          "Keep projects, budgets and timelines moving across every account.",
          "Run the vendor and procurement chase so no delivery slips.",
          "Turn recurring chaos into a process the team actually follows.",
        ],
        requirements: [
          "1+ year in operations, project coordination or account support.",
          "Spreadsheet-fluent and stubborn about follow-ups.",
          "Stays organised when five things land at once.",
        ],
      },
    ],
    blurb: "We work with brands every single day to make sure everything runs smoothly. Communication, execution, support: we're the ones making sure you always feel taken care of.",
    members: [
      'Bhawani Singh Bhati', 'Palak Kothari', 'Rakshit Bangera',
      'Rohan Kharwar', 'Rohit Kanojiya', 'Tanvi Jadhav', 'Vikrant Shedge',
      'Priya Thakur', 'Janhavi Thorat', 'Nikita Salve',
    ],
  },
  {
    name: 'People Experience',
    openings: [],
    blurb: 'We make sure people have a great time. Our job is helping brands perform while keeping the human experience at the center. Results matter, but so does how people feel along the way!',
    members: [
      'Minakshi Chaugule', 'Sailesh Nair', 'Amin Khan', 'Prashant Birjudar',
      'Kishor Gaikwad', 'Pranay Valecha', 'Sakshi Bhushan Mandekar',
    ],
  },
  {
    name: 'Digital Strategy',
    openings: [
      {
        title: 'Senior Performance Marketer',
        summary: "Run and scale paid media across Meta and Google.", // authored
        employmentType: 'Full-Time',
        experience: '3+ years',
        responsibilities: [
          "Plan, run and scale paid media across Meta, Google and emerging platforms.",
          "Own the number (spend, CAC, ROAS) and the story behind it.",
          "Test relentlessly and kill what does not work early.",
        ],
        requirements: [
          "3+ years running paid budgets at meaningful scale.",
          "Comfortable in the data, not just the dashboards.",
          "Can explain a bad week to a client without hiding behind jargon.",
        ],
      },
      {
        title: 'SEO Specialist',
        summary: "Audits, on-page fixes and content plans that actually rank.", // authored
        employmentType: 'Full-Time',
        experience: '2+ years',
        responsibilities: [
          "Run technical audits, on-page work and content plans that actually rank.",
          "Track SERP and AI-answer visibility, and act on what moves.",
          "Work with writers and developers to get fixes shipped, not filed.",
        ],
        requirements: [
          "2+ years of hands-on SEO with results you can point to.",
          "Fluent in GSC, GA4 and at least one crawler.",
          "Understands why a page ranks, not just that it does.",
        ],
      },
    ],
    blurb: 'The thinkers who never stop running. We research, we dig, we question everything to understand how to make your brand bigger, better, and sharper online.',
    members: [
      'Akansha Gwari', 'Johin Jose', 'Aman Rawat', "Krish D'Silva",
      'Ransley Moraes', 'Charvak Heramb', 'Muskan Aahi',
    ],
  },
  {
    name: 'Business Development',
    openings: [
      {
        title: 'Business Development Manager',
        summary: "Build a pipeline that consistently beats target.", // authored
        employmentType: 'Full-Time',
        experience: '3+ years', // authored
        responsibilities: [
          "Identify, qualify and pursue new opportunities through inbound and outbound.",
          "Build and manage a pipeline that consistently meets or beats target.",
          "Run discovery calls that surface the real problem, not the stated one.",
        ],
        requirements: [
          "Proven experience in sales, business development or account management.",
          "Strong communication, presentation and negotiation skills.",
          "Bachelor's degree in Business, Marketing or a related field (preferred).",
        ],
      },
    ],
    blurb: "We partner with brands who want to make a difference. Not everyone is a fit, and that's okay. We're here for the ones ready to do real work and create real impact.",
    members: ['Anand Radhakrishnan', 'Angel Chaturvedi'],
  },
  {
    name: 'Account Management',
    openings: [
      {
        title: 'Account Manager',
        summary: "Own day-to-day client relationships end to end.", // authored
        employmentType: 'Full-Time',
        experience: '2+ years',
        responsibilities: [
          "Own day-to-day client relationships and the quality of what reaches them.",
          "Translate business problems into briefs the team can execute.",
          "Protect scope, timelines and margins without souring the room.",
        ],
        requirements: [
          "2+ years in account management, ideally agency-side.",
          "Calm under escalation and clear in writing.",
          "Knows enough craft to push back on a weak idea.",
        ],
      },
    ],
    blurb: "Your daily champions. We bridge your vision and our execution, managing every detail so nothing slips through the cracks. We're here to make sure you're heard, and your goals are met.",
    members: [
      'Jayesh Jain', 'Krish Daiya', 'Saundarya Kumar',
      'Meghna Das Gupta', 'Sheetal Chakral',
    ],
  },
  {
    name: 'Executive Office',
    openings: [],
    blurb: 'We set the vision and keep ConvergenSEE true to who we are. Our job is steering the ship, making sure we grow without losing what makes us, us.',
    members: [
      'Balaji Jagannathan', 'Viswanathan Kalyanasundaram',
      'Neha Malhotra', 'Shankar Iyer', 'Tiana Balaji',
    ],
  },
  {
    name: 'Marketing and Branding',
    openings: [
      {
        title: 'Social Media Manager',
        summary: "Run content calendars and community across client handles.", // authored
        employmentType: 'Full-Time',
        experience: '2+ years',
        responsibilities: [
          "Own content calendars, publishing and community across client handles.",
          "Spot what is moving culturally and turn it around the same day.",
          "Report on what worked with more than screenshots of likes.",
        ],
        requirements: [
          "2+ years managing brand handles with measurable growth.",
          "Sharp instinct for platform-native format and tone.",
          "Fast, and unbothered by a Friday evening trend.",
        ],
      },
    ],
    blurb: "We're building ConvergenSEE from the ground up. Every campaign we run, every story we tell teaches us something new, and we bring those lessons straight to you.",
    members: [
      'Kiran Mulchandani', 'Adheet Shetty', 'Archana Vaghela',
      'Ria Mitra', 'Rushika Kathrani',
    ],
  },
  {
    name: 'Influencer Marketing',
    openings: [
      {
        title: 'Influencer Marketing Associate',
        summary: "Scout, sign and manage creators across categories.", // authored
        employmentType: 'Full-Time',
        experience: '1+ year',
        responsibilities: [
          "Scout, shortlist and negotiate with creators across categories.",
          "Run campaigns end to end: briefs, deliverables, timelines, payouts.",
          "Track performance and rebuild the roster around what performs.",
        ],
        requirements: [
          "1+ year working with creators or in talent management.",
          "Comfortable negotiating rates and chasing deliverables.",
          "Knows the difference between reach and influence.",
        ],
      },
    ],
    blurb: 'We connect brands with voices that matter. Real partnerships, authentic conversations, and influencers who actually align with what you stand for. Relationships over transactions, always.',
    members: [],
  },
  {
    name: 'Production',
    openings: [
      {
        title: 'Video Editor',
        summary: "Cut short-form social content on a fast turnaround.", // authored
        employmentType: 'Full-Time',
        experience: '2+ years', // authored
        responsibilities: [
          "Cut social, brand and long-form video from raw footage to final master.",
          "Handle grade, sound and versioning for every platform ratio.",
          "Work with the shoot team so problems get solved on set, not in post.",
        ],
        requirements: [
          "Strong Premiere Pro or DaVinci Resolve; After Effects a plus.",
          "A reel showing range across formats and lengths.",
          "Fast turnarounds without letting quality slide.",
        ],
      },
    ],
    blurb: 'Shoots, edits, renders, reshoots. The team that turns a line on a deck into something you actually want to watch.',
    members: ['Akash Khandare', 'Yash Sontade', 'Ankita Jain', 'Manas Sahoo'],
  },
]
