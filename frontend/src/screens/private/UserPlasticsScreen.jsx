import React from 'react';
import { Link } from 'react-router-dom';

const UserPlasticsScreen = () => {
  return (
    <div className="h-screen flex flex-col bg-backgroundColor text-textColor">
      <div className="flex gap-3 justify-center py-4 bg-white shadow-md">
        <Link
          to="/plastic-colors"
          className="inline-block px-6 py-3 text-white bg-primaryColor rounded-lg shadow-md hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-opacity-75 transition"
        >
          Couleurs plastique
        </Link>
        <Link
          to="/plastic-types"
          className="inline-block px-6 py-3 text-white bg-secondaryColor rounded-lg shadow-md hover:bg-secondaryColor-dark focus:outline-none focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-75 transition"
        >
          Types de plastique
        </Link>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-center">Informations génèrale sur les plastiques</h2>
      <p className='text-textColor mb-3 mt-6 text-[14px]'>
      Le mot plastique fait partie du vocabulaire courant depuis longtemps, mais que signifie-t-il réellement? Le mot est dérivé du grec “plastikos” qui signifie “capable d'être formé ou moulé”, faisant référence à la malléabilité du matériau lors de sa transformation. Cette propriété permet au plastique d'être coulé, pressé ou extrudé pour obtenir des formes variées - des films, des fibres, des plaques, des tubes, des bouteilles, etc...
      </p>
      <p className='text-textColor mb-3 text-[14px] '>
      Les plastiques sont des produits chimiques de synthèse extraits principalement du pétrole et fabriqués à partir d'hydrocarbures (chaînes composées d'atomes d'hydrogène et de carbone). La plupart des plastiques sont des polymères, de longues molécules composées de nombreuses répétitions d'une molécule de base appelée monomère. C’est cette structure particulière qui rend le plastique particulièrement durable et résistant dans le temps.
      </p>
      <p className='text-textColor mb-3 text-[14px] '>
      En raison de leur coût relativement faible, de leur facilité de fabrication et de leur polyvalence, les plastiques sont utilisés dans une part énorme et croissante de produits : des bouteilles de shampooing aux fusées spatiales. L'omniprésence et le volume même de la production de plastique (on en trouve partout!) causent de graves dommages à l'environnement en raison de sa lente décomposition (des études récentes disent 500 ans) garantie par les liaisons fortes entre ses molécules.
      </p>
      <p className='text-textColor mb-3 text-[14px] '>
      Pensez-y de cette façon, tous les plastiques utilisés par vos parents, vos grands-parents et vos arrière-grands-parents sont toujours là et pollueront la planète pendant encore quatre siècles.
      </p>
      <p className='text-textColor mb-3 text-[14px] '>
      La plupart des plastiques sont mélangés à d'autres composés organiques ou inorganiques, appelés additifs, dont le rôle est d’améliorer les performances ou de réduire les coûts de production. La quantité d'additifs varie largement en fonction de l'application et du type de plastique
      </p>
      <p className='text-textColor mb-3 text-[14px] '>
      Donc vous pouvez en trouver partout dans le monde, et il se retrouve dans des endroits où nous ne voudrions certainement pas qu'il soit...
      </p>

      <p className='text-xl text-center font-bold'>
      Nous produisons plus de 300 millions de tonnes métriques de plastique neuf chaque année 🤯
      </p>


      <Link
  className="flex items-center justify-center w-full bg-white p-3 text-center mt-4"
  to="https://preciousplastic.fr/academy/intro/"
  target="_blank"
  rel="noopener noreferrer"
>
  <p className="font-bold">Cliquez ici et apprenez les fondamentaux avec la Precious Plastic Academy !</p>
</Link>


      </div>
    </div>
  );
};

export default UserPlasticsScreen;
