// ─── Team roster ──────────────────────────────────────────────────────────────
// Single source of truth for the people shown on the home page strip and the
// full Team page. `photo` is the studio portrait; `pose` is that person's own
// quirky shot, revealed on hover. Both are 640×880 crops in /public/team.
// Refreshed Aug 2026 from the HR photo drive (team-wise folders) + roster sheet.
//
// Cards without a `pose` fall back to a gentle zoom; drop a `-pose.webp` in
// /public/team and add the key here to switch them over. The drive's Sony .ARW
// raws held the missing poses for Balaji, Anand, Angel, Kiran and Bhawani.
//
// ── Still missing (no photo received yet): Jasman Kaur Boparai,
//    Bhagyashree Tejani, Shubhra Shinde. One unidentified man remains in the
//    drive's Creative/ folder (the dark-kurta pair at 16.31.16-2/17).

export const TEAM = [
  // `lowercaseName` renders the card name in lowercase instead of the default
  // all-caps — Bala's name is styled lowercase everywhere (see advisory board).
  { name: 'Balaji Jagannathan', role: 'Founder & CEO', photo: '/team/balaji-jagannathan.webp', pose: '/team/balaji-jagannathan-pose.webp', lowercaseName: true },
  { name: 'Viswanathan Kalyanasundaram', role: 'Director', photo: '/team/viswanathan-kalyanasundaram.webp', pose: '/team/viswanathan-kalyanasundaram-pose.webp' },
  { name: 'Neha Malhotra', role: 'Co-Founder & Director - Digital Strategy, Account Management & Creative', photo: '/team/neha-malhotra.webp', pose: '/team/neha-malhotra-pose.webp' },
  { name: 'Shankar Iyer', role: 'Director - Technology', photo: '/team/shankar-iyer.webp', pose: '/team/shankar-iyer-pose.webp' },
  { name: 'Anand Radhakrishnan', role: 'Director - Sales', photo: '/team/anand-radhakrishnan.webp', pose: '/team/anand-radhakrishnan-pose.webp' },
  { name: 'Adheet Shetty', role: 'Senior Marketing & Branding Executive', photo: '/team/adheet-shetty.webp', pose: '/team/adheet-shetty-pose.webp' },
  { name: 'Advait Dawal', role: 'Creative Visualiser & Designer', photo: '/team/advait-dawal.webp', pose: '/team/advait-dawal-pose.webp' },
  { name: 'Akansha Gwari', role: 'Senior Manager - Digital Strategy', photo: '/team/akansha-gwari.webp', pose: '/team/akansha-gwari-pose.webp' },
  { name: 'Akash Khandare', role: 'CG Environment Supervisor & AI Team Lead', photo: '/team/akash-khandare.webp', pose: '/team/akash-khandare-pose.webp' },
  { name: 'Aman Rawat', role: 'Manager - Technology', photo: '/team/aman-rawat.webp', pose: '/team/aman-rawat-pose.webp' },
  { name: 'Amin Khan', role: 'People Experience Associate', photo: '/team/amin-khan.webp', pose: '/team/amin-khan-pose.webp' },
  { name: 'Angel Chaturvedi', role: 'Senior Manager - Business Development', photo: '/team/angel-chaturvedi.webp', pose: '/team/angel-chaturvedi-pose.webp' },
  { name: 'Ankita Jain', role: 'Senior CG Environment & AI Artist', photo: '/team/ankita-jain.webp', pose: '/team/ankita-jain-pose.webp' },
  {
    name: 'Archana Vaghela', role: 'Inside Sales & Marketing Associate',
    photo: '/team/archana-vaghela.webp', pose: '/team/archana-vaghela-pose.webp',
    // A `video` beats `pose` on hover — it loops silently like a GIF. `bio` is a
    // list of [label, value] rows revealed over the lower half of the card.
    // Video parked for now (1 Oct 2026): static pose on hover instead.
    // Uncomment to bring the looping hover video back.
    // video: '/team/archana-vaghela.mp4',
    bio: [
      ['Blood group', 'Chai, coffee, khana, peena, shayari, empathy, beer, doom scrolling'],
      ['Weapons', 'Eyes, kyunki ankhiyon se goli maare. Also, chasma laga hua hai…so 4 goli maare.'],
    ],
  },
  { name: 'Bhawani Singh Bhati', role: 'Manager - LPM & ORM', photo: '/team/bhawani-singh-bhati.webp', pose: '/team/bhawani-singh-bhati-pose.webp' },
  { name: 'Charvak Heramb', role: 'Executive - Design Strategy', photo: '/team/charvak-heramb.webp', pose: '/team/charvak-heramb-pose.webp' },
  { name: 'Divya Mittal', role: 'Senior Copy & Content Writer', photo: '/team/divya-mittal.webp', pose: '/team/divya-mittal-pose.webp' },
  { name: 'Fawwaz Bhati', role: 'Graphic Designer', photo: '/team/fawwaz-bhati.webp', pose: '/team/fawwaz-bhati-pose.webp' },
  { name: 'Ganesh Yedala', role: 'UI/UX Designer', photo: '/team/ganesh-yedala.webp', pose: '/team/ganesh-yedala-pose.webp' },
  { name: 'Harshali Sonawane', role: 'Graphic Designer', photo: '/team/harshali-sonawane.webp', pose: '/team/harshali-sonawane-pose.webp' },
  { name: 'Janhavi Thorat', role: 'Business Operations Associate', photo: '/team/janhavi-thorat.webp', pose: '/team/janhavi-thorat-pose.webp' },
  { name: 'Jayesh Jain', role: 'Group Account Manager', photo: '/team/jayesh-jain.webp', pose: '/team/jayesh-jain-pose.webp' },
  { name: 'Johin Jose', role: 'Performance Marketing Manager', photo: '/team/johin-jose.webp', pose: '/team/johin-jose-pose.webp' },
  { name: 'Keerti Varma', role: 'Intern - Graphic Design', photo: '/team/keerti-varma.webp', pose: '/team/keerti-varma-pose.webp' },
  { name: 'Kiran Mulchandani', role: 'Senior Manager - Marketing, Branding & Influencer Marketing', photo: '/team/kiran-mulchandani.webp', pose: '/team/kiran-mulchandani-pose.webp' },
  { name: 'Kishor Gaikwad', role: 'People Experience Associate', photo: '/team/kishor-gaikwad.webp', pose: '/team/kishor-gaikwad-pose.webp' },
  { name: 'Krish Daiya', role: 'Senior Account Manager', photo: '/team/krish-daiya.webp', pose: '/team/krish-daiya-pose.webp' },
  { name: "Krish D'Silva", role: 'Manager - Digital Strategy', photo: '/team/krish-dsilva.webp', pose: '/team/krish-dsilva-pose.webp' },
  { name: 'Manas Sahoo', role: 'Creative Director & VFX Supervisor - CGI, VFX & AI Content', photo: '/team/manas.webp', pose: '/team/manas-pose.webp' },
  { name: 'Meghna Das Gupta', role: 'Junior Account Manager', photo: '/team/meghna-das-gupta.webp', pose: '/team/meghna-das-gupta-pose.webp' },
  { name: 'Minakshi Chaugule', role: 'Inside Sales & Admin Associate', photo: '/team/minakshi-chaugule.webp', pose: '/team/minakshi-chaugule-pose.webp' },
  { name: 'Moazzam Ali', role: 'Creative Visualiser & Designer', photo: '/team/moazzam-ali.webp', pose: '/team/moazzam-ali-pose.webp' },
  { name: 'Muskan Aahi', role: 'Digital Strategy Associate', photo: '/team/muskan-aahi.webp', pose: '/team/muskan-aahi-pose.webp' },
  { name: 'Mustafa Ansari', role: 'Graphic Designer & Visualizer', photo: '/team/mustafa-ansari.webp', pose: '/team/mustafa-ansari-pose.webp' },
  { name: 'Nikita Salve', role: 'Business Operations Associate', photo: '/team/nikita-salve.webp', pose: '/team/nikita-salve-pose.webp' },
  { name: 'Palak Kothari', role: 'Business Operations Associate', photo: '/team/palak-kothari.webp', pose: '/team/palak-kothari-pose.webp' },
  { name: 'Pranay Valecha', role: 'Executive - People Experience', photo: '/team/pranay-valecha.webp', pose: '/team/pranay-valecha-pose.webp' },
  { name: 'Prashant Birjudar', role: 'People Experience Associate', photo: '/team/prashant-birjudar.webp', pose: '/team/prashant-birjudar-pose.webp' },
  { name: 'Priya Thakur', role: 'Business Operations Intern', photo: '/team/priya-thakur.webp', pose: '/team/priya-thakur-pose.webp' },
  { name: 'Raj Sawant', role: 'Senior Designer & Visualizer', photo: '/team/raj-sawant.webp', pose: '/team/raj-sawant-pose.webp' },
  { name: 'Rakshit Bangera', role: 'Business Operations Associate', photo: '/team/rakshit-bangera.webp', pose: '/team/rakshit-bangera-pose.webp' },
  { name: 'Rakshita Srivastava', role: 'Team Lead - UI/UX', photo: '/team/rakshita-srivastava.webp', pose: '/team/rakshita-srivastava-pose.webp' },
  { name: 'Ransley Moraes', role: 'Data Analyst & Coordinator', photo: '/team/ransley-moraes.webp', pose: '/team/ransley-moraes-pose.webp' },
  { name: 'Ria Mitra', role: 'Inside Sales & Marketing Associate', photo: '/team/ria-mitra.webp', pose: '/team/ria-mitra-pose.webp' },
  { name: 'Rohan Kharwar', role: 'Business Operations Associate', photo: '/team/rohan-kharwar.webp', pose: '/team/rohan-kharwar-pose.webp' },
  { name: 'Rohit Kanojiya', role: 'Business Operations Associate', photo: '/team/rohit-kanojiya.webp', pose: '/team/rohit-kanojiya-pose.webp' },
  { name: 'Rushika Kathrani', role: 'Sales Operations Associate', photo: '/team/rushika-kathrani.webp', pose: '/team/rushika-kathrani-pose.webp' },
  { name: 'Sailesh Nair', role: 'People Experience Associate', photo: '/team/sailesh-nair.webp', pose: '/team/sailesh-nair-pose.webp' },
  { name: 'Sakshi Bhushan Mandekar', role: 'Intern - People Experience', photo: '/team/sakshi-bhushan-mandekar.webp', pose: '/team/sakshi-bhushan-mandekar-pose.webp' },
  { name: 'Sandesh Singh', role: 'Senior Graphic Designer & Visualizer', photo: '/team/sandesh-singh.webp', pose: '/team/sandesh-singh-pose.webp' },
  { name: 'Sanika Nagulkar', role: 'Graphic Designer', photo: '/team/sanika-nagulkar.webp', pose: '/team/sanika-nagulkar-pose.webp' },
  { name: 'Saundarya Kumar', role: 'Client Servicing Executive', photo: '/team/saundarya-kumar.webp', pose: '/team/saundarya-kumar-pose.webp' },
  { name: 'Sheetal Chakral', role: 'Client Servicing Executive', photo: '/team/sheetal-chakral.webp', pose: '/team/sheetal-chakral-pose.webp' },
  { name: 'Shreya Chavan', role: 'CG Generalist & AI Artist', photo: '/team/shreya-chavan.webp', pose: '/team/shreya-chavan-pose.webp' },
  { name: 'Sonali Belwalkar', role: 'Graphic Designer', photo: '/team/sonali-belwalkar.webp', pose: '/team/sonali-belwalkar-pose.webp' },
  { name: 'Tanvi Jadhav', role: 'Business Operations Associate', photo: '/team/tanvi-jadhav.webp', pose: '/team/tanvi-jadhav-pose.webp' },
  { name: 'Tiana Balaji', role: 'Inside Sales & Executive Office Associate', photo: '/team/tiana-balaji.webp', pose: '/team/tiana-balaji-pose.webp' },
  { name: 'Vikrant Shedge', role: 'Business Operations Associate', photo: '/team/vikrant-shedge.webp', pose: '/team/vikrant-shedge-pose.webp' },
  { name: 'Vrajesh Daru', role: 'Associate Creative Director (Design)', photo: '/team/vrajesh-daru.webp', pose: '/team/vrajesh-daru-pose.webp' },
  { name: 'Wilson Thomas', role: 'UI/UX Designer', photo: '/team/wilson-thomas.webp', pose: '/team/wilson-thomas-pose.webp' },
  { name: 'Yash Sontade', role: 'CG Generalist & AI Artist', photo: '/team/yash-sontate.webp', pose: '/team/yash-sontate-pose.webp' },
]

export const withPose = TEAM.filter(m => m.pose)
