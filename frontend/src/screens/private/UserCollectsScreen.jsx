import React from 'react'
import { useGetCollectesQuery } from '../../slices/collecteApiSlice'
import Header from '../../components/layout/Header';

const UserCollectsScreen = () => {

  const {data:collectes , error: errorCollectes , isLoading: loadingCollectes} = useGetCollectesQuery()
    console.log(collectes);
  if (loadingCollectes) {
    return <Header/>;
  }

  if (errorCollectes) {
    return <div className="text-center mt-4 text-red-500">Erreur : {errorCollectes.message}</div>;
  }

  if (!collectes) {
    return (
      <div className="text-center mt-4">
        Aucun Collectes
      </div>
    );
  }
  return (
    <div>

    <h1>Collectes de plastiques</h1>
    </div>
  )
}

export default UserCollectsScreen