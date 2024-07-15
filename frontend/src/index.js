import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
import NotFound from './screens/NotFound'
import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import UserRoute from './components/utils/UserRoutes'
import HomeScreen from './screens/HomeScreen'
import DashboardLayout from './components//layout/DashboardLayout.jsx'
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'
import UserDashboardScreen from './screens/private/UserDashboardScreen'
import UserProductScreen from './screens/private/UserProductScreen'
import UserThirdPartiesScreen from './screens/private/UserThirdPartiesScreen'
import UserSettingsScreen from './screens/private/UserSettingsScreen'
import UserContactsScreen from './screens/private/UserContactsScreen'
import UserCommerceScreen from './screens/private/UserCommerceScreen.jsx'
import UserBillingsScreen from './screens/private/UserBillingsScreen.jsx'
import UserBanksScreen from './screens/private/UserBanksScreen.jsx'
import UserAccountingsScreen from './screens/private/UserAccountingsScreen.jsx'
import UserCalendar from './screens/private/UserCalendar.jsx'
import UserProfileScreen from './screens/private/UserProfileScreen.jsx'
import UserSupportScreen from './screens/private/UserSupportScreen.jsx'
import UserMessagesScreen from './screens/private/UserMessagesScreen.jsx'
import UserProductDetailsScreen from './screens/private/UserProductDetailsScreen.jsx'
import UserWarehousesScreen from './screens/private/UserWarehousesScreen.jsx'
import UserBankAccountDetails from './screens/private/UserBankAccountDetails.jsx'
import UserEventDetailsScreen from './screens/private/UserEventDetailsScreen.jsx'
import UserWarehouseDetailsScreen from './screens/private/UserWarehouseDetailsScreen.jsx'
import UserInvoiceDetails from './screens/private/UserInvoiceDetails.jsx'
import UserPropalScreen from './screens/private/UserPropalScreen.jsx'
import AddEventForm from './screens/private/AddEventForm.jsx'
import UserMachinesAndMolds from './screens/private/UserMachinesAndMolds.jsx'
import UserRecipesScreen from './screens/private/UserRecipesScreen.jsx'

import UserThirdpartieDetails from './screens/private/UserThirdpartieDetails.jsx'
import PlasticColorsScreen from './screens/private/PlasticColorsScreen.jsx'
import UserPlasticsScreen from './screens/private/UserPlasticsScreen.jsx'
import PlasticTypesScreen from './screens/private/PlasticTypesScreen.jsx'
import UserVeillesScreen from './screens/private/UserVeillesScreen.jsx'
import UserRecyclableProducts from './screens/private/UserRecyclableProducts.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import UserPropalDetails from './screens/private/userPropalDetails.jsx'
import UserMachineAndMouldDetails from './screens/private/UserMachineAndMouldDetails.jsx'
import RecipeDetails from './screens/private/RecipeDetails.jsx'
import UserColorMixCalculatorScreen from './screens/private/UserColorMixCalculatorScreen'
import UserVeilleDetailsScreen from './screens/private/UserVeilleDetailsScreen.jsx'
import ProjectScreen from './screens/private/ProjectScreen.jsx'
import ProjectDetailsScreen from './screens/private/ProjectDetailsScreen.jsx'

import UserCampagneCollects from './screens/private/UserCampagneCollects.jsx'
import UserCampagneCollecteDetailsScreen from './screens/private/UserCampagneCollectDetails.jsx'
import UserPlasticStocks from './screens/private/UserPlasticStocks.jsx'
import UserDocumentation from './screens/private/UserDocumentation.jsx'
import UserSupplierInvoicesScreen from './screens/private/UserSupplierInvoicesScreen.jsx'
import UserEmailBank from './screens/private/UserEmailBank.jsx'
import UserCashierScreen from './screens/private/UserCashierScreen.jsx'
import UserCashierDetailsScreen from './screens/private/UserCashierDetailsScreen.jsx'
import NewCashierScreen from './screens/private/NewCashierScreen.jsx'
import ShopScreen from './screens/ShopScreen.jsx'
import AboutScreen from './screens/AboutScreen.jsx'
import ContactScreen from './screens/ContactScreen.jsx'
import DeveloppementsScreen from './screens/DeveloppementsScreen.jsx'
import InitiationsScreen from './screens/InitiationsScreen.jsx'
import PublicHeader from './components/publicComponents/layout/PublicHeader.jsx'
import PublicLayout from './components/publicComponents/layout/PublicLayout.jsx'
import BlogScreen from './screens/BlogScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}

      <Route path="/" element={<PublicLayout />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/krysto-shop" element={<ShopScreen />} />
        <Route path="/a-propos" element={<AboutScreen />} />
        <Route path="/contacts" element={<ContactScreen />} />
        <Route path="/krysto-dev" element={<DeveloppementsScreen />} />
        <Route path="/initiations" element={<InitiationsScreen />} />
        <Route path="/blog" element={<BlogScreen />} />
      </Route>

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboardScreen />} />
          <Route path="user-contacts" element={<UserContactsScreen />} />
          <Route path="user-products" element={<UserProductScreen />} />
          <Route
            path="user-product-details/:id"
            element={<UserProductDetailsScreen />}
          />
          <Route path="propal" element={<UserPropalScreen />} />
          <Route path="propal-details/:id" element={<UserPropalDetails />} />
          <Route path="commerce" element={<UserCommerceScreen />} />
          <Route path="billing" element={<UserBillingsScreen />} />
          <Route path="banks" element={<UserBanksScreen />} />
          <Route
            path="bank-account-details/:id"
            element={<UserBankAccountDetails />}
          />
          <Route
            path="user-invoice-details/:id"
            element={<UserInvoiceDetails />}
          />
          <Route path="accounting" element={<UserAccountingsScreen />} />
          <Route path="calendar" element={<UserCalendar />} />
          <Route path="add-event-form" element={<AddEventForm />} />
          <Route
            path="machines-and-moulds"
            element={<UserMachinesAndMolds />}
          />
          <Route
            path="machine-details/:id"
            element={<UserMachineAndMouldDetails />}
          />
          <Route
            path="/campagnes-collecte"
            element={<UserCampagneCollects />}
          />
          <Route
            path="campagne-details/:id"
            element={<UserCampagneCollecteDetailsScreen />}
          />
          <Route
            path="color-calculators"
            element={<UserColorMixCalculatorScreen />}
          />
          <Route path="recipes" element={<UserRecipesScreen />} />
          <Route path="recipe-details/:id" element={<RecipeDetails />} />
          <Route path="event/:id" element={<UserEventDetailsScreen />} />
          <Route path="profile" element={<UserProfileScreen />} />
          <Route path="support" element={<UserSupportScreen />} />
          <Route path="messages" element={<UserMessagesScreen />} />
          <Route path="entrepots" element={<UserWarehousesScreen />} />
          <Route path="plastics" element={<UserPlasticsScreen />} />
          <Route path="plastic-colors" element={<PlasticColorsScreen />} />
          <Route path="plastic-types" element={<PlasticTypesScreen />} />
          <Route path="veilles" element={<UserVeillesScreen />} />
          <Route path="cashier" element={<UserCashierScreen />} />
          <Route path="new-cashier" element={<NewCashierScreen />} />
          <Route
            path="cashier-details/:id"
            element={<UserCashierDetailsScreen />}
          />
          <Route
            path="veille-details/:id"
            element={<UserVeilleDetailsScreen />}
          />
          <Route
            path="recyclable-products"
            element={<UserRecyclableProducts />}
          />
          <Route
            path="user-warehouse-details/:id"
            element={<UserWarehouseDetailsScreen />}
          />
          <Route
            path="user-thirdparties"
            element={<UserThirdPartiesScreen />}
          />
          <Route
            path="user-third-party-details/:id"
            element={<UserThirdpartieDetails />}
          />
          <Route path="projet" element={<ProjectScreen />} />
          <Route path="projects/:id" element={<ProjectDetailsScreen />} />

          <Route path="settings" element={<UserSettingsScreen />} />
          <Route path="plastic-stocks" element={<UserPlasticStocks />} />
          <Route
            path="supplier-invoices"
            element={<UserSupplierInvoicesScreen />}
          />
          <Route path="documentation" element={<UserDocumentation />} />
          <Route path="mail-bank" element={<UserEmailBank />} />
        </Route>
      </Route>

      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboardScreen />} />
      </Route>

      {/* Users */}
      <Route path="" element={<UserRoute />}></Route>

      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
