export interface branch {
    id_sucursal: number;
    nombre_sucursal: String;
    domicilio: String;
    correo: String;
    telefono: String;
    estatus:String;
}

export interface branches{
 sucursales: branch[];
}

export interface response{
    Mensaje: String;
}
  