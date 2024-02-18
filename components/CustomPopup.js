import {
  PhoneIcon,
  LocationMarkerIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';

export default function CustomPopup(props) {
  const { info } = props;

  return (
    <div className="rounded-lg">
      <div className="bg-gray-600 px-1 rounded-t-lg text-white">{info.Nom}</div>
      <div className="bg-gray-400 p-1 text-sm flex ">
        <LocationMarkerIcon className="mr-1 h-5 w-5" aria-hidden="true" />
        {info.Lieu}
      </div>
      {info.Phone ? (
        <div className="bg-gray-300 p-1 text-sm flex">
          <PhoneIcon className="mr-1 h-5 w-5" aria-hidden="true" />
          {info.Phone}
        </div>
      ) : null}
      <div className="bg-gray-200 p-1 text-sm flex gap-1 flex-wrap">
        <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
        {info.DSObjets.map((produit) => (
          <div key={produit.Nom}>{produit.Nom}</div>
        ))}
      </div>
    </div>
  );
}
