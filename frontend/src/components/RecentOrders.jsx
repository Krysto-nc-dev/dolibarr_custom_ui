
import React from 'react'
import { Link } from 'react-router-dom';
import { getOrderStatus } from './utils/getOrderStatus';

const recentOrdersData = [
    {
      id: 1,
      product_id: '4324',
      customer_id: '23143',
      customer_name: 'John Doe',
      order_date: '2024-05-17T03:24:00',
      order_total: '1000 XPF',
      current_order_status: 'PLACED',
      shipement_address: '123 rue de la plage, 98765 Nouméa',
    },
    {
      id: 2,
      product_id: '5321',
      customer_id: '23145',
      customer_name: 'Jane Smith',
      order_date: '2024-05-18T12:34:00',
      order_total: '1500 XPF',
      current_order_status: 'CONFIRMED',
      shipement_address: '456 rue du port, 98765 Nouméa',
    },
    {
      id: 3,
      product_id: '7654',
      customer_id: '23146',
      customer_name: 'Bob Johnson',
      order_date: '2024-05-19T08:50:00',
      order_total: '2000 XPF',
      current_order_status: 'SHIPPED',
      shipement_address: '789 rue de la mer, 98765 Nouméa',
    },
    {
      id: 4,
      product_id: '8765',
      customer_id: '23147',
      customer_name: 'Alice Martin',
      order_date: '2024-05-20T09:10:00',
      order_total: '2500 XPF',
      current_order_status: 'OUT_FOR_DELIVERY',
      shipement_address: '321 rue du lac, 98765 Nouméa',
    },
    {
      id: 5,
      product_id: '9876',
      customer_id: '23148',
      customer_name: 'Charlie Brown',
      order_date: '2024-05-21T10:20:00',
      order_total: '3000 XPF',
      current_order_status: 'DELIVERED',
      shipement_address: '654 rue de la montagne, 98765 Nouméa',
    },
    {
      id: 6,
      product_id: '5432',
      customer_id: '23149',
      customer_name: 'Dana White',
      order_date: '2024-05-22T11:30:00',
      order_total: '3500 XPF',
      current_order_status: 'DELIVERED',
      shipement_address: '987 rue de la rivière, 98765 Nouméa',
    },
    {
      id: 7,
      product_id: '6543',
      customer_id: '23150',
      customer_name: 'Evan Harris',
      order_date: '2024-05-23T12:40:00',
      order_total: '4000 XPF',
      current_order_status: 'DELIVERED',
      shipement_address: '321 rue de la vallée, 98765 Nouméa',
    },
  ];

const RecentOrders = () => {
  return (
    <div className="bg-gray-600 px-4 pt-3 pb-4 rounded-lg border border-primaryColor flex-1">
      <strong className="text-center font-semibold mb-4">
        Dernières commandes
      </strong>
      <div className="mt-3">
        <table className='w-full border-x border-primaryColor rounded-lg'>
          <thead className='bg-primaryColor text-white font-bold'>
            <tr>
              <td>ID</td>
              <td>ID Produit</td>
              <td>Client</td>
              <td>Date </td>
              <td>Total </td>
              <td>Livraison</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {recentOrdersData.map((order) => (
              <tr key={order.id} className='bg-gray-500' >
                
                <td>{order.id}</td>
                <td><Link to={`/product/${order.product_id}`}>{order.product_id}</Link> </td>
             
                <td><Link to={`/customer/${order.customer_id}`}>{order.customer_name}</Link> </td>

                <td>{ new Date(order.order_date).toLocaleDateString() }</td>
                <td>{order.order_total}</td>
                <td>{order.shipement_address}</td>
                <td>  {getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders
