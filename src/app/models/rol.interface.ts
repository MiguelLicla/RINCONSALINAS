
export interface IRol {
    idRol: number;
    nombre: string;
    descripcion: string
    flagActivo: boolean
    opciones:  IOpcion[];   
}


export interface IOpcion {
    idOpcion: number;
    nombre: string;
    idPadre: number;
    descripcion: string;
    controller: string;
    icono: string;
    orden: number;
    tipo: number;
    idOpcionTipo: number;
    flagActivo: boolean;
    idRol: number;
}

