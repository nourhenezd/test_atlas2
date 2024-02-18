import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

const pages = [
  {
    id: 1,
    icon: 'a',
    link: '/page1',
    color: 'bg-red-500',
    textcolor: 'text-white font-icon text-3xl hover:text-red-500',
  },
  {
    id: 2,
    icon: 'b',
    link: '/page2',
    color: 'bg-yellow-500',
    textcolor: 'text-white font-icon text-3xl hover:text-yellow-500',
  },
  {
    id: 3,
    icon: 'c',
    link: '/',
    color: 'bg-blue-500',
    textcolor: 'text-white font-icon text-3xl hover:text-blue-500',
  },
  {
    id: 4,
    icon: 'd',
    link: '/getmap1',
    color: 'bg-indigo-500',
    textcolor: 'text-white font-icon text-3xl hover:text-indigo-500',
  },
  {
    id: 5,
    icon: 'e',
    link: '/contact',
    color: 'bg-green-500',
    textcolor: 'text-white font-icon text-3xl hover:text-green-500',
  },
];

const NavigationBottom = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row bottom-0 left-0 opacity-70 fixed w-full z-10">
      <div className="flex-auto">
        <div className="h-20"></div>
        <div className="h-16 bg-gray-900"></div>
      </div>

      {pages.map((page) => (
        <div className="flex flex-col items-center " key={page.id}>
          <div className="fill-current text-gray-900 h-20">
            {router.pathname === page.link ? (
              <motion.div layoutId="underline">
                <svg width="170px" viewBox="0 -80 546 265">
                  <path d="M272.5 177 C160.575 177 69 176.642 69 176.204 69 175.766 72.232 174.853 76.183 174.175 80.134 173.498 88.224 171.33 94.162 169.357 100.099 167.385 109.595 163.192 115.262 160.041 120.93 156.889 132.135 150.018 140.161 144.772 148.187 139.526 160.547 130.983 167.627 125.786 174.707 120.59 184.325 114.051 189 111.256 193.675 108.46 201.55 104.097 206.5 101.559 211.45 99.022 220.225 95.427 226 93.57 231.775 91.714 240.742 89.477 245.926 88.598 251.961 87.575 261.316 87.002 271.926 87.006 281.277 87.009 292.64 87.641 298 88.455 303.225 89.248 311.55 91.051 316.5 92.461 321.45 93.87 331.968 98.246 339.873 102.184 347.778 106.122 359.478 112.867 365.873 117.173 372.268 121.478 381.775 128.153 387 132.004 392.225 135.856 402.575 142.922 410 147.707 417.425 152.492 428 158.75 433.5 161.613 439 164.477 447.55 168.159 452.5 169.796 457.45 171.433 464.763 173.371 468.75 174.103 472.737 174.835 476 175.786 476 176.217 476 176.648 384.425 177 272.5 177 Z" />
                </svg>
              </motion.div>
            ) : null}
          </div>
          <div className="bg-gray-900 w-44 md:w-48 lg:w-60 h-16 flex justify-center items-center">
            {router.pathname === page.link ? (
              <motion.div
                className={
                  'h-12 w-12 rounded-full flex justify-center items-center m-1.5 ' +
                  page.color
                }
                initial={{ scale: 1.3, translateY: -12 }}
                animate={{ scale: 1.3, translateY: -12 }}
              >
                <span className="text-white font-icon text-3xl">
                  {page.icon}
                </span>
              </motion.div>
            ) : (
              <div className="h-12 w-12 flex justify-center items-center m-1.5">
                <Link href={page.link}>
                  <span className={page.textcolor}>{page.icon}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex-auto">
        <div className="h-20"></div>
        <div className="h-16 bg-gray-900"></div>
      </div>
    </div>
  );
};

export default NavigationBottom;
