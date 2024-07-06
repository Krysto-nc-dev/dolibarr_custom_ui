import React from 'react'
import { useParams } from 'react-router-dom'

const UserThirdpartieDetails = () => {
    const {id: thirdpartieId} = useParams()
  return (
    <div>
        <h1>Tiers avec l'id : {thirdpartieId}</h1>
    </div>
  )
}

export default UserThirdpartieDetails