import DashboardCardGrid from '../../components/DashboardCardGrid'
import TransactionChart from '../../components/TransactionChart'
import BuyerProfileChart from '../../components/BuyerProfileChart'
import RecentOrders from '../../components/RecentOrders'
import PopularProducts from '../../components/PopularProducts'

const UserDashboardScreen = () => {
  return (
    <div className="flex gap-4 flex-col">
      <DashboardCardGrid />
      <div className="flex w-full gap-4">
        <div className="flex-1 bg-gray-600 p-4 border border-primaryColor rounded-lg">
          <h2 className="text-center font-semibold mb-4">Contenu supplémentaire</h2>
          {/* Contenu supplémentaire */}

          {/* Ajoutez ici le contenu que vous souhaitez afficher à côté du graphique */}
        </div>
        <BuyerProfileChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  )
}

export default UserDashboardScreen
