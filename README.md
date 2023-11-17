This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

To run the NEXTJS storybook run:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
al-sira
├─ .eslintrc.json
├─ .gitignore
├─ README.md
├─ components.json
├─ drizzle.config.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ next.svg
│  └─ vercel.svg
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ chat
│  │  │  │  └─ route.ts
│  │  │  └─ create-resume
│  │  │     └─ route.ts
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ resume
│  │  │  └─ [resumeId]
│  │  │     └─ page.tsx
│  │  ├─ sign-in
│  │  │  └─ [[...sign-in]]
│  │  │     └─ page.tsx
│  │  └─ sign-up
│  │     └─ [[...sign-up]]
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ BulletpointsList.tsx
│  │  ├─ FileUpload.tsx
│  │  ├─ PDFEditor.tsx
│  │  ├─ PDFViewer.tsx
│  │  ├─ PointsGenerator.tsx
│  │  ├─ Providers.tsx
│  │  ├─ ResumeSideBar.tsx
│  │  ├─ editor
│  │  └─ ui
│  │     ├─ button.tsx
│  │     └─ input.tsx
│  ├─ lib
│  │  ├─ context.ts
│  │  ├─ db
│  │  │  ├─ index.ts
│  │  │  └─ schema.ts
│  │  ├─ embeddings.ts
│  │  ├─ pinecone.ts
│  │  ├─ s3-server.ts
│  │  ├─ s3.ts
│  │  └─ utils.ts
│  └─ middleware.ts
├─ tailwind.config.ts
└─ tsconfig.json

```