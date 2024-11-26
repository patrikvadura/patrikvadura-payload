# Next.js Frontend based on Payload CMS

NextJS frontend for websites based on Payload CMS.

### Development

1. First [clone the repo](#clone) if you have not done so already
1. Setup `.env` to set the environment variables
1. `pnpm install && pnpm dev` to install dependencies and start the dev server
1. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in app.

## Payload CMS

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

- [Collections](https://payloadcms.com/docs/configuration/collections)
- [Globals](https://payloadcms.com/docs/configuration/globals)
- [Lexical editor](https://payloadcms.com/docs/lexical/overview)
- [Live preview](https://payloadcms.com/docs/live-preview/overview)
- [Payload SEO](https://payloadcms.com/docs/plugins/seo)

## Website

The website is a Next.js frontend that is pre-configured with the following features:

- [Next.js App Router](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [TailwindCSS styling](https://tailwindcss.com/)
- [shadcn/ui components](https://ui.shadcn.com/)

## Production

To run app in production, you need to follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
1. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
