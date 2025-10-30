import Head from 'next/head';
import MainLayout from '../src/components/4_layouts/MainLayout/MainLayout';
import MintPage from '../src/components/5_pages/MintPage/MintPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Comrades of the Dead | Mint</title>
        <meta name="description" content="Mint your Comrades of the Dead Ethscription" />
      </Head>
      <MainLayout>
        <MintPage />
      </MainLayout>
    </>
  );
}
