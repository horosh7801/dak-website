import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='logo.png' />
      </Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
