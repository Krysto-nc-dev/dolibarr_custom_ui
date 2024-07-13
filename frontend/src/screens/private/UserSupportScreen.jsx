import React from 'react'

const UserSupportScreen = () => {
  return (
    <div className="h-screen p-6 bg-backgroundColor text-textColor">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor text-center">
        Support Utilisateur
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* FAQ Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-secondaryColor">
            FAQ
          </h2>
          <div className="space-y-4">
            <details className="group">
              <summary className="font-medium cursor-pointer text-lg">
                Comment réinitialiser mon mot de passe ?
              </summary>
              <p className="mt-2 text-sm group-open:block">
                Pour réinitialiser votre mot de passe, cliquez sur "Mot de passe
                oublié" sur la page de connexion et suivez les instructions.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer text-lg">
                Comment contacter le support ?
              </summary>
              <p className="mt-2 text-sm group-open:block">
                Vous pouvez contacter notre équipe de support en utilisant le
                formulaire de contact ci-dessous ou en appelant notre ligne
                d'assistance.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer text-lg">
                Comment mettre à jour mes informations personnelles ?
              </summary>
              <p className="mt-2 text-sm group-open:block">
                Pour mettre à jour vos informations personnelles, accédez à
                votre compte et cliquez sur "Modifier le profil".
              </p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer text-lg">
                Où puis-je trouver mes factures ?
              </summary>
              <p className="mt-2 text-sm group-open:block">
                Vos factures sont disponibles dans la section "Factures" de
                votre compte. Vous pouvez les télécharger à tout moment.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer text-lg">
                Comment supprimer mon compte ?
              </summary>
              <p className="mt-2 text-sm group-open:block">
                Pour supprimer votre compte, veuillez contacter notre support
                via le formulaire de contact ou par téléphone.
              </p>
            </details>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-secondaryColor">
            Contactez-nous
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textColor mb-1">
                Nom
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textColor mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textColor mb-1">
                Message
              </label>
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor-dark transition-colors"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      {/* Additional Resources Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-secondaryColor">
          Ressources supplémentaires
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="https://www.preciousplastic.com/"
              className="text-accentColor hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Le site de precious plastic
            </a>
          </li>
          <li>
            <a
              href="https://preciousplastic.fr/academy/intro/"
              className="text-accentColor hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Precious Plastic Academy
            </a>
          </li>
        
          <li>
            <a
              href="https://bazar.preciousplastic.com/"
              className="text-accentColor hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Precious Plastic Bazar
            </a>
          </li>
          <li>
            <a
              href="https://discord.com/invite/Nkmfq29N"
              className="text-accentColor hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Le Discord de Precious Plastic France
            </a>
          </li>
          {/* Ajoutez d'autres ressources ici */}
        </ul>
      </div>
    </div>
  )
}

export default UserSupportScreen
