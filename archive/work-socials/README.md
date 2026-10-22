# Archived: /work and /socials pages (1 Oct 2026)

Removed from the live site on request. To restore:

1. Move `app/work/page.jsx` and `app/socials/page.jsx` back under `app/`.
2. Move `src/WorkPage.jsx` and `src/SocialsPage.jsx` back into `src/`.
3. Re-add to `src/lib/routes.js`: `work: '/work'`, `socials: '/socials'` in
   `PATH_FOR`, and `work: 'work'`, `socials: 'socials'` in `SECTION_FOR`.
4. Re-add `['Work', '/work']` and `['Socials', '/socials']` to the page list in
   `src/DevicePreview.jsx`.
5. Optional: put 'Work' back in the `links` array in `src/Nav.jsx`.

Media they used (public/) was left in place.
