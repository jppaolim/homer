# Homer — AI mini-story generator

Homer is a personal project from 2021–2022, with website updates through April 2023, built around GPT-2 fine-tuned on ROCStories.

## Current status

The website is deployed at [homer.paolim.fr](https://homer.paolim.fr). Story generation uses a private ONNX INT4 deployment on Modal through a server-side API route.

## Application

- `public/`: static HTML interface, branding, CSS, and assets, served directly by Vercel's CDN.
- `api/generate.js`: small Vercel Function that validates titles and calls Modal without exposing credentials.
- `vercel.json`: zero-framework deployment configuration and function timeout.

The browser calls `/api/generate`, which forwards the title to the private Modal endpoint. The function reads `MODAL_PROXY_KEY` and `MODAL_PROXY_SECRET` from the deployment environment. `MODAL_ENDPOINT_URL` is optional and overrides the default endpoint. Never commit credentials or expose them to browser code.

## Local development

`MODAL_PROXY_KEY` and `MODAL_PROXY_SECRET` are required for local story
generation. Copy `.env.example` to `.env.local`, supply the private values,
then use Vercel's local development server:

```sh
npx vercel dev
```

Open [localhost:3000](http://localhost:3000). The frontend has no build step or
runtime dependencies.
