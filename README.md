# Homer — AI mini-story generator

Homer is a personal project from 2021–2022, with website updates through April 2023, built around GPT-2 fine-tuned on ROCStories.

## Current status

The website is deployed at [homer.paolim.fr](https://homer.paolim.fr). Story generation is currently unavailable because of its Hugging Face inference dependency.

## Application

- `public/`: static HTML interface, branding, and assets.
- `pages/`: Next.js application wrapper and server-side inference proxy.
- `next.config.js`: routes `/` to the static `index.html`.
- `styles/`: retained application styles.

The browser calls `/api/serverSideCall`, which forwards requests to the historical Hugging Face inference API for `jppaolim/homerGPT2`. The server reads its credential from `KEY` in `.env.local` or the deployment environment. Never commit credentials.

## Local development

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To build and serve a production build, use `npm run build` followed by `npm start`. `npm run lint` runs the existing lint command. Dependencies and their lockfile are preserved from the historical app; the inference dependency must be addressed separately to restore generation.
