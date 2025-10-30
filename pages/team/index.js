import Head from 'next/head';
import MainLayout from '../../src/components/4_layouts/MainLayout/MainLayout';
import TeamPage from '../../src/components/5_pages/TeamPage/TeamPage';

export default function Team() {
  return (
    <>
      <Head>
        <title>Comrades of the Dead | Team</title>
        <meta name="description" content="Meet the Comrades of the Dead team" />
      </Head>
      <MainLayout>
        <TeamPage />
      </MainLayout>
    </>
  );
}
