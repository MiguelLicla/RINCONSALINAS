export interface IMaestraArgu {
    idArgu: number;
    idMaestra: number;
    idPadre: number;
    codigo: string;
    nombre: string;
    nombreIng: string;
    nombreEsp: string;
    descripcion: string;
    filtro: string;
    flagActivo: boolean;
    audFechaRegistro: Date;
    audUsuarioRegistro: number;
    audFechaModificacion: Date;
    audUsuarioModificacion: number;
}

export interface IMaestra {
    idMaestra: number;
    idPadre:  number;
    padreNombre: string;
    descripcion:  string;
    nombre: string;
    activo:  boolean;
    orden:  number;
    icono: string;
    grupo:  number;
    flagAbreviado: boolean;
    flagCodigo: boolean;
    flagDescripcion: boolean;
    flagMantenible: boolean;
}