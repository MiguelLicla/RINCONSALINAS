export interface MenuItem {
    id?: number;
    label?: any;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
    isCollapsed?: any;
  }

  export interface MenuI{
    IdOpcion: number;
    Nombre: string;
    IdPadre: number;
    Descripcion: string;
    Controller: string;
    Icono: string;
    Orden: number;
    Tipo: number;
    isTitle : boolean;
    }