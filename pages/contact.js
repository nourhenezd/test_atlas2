import NavigationBottomMobile from '../components/NavigationBottomMobile';
import NavigationBottom from '../components/NavigationBottom';
import { isMobile } from 'react-device-detect';
import ImageCarousel from '../components/ImageCarousel';
import Head from 'next/head';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import queryClient from '../apollo-client';
import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';

const page = {
  ID: 5,
  Name: 'Information et contact',
  Color: 'bg-green-800',
};

const useIsSSR = () => {
  // we always start off in "SSR mode", to ensure our initial browser render
  // matches the SSR render
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    // `useEffect` never runs on the server, so we must be on the client if
    // we hit this block
    setIsSSR(false);
  }, []);

  return isSSR;
};

export default function page1({ entries }) {
  const [selectedEntry, setSelectedEntry] = useState(entries[0]);

  const isSSR = useIsSSR();
  if (isSSR) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{page.Name}</title>
      </Head>
      <div>
        <div className="bg-cover bg-mapsmall lg:bg-map z-0">
          <div
            id="slide"
            className="pt-4 px-4 sm:pt-8 sm:px-8 md:pt-14 md:px-14"
          >
            <motion.div
              layoutId={page.ID}
              initial={{ y: '100vh' }}
              animate={{ y: 0, transition: { duration: 2 } }}
              exit={{ y: '100vh', transition: { duration: 1 } }}
              id="contentslide"
              className="rounded-t-lg filter drop-shadow-ls"
            >
              <div
                id="slide top"
                className={
                  'w-full rounded-t-lg p-3 flex justify-between items-center ' +
                  page.Color
                }
              >
                <div className="flex justify-start gap-2">
                  <div className="text-2xl font-black text-white">ATLAS</div>
                  <div className="text-2xl font-light text-white">
                    {page.Name}
                  </div>
                </div>
                <div className="items-center justify-end text-black hidden">
                  (none)
                </div>
              </div>

              <div id="slide content" className="flex flex-col sm:flex-row">
                <div className="bg-gray-100 w-full">
                  <div className="relative w-full h-screen p-4 flex flex-col gap-4">
                    <Image
                      src="https://live.staticflickr.com/65535/51665282065_49bb8c34c9_3k.jpg"
                      alt="Contact Cover Image"
                      layout="fill"
                      className="object-cover"
                    />

                    <div className="relative bg-gray-100 p-4  mt-5 sm:mt-24 md:mt-32 rounded-lg opacity-80 filter backdrop-blur-lg">
                      <div>
                        <h1>Information et contact</h1>
                      </div>
                    </div>

                    <div className="relative bg-gray-100 p-4 rounded-lg overflow-scroll">
                      {entries &&
                        entries.map((entry) => (
                          <div key={entry.id}>
                            <h2>{entry.Headline}</h2>
                            <ReactMarkdown className="flex flex-col gap-4">
                              {entry.Chapitre}
                            </ReactMarkdown>
                          </div>
                        ))}
                      <div className="h-20 "></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {isMobile ? <NavigationBottomMobile /> : <NavigationBottom />}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await queryClient.query({
    query: gql`
      query getContenus {
        contacts {
          id
          Headline
          Chapitre
        }
      }
    `,
  });
  return {
    props: {
      entries: data.contacts,
    },
  };
}
