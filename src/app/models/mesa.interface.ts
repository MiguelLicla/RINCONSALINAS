export interface IMesa {
    mesaId: number;
    numeroMesa: string;
    descripcion?: string;
    flagActivo?: boolean;
    usuarioRegistra?: number;
    fechaRegistro?: Date;
    usuarioModifica?: number;
    fechaModifica?: Date;
}
