import React from 'react'
import { useGetMessagesQuery } from '../../slices/messageApiSlice'

const UserMessagesScreen = () => {
  const { data: messages, error: messagesError, isLoading: loadingMessages } = useGetMessagesQuery()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages envoyer via le site</h1>

      {loadingMessages && <p>Loading messages...</p>}
      {messagesError && <p>Error loading messages: {messagesError.message}</p>}
      {messages && (
        <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id} className={message.status === 'Lu' ? 'bg-green-500' : 'bg-red-500'}>
              <td className="border px-4 py-2">{message.email}</td>
              <td className="border px-4 py-2">{message.name}</td>
              <td className="border px-4 py-2">{message.message}</td>
              <td className="border px-4 py-2">{message.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
}

export default UserMessagesScreen
