import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

const pages = [
  {
    id: 1,
    icon: 'a',
    link: '/page1',
    color: 'bg-red-500',
    textcolor: 'text-white font-icon text-2xl hover:text-red-500',
  },
  {
    id: 2,
    icon: 'b',
    link: '/page2',
    color: 'bg-yellow-500',
    textcolor: 'text-white font-icon text-2xl hover:text-yellow-500',
  },
  {
    id: 3,
    icon: 'c',
    link: '/',
    color: 'bg-blue-500',
    textcolor: 'text-white font-icon text-2xl hover:text-blue-500',
  },
  {
    id: 4,
    icon: 'd',
    link: '/getmap1',
    color: 'bg-indigo-500',
    textcolor: 'text-white font-icon text-2xl hover:text-indigo-500',
  },
  {
    id: 5,
    icon: 'e',
    link: '/contact',
    color: 'bg-green-500',
    textcolor: 'text-white font-icon text-2xl hover:text-green-500',
  },
];

const NavigationBottom = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row bottom-0 left-0 opacity-70 fixed w-full z-10">
      <div className="flex-auto">
        <div className="h-nav"></div>
        <div className="h-14 bg-gray-900"></div>
      </div>

      {pages.map((page) => (
        <div className="flex flex-col items-center " key={page.id}>
          <div className="fill-current text-gray-900 h-nav ">
            {router.pathname === page.link ? (
              <motion.div layoutId="underline">
                <svg width="74px">
                  <path
                    d="M37,17 C16.65,17 0,16.9323733 0,16.8496345 C0,16.7668956 0.587636364,16.5944286 1.306,16.4663534 C2.02436364,16.3384672 3.49527273,15.9289288 4.57490909,15.5562263 C5.65436364,15.1837127 7.38090909,14.3916489 8.41127273,13.7964205 C9.44181818,13.2010032 11.4790909,11.9030614 12.9383636,10.9120844 C14.3976364,9.92110749 16.6449091,8.3073225 17.9321818,7.32560172 C19.2194545,6.34406985 20.9681818,5.10884334 21.8181818,4.58086382 C22.6681818,4.05269539 24.1,3.22851842 25,2.74908657 C25.9,2.26984362 27.4954545,1.59074294 28.5454545,1.23995297 C29.5954545,0.889351903 31.2258182,0.466779385 32.1683636,0.30073502 C33.2656364,0.107488848 34.9665455,-0.000751676129 36.8956364,0 C38.5958182,0.000570633942 40.6618182,0.119956343 41.6363636,0.273722114 C42.5863636,0.423520955 44.1,0.764110249 45,1.03046128 C45.9,1.2966234 47.8123636,2.1232561 49.2496364,2.86714997 C50.6869091,3.61104383 52.8141818,4.88518403 53.9769091,5.69859363 C55.1396364,6.51181432 56.8681818,7.77273143 57.8181818,8.50019087 C58.7681818,9.22783921 60.65,10.5626168 62,11.4665102 C63.35,12.3704035 65.2727273,13.5525487 66.2727273,14.0933736 C67.2727273,14.6343873 68.8272727,15.3299224 69.7272727,15.639154 C70.6272727,15.9483857 71.9569091,16.3144767 72.6818182,16.4527525 C73.4067273,16.5910284 74,16.7706737 74,16.8520902 C74,16.9335067 57.35,17 37,17 Z"
                    id="Path"
                  ></path>
                </svg>
              </motion.div>
            ) : null}
          </div>
          <div className="bg-gray-900 w-nav md:w-40 lg:w-56 h-14 flex justify-center items-center ">
            {router.pathname === page.link ? (
              <motion.div
                className={
                  'h-9 w-9 rounded-full flex justify-center items-center ' +
                  page.color
                }
                initial={{ scale: 1.3, translateY: -10 }}
                animate={{ scale: 1.3, translateY: -10 }}
              >
                <span className="text-white font-icon text-xl">
                  {page.icon}
                </span>
              </motion.div>
            ) : (
              <div className="h-9 w-9 flex justify-center items-center">
                <Link href={page.link}>
                  <span className={page.textcolor}>{page.icon}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex-auto">
        <div className="h-nav"></div>
        <div className="h-14 bg-gray-900"></div>
      </div>
    </div>
  );
};

export default NavigationBottom;
