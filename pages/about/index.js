import Head from 'next/head';
import MainLayout from '../../src/components/4_layouts/MainLayout/MainLayout';
import AboutPage from '../../src/components/5_pages/AboutPage/AboutPage';

export default function About() {
  return (
    <>
      <Head>
        <title>Comrades of the Dead | About</title>
        <meta name="description" content="Learn about Comrades of the Dead" />
      </Head>
      <MainLayout>
        <AboutPage />
      </MainLayout>
    </>
  );
}
