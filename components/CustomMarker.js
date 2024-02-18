import { Marker } from 'react-map-gl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
const markerclass =
  'h-6 w-6 bg-red-500 text-white text-sb rounded-full cursor-pointer font-icon text-center';

export default function Pins(props) {
  const { data, onClick } = props;

  return data.map((artisan) => (
    <Marker
      key={artisan.Nom}
      longitude={artisan.longitude}
      latitude={artisan.latitude}
      offsetLeft={-20}
      offsetTop={-20}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        whileHover={{
          scale: 2,
        }}
        onClick={() => onClick(artisan)}
      >
        {isMobile ? (
          <Image
            src="/images/icons/user.png"
            width={30}
            height={30}
            alt="map marker icon"
          />
        ) : (
          <Image
            src="/images/icons/user.png"
            width={40}
            height={40}
            alt="map marker icon"
          />
        )}
      </motion.div>
    </Marker>
  ));
}
