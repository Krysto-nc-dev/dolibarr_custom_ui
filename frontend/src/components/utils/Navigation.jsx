import { LayoutDashboard, Box, Users, Calendar, CreditCard,  Book, DollarSign,  Warehouse, FilePen, Recycle, CookingPot, Factory } from 'lucide-react';

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
    key: 'propal',
    label: 'Devis',
    icon: <FilePen />,
    href: '/propal',
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
    key:'machineAndMoulds',
    label: 'Machines & Moules',
    icon: <Factory />,
    href: '/machines-and-moulds',
  },
  {
    key:'plastics',
    label: 'plastiques',
    icon: <Factory />,
    href: '/plastics',
  },
  {
    key:'recyclableProducts',
    label: 'produit recyclable',
    icon: <Factory />,
    href: '/recyclable-products',
  },
  {
    key:'collecte',
    label: 'Collectes',
    icon: <Recycle />,
    href: '/collectes',
  },
  {
    key:'recipes',
    label: 'Recettes',
    icon: <CookingPot />,
    href: '/recipes',
  },
  {
    key:'agenda',
    label: 'Agenda',
    icon: <Calendar />,
    href: '/calendar',
  },
  
  // Ajoutez d'autres liens ici pour les autres menus du sidebar
];
