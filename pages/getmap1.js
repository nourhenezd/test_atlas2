import NavigationBottomMobile from '../components/NavigationBottomMobile';
import NavigationBottom from '../components/NavigationBottom';
import { isMobile } from 'react-device-detect';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import queryClient from '../apollo-client';
import { gql } from '@apollo/client';

const Map = dynamic(() => import('../components/GetMapGL'), {
  loading: () => 'Loading...',
  ssr: false,
});

export default function getmap1({ artisans }) {
  return (
    <>
      <Head>
        <title>Cartographie des artisans</title>
        <link href="/styles/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
        >
          <Map artisans={artisans} />
        </motion.div>
        {isMobile ? <NavigationBottomMobile /> : <NavigationBottom />}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await queryClient.query({
    query: gql`
      query getArtisans {
        artisanJiras {
          Nom
          Geolocalisation
          Lieu
          Phone
          DSObjets {
            Nom
            Icon
          }
        }
      }
    `,
  });
  return {
    props: {
      artisans: data.artisanJiras,
    },
  };
}
