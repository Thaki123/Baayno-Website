This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Copy `.env.example` to `.env` and update as needed.

```
# Path prefix for subdirectory deployments (e.g., GitHub Pages)
BASE_PATH=/Baayno-Website

# SMTP configuration for form submissions
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

`BASE_PATH` defaults to `""` for root-domain deployments. If the SMTP values are missing in production, contact and quote forms will be disabled.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Production Build and GitHub Pages Deployment

1. **Install dependencies** (Node 18+)

   ```bash
   npm install
   ```

2. **Create a production build**

   ```bash
   npm run build
   ```

3. **Static hosting (e.g., GitHub Pages)**

- Set the `BASE_PATH` environment variable to your repository name. Example:

  ```bash
  BASE_PATH=/Baayno-Website npm run build && npx next export
  ```

- Deploy the contents of `out/` as your site root (GitHub Pages: serve `gh-pages` branch from `/`).
- If you fork or rename the repo, update the `BASE_PATH` value to match the new repo name.

4. **Server hosting (e.g., Vercel/Netlify)**

   - Remove the `output: 'export'` setting if previously added.
 - Deploy with the provider's Next.js integration or run `npm run start` after `npm run build`.

## Headless CMS Integration

This project stores blog posts as Markdown files in `content/blog/`, but you can optionally integrate a headless CMS such as [Sanity](https://www.sanity.io/) or [Contentful](https://www.contentful.com/) for authoring. Configure your chosen CMS to deliver blog content and replace the filesystem utilities in `lib/posts.ts` with API calls to fetch posts at build time.

## Offline Support & Service Worker

This site uses [next-pwa](https://github.com/shadowwalker/next-pwa) for offline caching.

### Testing offline

1. Run `npm run build` to generate the service worker.
2. Start a static server, e.g. `npx serve out`.
3. Visit the site in your browser and toggle "Offline" in DevTools to confirm pages load from cache.

### Refreshing the service worker

After deploying a new version, hard refresh the page (Shift ↻) or use DevTools → Application → Service Workers → "Unregister" to force an update.

## Accessibility Guidelines

- All images use descriptive `alt` text.
- Buttons and interactive elements include clear labels via visible text or `aria-label` attributes.
- Form inputs indicate errors with `aria-invalid` and associated messages announced using `role="alert"`.
- Status messages use `role="status"` and `aria-live` to be read by assistive technology.
