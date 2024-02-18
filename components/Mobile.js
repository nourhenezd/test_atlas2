import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

const page = { ID: 6, Name: 'Mobile Playground', Color: 'bg-blue-800' };

export default function Mobile() {
  return (
    <>
      <Head>
        <title>Mobile Playground</title>
      </Head>
      <div>
        <div className="bg-contain bg-mapsmall z-0">
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
                      src="https://live.staticflickr.com/65535/51663623967_9b37c7b092_c.jpg"
                      alt="Mobile Wait Page"
                      layout="fill"
                      className="object-cover"
                    />

                    <div className="relative bg-gray-100 p-4  mt-5 sm:mt-24 md:mt-32 rounded-lg opacity-70">
                      <h1>AtlasTN</h1>
                      <h2>vous demande un peu de patience</h2>
                      <p>
                        La version mobile du site sera disponible prochainement.{' '}
                        <br />
                        En attendant, veuillez utiliser votre ordinateur pour
                        pouvoir acceder au site web.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
