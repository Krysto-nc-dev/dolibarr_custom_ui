import React from 'react';
import ColorMixCalculator from "../../components/ColorMixCalculator";
import { useGetPlasticColorsQuery } from "../../slices/plasticColorSlice";
import Loader from '../../components/shared/Loader';

const UserColorMixCalculatorScreen = () => {
  const { data: colors, error: errorColors, isLoading: loadingColors } = useGetPlasticColorsQuery();

  if (loadingColors) {
    return <Loader/>;
  }

  if (errorColors) {
    return <div className="flex justify-center items-center h-screen"><span className="text-lg text-red-500">Erreur de chargement des couleurs.</span></div>;
  }

  return (
    <div>
      {colors ? (
        <ColorMixCalculator colors={colors} />
      ) : (
        <div className="flex justify-center items-center h-screen"><span className="text-lg">Aucune couleur disponible.</span></div>
      )}
    </div>
  );
};

export default UserColorMixCalculatorScreen;
