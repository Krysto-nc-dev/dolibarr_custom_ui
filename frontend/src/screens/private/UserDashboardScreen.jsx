import React from 'react'
import ColorPicker from '../../components/ColorPicker'

const UserDashboardScreen = () => {
  return (
    <div>
    <h1 className="text-3xl font-bold underline">Tableau de Bord</h1>
    <p>Bienvenue sur le tableau de bord.</p>

    <ColorPicker/>
  </div>
  )
}

export default UserDashboardScreen