import { useRef, useState, useEffect, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

const entries = [
  { id: '1', name: 'Habits Traditionnels', markerID: '0' },
  { id: '2', name: 'Jebba', markerID: '1' },
  { id: '3', name: 'Chechia', markerID: '2' },
  { id: '4', name: 'Bakhnoug', markerID: '3' },
];

const marker = [
  { id: '1', name: 'Habits Traditionnels', latitude: 34.5, longitude: 10.5 },
  { id: '2', name: 'Jebba', latitude: 34.6, longitude: 10.6 },
  { id: '3', name: 'Chechia', latitude: 34.7, longitude: 10.7 },
  { id: '4', name: 'Bakhnoug', latitude: 34.8, longitude: 10.8 },
];

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FtaWJhaHJpIiwiYSI6ImNrcjY1ZXBrNDNjYmkzMW82cWo0anp6ZG8ifQ.qQBxdUJ15p_A9iyCiBWNpw';

const GetMapboxv3 = ({ artisans }) => {
  const [selectedArtisan, setSelectedArtisan] = useState(entries[0]);
  const [selectedMarker, setSelectedMarker] = useState(marker);

  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(10);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(6);

  const [marker, setMarker] = useState([]);

  artisans.forEach((artisan) => {
    const latitude = null;
    const longitude = null;
    const objets = null;
    artisan.Geolocalisation
      ? ([latitude, longitude] = artisan.Geolocalisation.split(', '))
      : null;
    artisan.latitude = parseFloat(latitude);
    artisan.longitude = parseFloat(longitude);
  });

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/samibahri/ckr7k2nmt1vu418mx5ubieodb',
      center: [lng, lat],
      zoom: zoom,
      minZoom: 6,
      maxZoom: 12,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    artisans.forEach((artisan) => {
      artisan.longitude && artisan.latitude // if location has longitude and latitude
        ? new mapboxgl.Marker({ color: 'red' })
            .setLngLat([artisan.longitude, artisan.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                  `<div class="font-bold ">${artisan.Nom}</div><div class="text-gray-700">${artisan.Lieu}</div><div class="text-gray-700">${artisan.objets}</div>`
                )
            )
            .addTo(map)
        : null;
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    // return () => map.remove();
  }, []);

  return (
    <div>
      <div className="inline-block absolute top-0 left-0 z-10 w-full">
        <div
          id="notch"
          className="flex flex-row justify-center content-center top-0 sticky"
        >
          <div className="flex flex-row justify-center content-center bg-gray-900 opacity-70 rounded-b-3xl text-white p-1 w-1/3">
            <div className="font-icon font-bold text-xl text-gray-100">d </div>
            <div className="font-bold text-lg">
              &nbsp; Cartographie : &nbsp;
            </div>
            <div id="selector">
              <Listbox value={selectedArtisan} onChange={setSelectedArtisan}>
                <Listbox.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-0.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500">
                  {selectedArtisan.name}{' '}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {entries.map((Artisan) => (
                    /* Use the `active` state to conditionally style the active option. */
                    /* Use the `selected` state to conditionally style the selected option. */
                    <Listbox.Option
                      key={Artisan.id}
                      value={Artisan}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <div className="py-1 text-black">
                          <li
                            className={
                              (active
                                ? 'bg-gray-100 text-gray-900 '
                                : 'text-gray-700 hover:bg-gray-300',
                              'px-4 py-1 text-sm')
                            }
                            onClick={() => {
                              setSelectedArtisan(Artisan);
                              setSelectedMarker(marker[Artisan.markerID]);
                            }}
                          >
                            {Artisan.Nom}{' '}
                            {selected && <CheckIcon className="h-5 w-5 flex" />}
                          </li>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen" ref={mapContainerRef} />
    </div>
  );
};

export default GetMapboxv3;
