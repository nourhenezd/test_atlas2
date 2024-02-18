import NavigationBottomMobile from '../components/NavigationBottomMobile';
import NavigationBottom from '../components/NavigationBottom';
import { isMobile } from 'react-device-detect';
import TextTruncate from 'react-text-truncate';
import ImageCarousel from '../components/ImageCarousel';
import { Listbox } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import queryClient from '../apollo-client';
import { gql } from '@apollo/client';
import { useState, useEffect, Fragment } from 'react';

const page = {
  ID: 3,
  Name: "Cartographie raisonnée de l'artisanat tunisien",
  Color: 'bg-blue-800',
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
                  <div className="text-2xl font-light text-white hidden">
                    {page.Name}
                  </div>
                </div>
                <div className="items-center justify-end text-black">
                  <Listbox value={selectedEntry} onChange={setSelectedEntry}>
                    <Listbox.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <TextTruncate
                        line={1}
                        truncateText="…"
                        text={selectedEntry.Headline}
                      />
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
                              <div className=" text-black flex flex-col gap-1">
                                <li
                                  className={
                                    selected
                                      ? 'text-gray-700 bg-gray-300 px-2 py-1 text-sm flex gap-1'
                                      : 'text-gray-700 hover:bg-gray-300 px-2 py-1 text-sm flex gap-1'
                                  }
                                  onClick={() => setSelectedEntry(Entry)}
                                >
                                  {Entry.Headline}
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

              <div id="slide content" className="flex flex-col sm:flex-row">
                <div className="bg-gray-100 w-full">
                  <div className="relative w-full h-screen p-4 flex flex-col gap-4">
                    <Image
                      src="https://live.staticflickr.com/65535/51665282065_49bb8c34c9_3k.jpg"
                      alt={'Cover Image ' + selectedEntry.Headline}
                      layout="fill"
                      className="object-cover"
                    />

                    <div className="relative bg-gray-100 p-4  mt-5 sm:mt-24 md:mt-32 rounded-lg opacity-80 filter backdrop-blur-lg">
                      <div>
                        <h1>
                          La cartographie raisonnée de l'artisanat tunisien.
                        </h1>
                        <h2 className="">{selectedEntry.Headline}</h2>
                        <div className="items-center justify-end text-black">
                          <ul className="flex flex-col lg:flex-row gap-x-2 font-bold hidden">
                            {entries &&
                              entries.map((entry) => (
                                <li
                                  key={entry.id}
                                  className={
                                    entry === selectedEntry
                                      ? 'text-black border-blue-600 border-b-2'
                                      : 'text-gray-700 hover:text-blue-600'
                                  }
                                  onClick={() => setSelectedEntry(entry)}
                                >
                                  {entry.Headline}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      key={selectedEntry ? selectedEntry.id : 'empty'}
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 40 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 1 }}
                      className="overflow-scroll"
                    >
                      <div className="relative bg-gray-100 p-4 rounded-lg overflow-scroll">
                        <div className=" w-full md:w-1/2 md:ml-3 mb-2 p-2 md:p-4 bg-white shadow-lg rounded-lg md:float-right">
                          <ImageCarousel images={selectedEntry.Images} />
                        </div>

                        <ReactMarkdown className="flex flex-col gap-4">
                          {selectedEntry.Chapitre}
                        </ReactMarkdown>
                        <div className="h-20 "></div>
                      </div>
                    </motion.div>
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
        contenus(sort: "Headline:asc") {
          id
          Headline
          Chapitre
          CoverImage {
            name
          }
          Images {
            name
          }
        }
      }
    `,
  });
  return {
    props: {
      entries: data.contenus,
    },
  };
}
