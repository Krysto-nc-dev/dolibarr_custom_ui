import React from 'react'
import { useGetPresentationByIdQuery } from '../../slices/presentationApiSlice'
import { useParams } from 'react-router-dom'

const UserEditPresentation = () => {

    const {id:presentationId} = useParams()

    const {data: presentation , error:presentationError, isLoading: LoadingPresentation } = useGetPresentationByIdQuery(presentationId)
  return (
    <div>UserEditPresentation</div>
  )
}

export default UserEditPresentation