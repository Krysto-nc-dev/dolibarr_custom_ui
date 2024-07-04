import React from 'react'

const LoginScreen = () => {
  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-center text-veryDarkBlue mb-6">
        Connexion
      </h2>
      <form className="space-y-8">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-grayishBlue">
            Adresse email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-softBlue focus:border-softBlue sm:text-sm"
            placeholder="Votre email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-grayishBlue">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-softBlue focus:border-softBlue sm:text-sm"
            placeholder="Votre mot de passe"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="h-4 w-4 text-softBlue focus:ring-softBlue border-gray-300 rounded"
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm text-grayishBlue">
              Se souvenir de moi
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-softBlue hover:text-softRed">
              Mot de passe oublié ?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-softBlue hover:bg-softRed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-softBlue"
          >
            Se connecter
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-grayishBlue">
        Vous n'avez pas de compte ?{' '}
        <a href="#" className="font-medium text-softBlue hover:text-softRed">
          Inscrivez-vous
        </a>
      </p>
    </div>
  </div>
  )
}

export default LoginScreen