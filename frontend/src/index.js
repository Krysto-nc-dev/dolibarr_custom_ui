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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />

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
          <Route path="commerce" element={<UserCommerceScreen />} />
          <Route path="billing" element={<UserBillingsScreen />} />
          <Route path="banks" element={<UserBanksScreen />} />
          <Route
            path="bank-account-details/:id"
            element={<UserBankAccountDetails />}
          />
          <Route path="accounting" element={<UserAccountingsScreen />} />
          <Route path="calendar" element={<UserCalendar />} />
          <Route path="profile" element={<UserProfileScreen />} />
          <Route path="support" element={<UserSupportScreen />} />
          <Route path="messages" element={<UserMessagesScreen />} />
          <Route path="entrepots" element={<UserWarehousesScreen />} />
          <Route
            path="user-thirdparties"
            element={<UserThirdPartiesScreen />}
          />
          <Route path="settings" element={<UserSettingsScreen />} />
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
