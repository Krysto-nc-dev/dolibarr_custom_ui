export function getOrderStatus(orderStatus) {
  switch (orderStatus) {
    case 'PLACED':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
          Commande passée
        </span>
      )
    case 'CONFIRMED':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
          Commande confirmée
        </span>
      )
    case 'SHIPPED':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
          Expédiée
        </span>
      )
    case 'OUT_FOR_DELIVERY':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
          En cours de livraison
        </span>
      )
    case 'DELIVERED':
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          Livrée
        </span>
      )
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          Statut inconnu
        </span>
      )
  }
}
