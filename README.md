# Jane - Next.js

This is a personal portfolio template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

This template is built with **Next.js v14.2** and **Tailwind CSS v3**, leveraging the latest [App Router](https://nextjs.org/docs/app) and server component functionalities. It's Powered by [MDX](https://mdxjs.com/), with [Contentlayer](https://www.contentlayer.dev/) integration.

## Getting Started

First, install the dependencies. Navigate to the project directory in your terminal and run:

```bash
npm install
# or
yarn install  # if you have Yarn installed
```

This will install all required dependencies and place them in a folder called `node_modules` in the root directory.

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

## Strapi Configuration

Create an `.env.local` file in the project root with the following variables:

```bash
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=<your-private-token>
```

The token should be kept server-side for security. Avoid using the
`NEXT_PUBLIC_` prefix so it is not exposed to the browser.

## File Structure

All of the code for this template is located in the `/src` folder. The folder contains the following:

- `components` - Directory of reusable components
- `app` - Contains the site route components and layouts
- `content` - Contains all the `mdx` content files for the blog and case studies powered by `contentlayer`.
- `images` - Directory of images used across the site, including logos
- `styles` - Contains the entry point CSS file for Tailwind CSS and additional typography styles for Prism
- `lib` - Contains custom scripts for getting articles and case studies.

Note that in order to more concisely import images and components, we defined a module path alias to the `/src` directory inside the `jsconfig.json` file at the root of our project. To learn more about module aliases you can check out [Vercel's documentation](https://nextjs.org/docs/advanced-features/module-path-aliases) on the subject.

## MDX Content

All of the content for the site is stored in mdx files in the `src/content` directory. Jane uses [contentlayer](https://www.contentlayer.dev/docs), to access, model and transform this content into data throughout the blog and work sections.

In order to model your data correctly, `contentlayer` needs to know the shape of your content — your content schema. This content schema is stored and defined in the root of the project in the `contentlayer.config.js` file.

To add a blog post or case study, simply add the data to its corresponding directory in the `src/content` directory. Make sure that the data structure is the same as the content schema defined in the `contentlayer.config.js` file for that corresponding model.

### MDX Rendering with MdxContent

The template provides a specialized component called `MdxContent` which renders your MDX content with the help of the `useMDXComponent` hook from `next-contentlayer/hooks`. This component is situated in the `src/components/mdx` directory.

The MdxContent component defines Image and Link mdx components that are wrapper components for the Next.js Link and Image components respectively.

Both of these helper components, along with any future ones you might add, are also housed in the `src/components/mdx` directory. This modular approach allows you to easily extend or customize the behavior of MDX elements as your project grows.

## Tailwind CSS

This theme uses the latest version of Tailwind CSS: v3.4.

Tailwind CSS and its dependencies were installed via npm as recommended by the official [Tailwind installation docs for next.js](https://tailwindcss.com/docs/guides/nextjs). If you are not familiar with the Tailwind CSS framework, I would recommend checking out the [Tailwind documentation](https://tailwindcss.com/docs).

You can find the `tailwind.config.js` and `postcss.config.js` files at the root of the directory. The entry point CSS file is located at `src/styles/globals.css`. This file contains the `@tailwind` directives.

There is an additonal `prism.css` stylesheet for `prism.js` codeblock syntax styles used in the blog posts.

We've tried to minimize any custom CSS and only rely on Tailwind's utility classes and a few additional classes defined within the `tailwind.config.js` file. This template additionally uses 3 official Tailwind CSS plugins (`@tailwindcss/forms`, `@tailwindcss/aspect-ratio`, and `@tailwindcss/typography`).

## Font

This template uses the [Inter](https://fonts.google.com/specimen/Inter), [Lexend](https://fonts.google.com/specimen/Lexend), and the [Gochi Hand](https://fonts.google.com/specimen/Gochi+Hand) Google Font families. The template uses the latest `next/font` to automatically optimize the fonts and remove external network requests for improved privacy and performance.

## Icons

The icons used for this theme are part of the [Hero Icons](https://heroicons.com/) set that is free to use and published under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

Some of the examples in Jane use [Nucleo App](https://nucleoapp.com/premium-icons) icons which we have acquired a license for. You are free to use the Nucleo icons included in this template on your projects, but if you are interested in using the rest of their premium icons you can buy a license on their [website](https://nucleoapp.com/).

## Images

All of the images used in the template are free to use and are either from [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/), or custom-made.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) by the creators of Next.js.

Check out their [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This site template is a commercial product and is licensed under the [Tailwind Awesome license](https://www.tailwindawesome.com/license).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Additional Help

If you need additional help setting up the template or have any questions, feel free to contact us at <rodrigo@tailwindawesome.com>.
