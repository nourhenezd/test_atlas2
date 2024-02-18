import { useState, useEffect, Fragment } from 'react';
import { motion } from 'framer-motion';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Pins from './CustomMarker';
import CustomPopup from './CustomPopup';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/solid';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2FtaWJhaHJpIiwiYSI6ImNrcjY1ZXBrNDNjYmkzMW82cWo0anp6ZG8ifQ.qQBxdUJ15p_A9iyCiBWNpw';

const filters = [
  { id: '1', key: 'Tous les objets', markerID: '0' },
  { id: '2', key: 'Jebba', markerID: '1' },
  { id: '3', key: 'Chechia', markerID: '2' },
  { id: '4', key: 'Bakhnoug', markerID: '3' },
  { id: '5', key: 'Farmla', markerID: '4' },
  { id: '6', key: 'Bijoux', markerID: '5' },
  { id: '7', key: 'Klîm', markerID: '6' },
  { id: '8', key: 'Margûm', markerID: '7' },
];

export default function MapboxGL({ artisans }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 34.5,
    longitude: 9.6,
    zoom: 6,
    maxZoom: 12,
    minZoom: 6,
  });

  artisans.forEach((artisan) => {
    const latitude = null;
    const longitude = null;
    artisan.Geolocalisation
      ? ([latitude, longitude] = artisan.Geolocalisation.split(', '))
      : null;
    artisan.latitude = parseFloat(latitude);
    artisan.longitude = parseFloat(longitude);
  });

  const filtered = artisans;

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [popupInfo, setPopupInfo] = useState(null);

  switch (selectedFilter) {
    case filters[0]:
      {
        filtered = artisans;
      }
      break;
    case filters[1]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[1].key)
        );
      }
      break;
    case filters[2]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[2].key)
        );
      }
      break;
    case filters[3]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[3].key)
        );
      }
      break;
    case filters[4]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[4].key)
        );
      }
      break;
    case filters[5]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[5].key)
        );
      }
      break;
    case filters[6]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[6].key)
        );
      }
      break;
    case filters[7]:
      {
        filtered = artisans.filter((artisan) =>
          artisan.DSObjets.some((produit) => produit.Nom === filters[7].key)
        );
      }
      break;
  }

  return (
    <div>
      <div className="inline-block absolute top-0 left-0 z-10 w-full">
        <div
          id="notch"
          className="flex flex-row justify-center content-center top-0 sticky"
        >
          <div className="flex flex-row justify-center content-center bg-blue-900 opacity-80 rounded-b-3xl text-white p-1  w-5/6 lg:w-2/5">
            <div className="flex gap-3 md:gap-7">
              <div className="flex-none font-bold lg:text-lg lg:w-30">
                Cartographie
              </div>
              <div id="selector" className="items-center justify-end">
                <Listbox value={selectedFilter} onChange={setSelectedFilter}>
                  <Listbox.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-0.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                    {selectedFilter.key}
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {filters.map((filter) => (
                      /* Use the `active` state to conditionally style the active option. */
                      /* Use the `selected` state to conditionally style the selected option. */
                      <Listbox.Option
                        key={filter.id}
                        value={filter}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <div className="py-1 text-black">
                            <li
                              className={
                                (active
                                  ? 'bg-gray-100 text-gray-900 flex'
                                  : 'text-gray-800 hover:bg-gray-300',
                                'px-4 py-1 text-sm flex')
                              }
                              onClick={() => {
                                setSelectedFilter(filter);
                              }}
                            >
                              {selected && (
                                <CheckCircleIcon className="h-5 w-5 flex" />
                              )}
                              {filter.key}
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
      </div>
      <div className="h-screen">
        <ReactMapGL
          mapStyle="mapbox://styles/samibahri/ckr7k2nmt1vu418mx5ubieodb"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          <Pins data={filtered} onClick={setPopupInfo} />

          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              closeOnClick={false}
              onClose={setPopupInfo}
              offsetLeft={0}
              offsetTop={0}
            >
              <CustomPopup info={popupInfo} />
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
}
