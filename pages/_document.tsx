import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const basePath = process.env.BASE_PATH || '';

  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('${basePath}/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </Html>
  );
}
