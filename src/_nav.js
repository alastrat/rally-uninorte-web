export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Nuevo Registro',
      url: '/registro-estudiante',
      icon: 'icon-puzzle'
    },
    {
      name: 'Buscar Registros',
      url: '/buscar-estudiante',
      icon: 'icon-calculator',
    },
    {
      divider: true,
    }
  ],
};
