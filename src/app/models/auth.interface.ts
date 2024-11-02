export interface IAuth {
    idUsuario: number;
    userName: string;
    nombre: string;
    idRol: number;
    rol: string;
    code:string;
    success : boolean;
    message:string;
    opciones: IAuthOpcion[]; 
}

export interface IAuthOpcion {
    idOpcion: number;
    nombre: string;
    idPadre: number;
    descripcion: string;
    controller: string;
    icono: string;
    orden: number;
    tipo: number;
}

