import { useEffect } from 'react';
import AOS from 'aos';
import Head from 'next/head';
import Navbar from '../components/organisms/Navbar';
import MainBanner from '../components/organisms/MainBanner';
import TransactionStep from '../components/organisms/TransactionStep';
import FeaturedGame from '../components/organisms/FeaturedGame';
import Reached from '../components/organisms/Reached';
import Story from '../components/organisms/Story';
import Footer from '../components/organisms/Footer';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head>
        <title>StoreGG - Get a New Experiene in Gaming</title>
        <link rel="shortcut icon" href="icon/logo.svg" type="image/x-icon" />
        <meta name="description" content="Kami menyediakan jutaan cara untuk menjadi gamer terbaik" />
        <meta property="og:title" content="StoreGG - Get a New Experiene in Gaming" />
        <meta property="og:description" content="Kami menyediakan jutaan cara untuk menjadi gamer terbaik" />
        <meta property="og:image" content="https://storegg-serv.herokuapp.com/uploads/5.png" />
        <meta property="og:image" content="https://storegg.com" />
      </Head>

      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
