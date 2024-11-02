export interface ICargo {
    IdCargo: number;
    Descripcion_esp: string;
    Descripcion_eng: string;
    FlagActivo?: boolean;
    AudFechaRegistro?: Date;
    AudUsuarioRegistro?: number;
    AudFechaModificacion?: Date;
    AudUsuarioModificacion?: number;
}