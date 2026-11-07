# Access Psych website

A responsive Next.js App Router rebuild of the Access Psych website.

## Setup

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. Create and run a production build with:

```sh
npm run build
npm start
```

Run the TypeScript check with `npm run typecheck`.

## Hero video

Place the three supplied, silent, seamlessly looping hero clips at:

- `public/video/hero-welcome.mp4` and/or `public/video/hero-welcome.webm`
- `public/video/hero-eap.mp4` and/or `public/video/hero-eap.webm`
- `public/video/hero-clinicians.mp4` and/or `public/video/hero-clinicians.webm`

If you only have one clip, place it at `public/video/hero.mp4` and/or `public/video/hero.webm`; it will be used for all three messages until separate clips are supplied. Recommended footage is calm, slow and warm (for example, people talking in soft daylight, nature, or hands holding a mug), 1080p, 10–20 seconds, and under 6 MB. The homepage uses the original Access Psych image as its poster and fallback. Video playback is disabled for reduced-motion preferences, data-saver connections, and small screens.

## Editing content

- Navigation, page copy, contact details, location addresses, and original image references live in `src/lib/site-data.ts`.
- Homepage content and homepage sections live in `src/components/home-page.tsx`.
- Homepage FAQ, Australia map, and newsletter entry interactions live in `src/components/home-interactions.tsx`.
- Hero slides and video fallback behaviour live in `src/components/home-hero.tsx`.
- Homepage add-on motion and Technology Partner / chat styles live in `src/app/addons.css`.
- Technology Partner content and TODO placeholders live in `src/app/technology-partner/page.tsx`.
- Assistant approved facts live in `data/knowledge.md`.
- Shared layout, menus, footer, and inner-page presentation live in `src/components/`.
- The visual tokens and component guidance live in `DESIGN.md`, `src/app/globals.css`, and `src/app/homepage.css`.
- The existing clinician data is in `src/data/clinicians.js`.

The site uses Next.js, TypeScript, Tailwind CSS, Framer Motion, and lucide-react. Content links for appointment requests, policy PDFs, articles, and clinician profiles continue to use Access Psych's existing services.

## Assistant notes

The assistant currently answers with curated local text from `data/knowledge.md`; it does not call an AI provider or send chat messages to a third party. `src/lib/chat-provider.ts` is an adapter scaffold only. The provider request format must be confirmed before connecting `CHAT_API_KEY` or `JOBGEN_API_URL`. The chat rate limit is process-local and should be replaced with shared storage before deploying multiple application instances. No lead-capture endpoint or personal-information storage is enabled.

The Technology Partner page marks unconfirmed agent identities, capabilities, integration details, and safeguards as TODO. Confirm all of them before representing them as active.

## Routes

The main navigation pages are available at `/about-us`, `/vision-purpose-values`, `/our-approach`, `/how-to-book-an-appointment-with-access-psych`, `/meet-our-team`, `/fees`, `/news-and-events`, `/our-locations`, `/psychology-therapy-counselling`, `/employee-assistance-program`, `/professional-care-program`, `/workplace-group-education`, `/mhfa`, `/critical-incident-support`, `/adhd-autism-assessments`, `/access-our-services`, `/blogs`, `/tip-sheets`, `/careers`, `/frequently-asked-questions`, `/online-booking-request`, `/newsletter`, and `/terms-of-use`.
