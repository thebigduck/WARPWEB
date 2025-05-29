import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        {/* To self-host Chypre fonts:
          1. Place font files (e.g., Chypre-Regular.otf) in your /public/fonts/ directory.
          2. Ensure the @font-face rules in src/styles/globals.css are correctly pointing to these files.
          Example for preloading (optional but good for performance):
          <link rel="preload" href="/fonts/Chypre-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        */}
      </Head>
      <body className="bg-deep-space-blue">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}