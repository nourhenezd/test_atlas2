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
import { useState, useEffect, Fragment } from 'react';

const page = { ID: 2, Name: 'Les régions', Color: 'bg-yellow-800' };

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

export default function page2({ entries }) {
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
                <div className="items-center justify-end text-black">
                  <Listbox value={selectedEntry} onChange={setSelectedEntry}>
                    <Listbox.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-yellow-500">
                      {selectedEntry.Nom}{' '}
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Listbox.Button>
                    <Listbox.Options className="origin-top-right absolute right-3 mt-2 w-48 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                      {entries &&
                        entries.map((Entry) => (
                          /* Use the `active` state to conditionally style the active option. */
                          /* Use the `selected` state to conditionally style the selected option. */
                          <Listbox.Option
                            key={Entry.id}
                            value={Entry}
                            as={Fragment}
                          >
                            {({ active, selected }) => (
                              <div className=" text-black flex flex-col gap-2">
                                <li
                                  className={
                                    selected
                                      ? 'text-gray-700 bg-gray-300  px-4 py-1 text-sm flex flex-row-reverse gap-2'
                                      : 'text-gray-700 hover:bg-gray-300 px-4 py-1 text-sm flex flex-row-reverse gap-2'
                                  }
                                  onClick={() => setSelectedEntry(Entry)}
                                >
                                  {Entry.Nom}{' '}
                                  {selected && (
                                    <CheckCircleIcon className="h-5 w-5" />
                                  )}
                                </li>
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
              </div>
              <motion.div
                key={selectedEntry ? selectedEntry.id : 'empty'}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div id="slide content" className="flex flex-col sm:flex-row">
                  <div className="bg-gray-100 w-full">
                    <div className="relative w-full h-screen p-4 flex flex-col gap-4">
                      <Image
                        src={
                          'https://live.staticflickr.com/65535/51667486755_ee2f9a615e_3k.jpg' &&
                          'https://live.staticflickr.com/65535/' +
                            selectedEntry.CoverImage.name
                        }
                        alt={'Cover Image ' + selectedEntry.Nom}
                        layout="fill"
                        className="object-cover"
                      />

                      <div className="relative bg-gray-100 p-4  mt-5 sm:mt-24 md:mt-32 rounded-lg opacity-80">
                        <h1>{selectedEntry.Nom}</h1>
                        {/*                         <h2>some more infos about this region?</h2> */}
                      </div>
                      <div className="relative bg-gray-100 p-4 rounded-lg overflow-scroll">
                        <div className=" w-full md:w-1/2 md:ml-3 mb-2 p-2 md:p-4 bg-white shadow-lg rounded-lg md:float-right">
                          <ImageCarousel images={selectedEntry.Images} />
                        </div>

                        <ReactMarkdown className="flex flex-col gap-4">
                          {selectedEntry.Descriptif}
                        </ReactMarkdown>
                        <div className="h-20 "></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
      query getRegions {
        regions {
          id
          Nom
          Descriptif
          CoverImage {
            name
          }
          Images {
            name
          }
          VideoURL
        }
      }
    `,
  });
  return {
    props: {
      entries: data.regions,
    },
  };
}
