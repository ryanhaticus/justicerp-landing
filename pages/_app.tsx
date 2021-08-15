import { DefaultSeo } from 'next-seo';
import 'tailwindcss/tailwind.css';
import Head from 'next/head';

import './styles/universal.css';

const JRP = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/jrp.png' />
      </Head>
      <DefaultSeo titleTemplate='JusticeRP | %s' description='' />
      <Component {...pageProps} />
    </>
  );
};

export default JRP;
