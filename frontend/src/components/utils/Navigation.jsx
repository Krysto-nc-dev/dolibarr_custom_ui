import { LayoutDashboard, Settings, LogOut, Box, Users, Calendar, CreditCard, ShoppingCart, Book, DollarSign, MessageCircleQuestion, Warehouse } from 'lucide-react';

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'Tableau de bord',
    label: 'Tableau de bord',
    icon: <LayoutDashboard />,
    href: '/dashboard',
  },

  {
    key: 'tiers',
    label: 'Tiers',
    icon: <Users />,
    href: '/user-thirdparties',
  },

  {
    key: 'Produits',
    label: 'Produits',
    icon: <Box />,
    href: '/user-products',
  },
  {
    key: 'Entrepots',
    label: 'Entrepots',
    icon: <Warehouse />,
    href: '/entrepots',
  },
  {
    key: 'commerce',
    label: 'Commerce',
    icon: <ShoppingCart />,
    href: '/commerce',
  },
  {
    key: 'facturation & paiement',
    label: 'Facturation & Paiement',
    icon: <DollarSign />,
    href: '/billing',
  },
  {
    key: 'banques & caisses',
    label: 'Banques & Caisses',
    icon: <CreditCard />,
    href: '/banks',
  },
  {
    key:'comptabilite',
    label: 'Comptabilité',
    icon: <Book />,
    href: '/accounting',
  },
  {
    key:'agenda',
    label: 'Agenda',
    icon: <Calendar />,
    href: '/calendar',
  },
  
  // Ajoutez d'autres liens ici pour les autres menus du sidebar
];
