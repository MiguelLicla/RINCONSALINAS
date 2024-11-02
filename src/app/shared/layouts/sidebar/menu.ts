import { MenuI, MenuItem } from './menu.model';

export const MENU: MenuI[] = [
  {
    IdOpcion: 1,
    Nombre: 'Menú',
    IdPadre: 0, // O un valor adecuado según tu estructura
    Descripcion: 'Este es el menú principal',
    Controller: 'Home', // O el nombre del controlador correspondiente
    Icono: 'las la-home', // Icono correspondiente
    Orden: 1, // Orden de visualización
    Tipo: 1, // Tipo del menú, ajustar según necesidad
    isTitle: true
  },
  {
    IdOpcion: 2,
    Nombre: 'Mesas',
    IdPadre: 0, // Cambiar según la jerarquía
    Descripcion: '',
    Controller: '', // Nombre del controlador
    Icono: 'bi bi-table',
    Orden: 2,
    Tipo: 1,
    isTitle: false // Si no es un título
  },
  {
    IdOpcion: 2,
    Nombre: 'Mesa',
    IdPadre: 2, // Cambiar según la jerarquía
    Descripcion: '',
    Controller: 'Mesa-listado', // Nombre del controlador
    Icono: 'bi bi-table',
    Orden: 1,
    Tipo: 1,
    isTitle: false // Si no es un título
  },
  {
    IdOpcion: 2,
    Nombre: 'Mantenimiento de mesas',
    IdPadre: 2, // Cambiar según la jerarquía
    Descripcion: '',
    Controller: 'Mesa-mantenimiento', // Nombre del controlador
    Icono: 'bi bi-table',
    Orden: 2,
    Tipo: 1,
    isTitle: false // Si no es un título
  },
  {
    IdOpcion: 3,
    Nombre: 'Usuarios',
    IdPadre: 0,
    Descripcion: '',
    Controller: 'Usuarios',
    Icono: 'bi bi-people',
    Orden: 5,
    Tipo: 1,
    isTitle: false
  },
  {
    IdOpcion: 4,
    Nombre: 'Administrar',
    IdPadre: 0,
    Descripcion: '',
    Controller: '',
    Icono: 'bi bi-people',
    Orden: 5,
    Tipo: 1,
    isTitle: false
  },
  {
    IdOpcion: 2,
    Nombre: 'Roles',
    IdPadre: 4, // Cambiar según la jerarquía
    Descripcion: '',
    Controller: 'Roles', // Nombre del controlador
    Icono: 'bi bi-table',
    Orden: 2,
    Tipo: 1,
    isTitle: false // Si no es un título
  },
  
];
