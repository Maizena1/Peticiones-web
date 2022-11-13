//sucursales
export interface branch {
    id_sucursal?: number;
    nombre_sucursal: string;
    domicilio: string;
    correo: string;
    telefono: string;
    estatus:string;
}

//empleados
export interface employee{
    id_empleado?: number;
    nombre_empleado: string;
    id_sucursal: number;
    correo: string;
    telefono: string;
    estatus: string;
}


//roles
export interface role{
    id_rol?: number;
    nombre_rol: string;
    descripcion_rol: string;
    estatus: string;
}



//tipo problema
export interface type_of_problem{
    id_tipo_problema?: number;
    tipo_problema:string;
    descripcion_tipo_problema: string;
    estatus: string;
}

//usuario
export interface user{
    id_usuario?: number;
    id_empleado: number;
    id_rol: number;
    usuario: string;
    password: string;
    estatus: string;
    login?: number;
}


//usario por tipo problema
export interface user_problem{
    id_usuario_problema?: number;    
    id_tipo_problema: number;
    tipo_problema?: string;
    id_usuario: number; 
    usuario?: string;
    estatus: string;
}


//respuesta 
export interface response{
    Mensaje: string;
    Estatus: string;
    usuario? : user [];
}
  
export interface Item {
    _id: string;
    option: string;
}

export interface ItemSelect {
    option: string;
}

//interface de login --------------
export interface login {
    usuario: string;
    password: string;    
}

export interface article{
    id_codigo_articulo?: string;
    nombre_articulo: string;  
    descripcion: string;
}
