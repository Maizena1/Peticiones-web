//sucursales
export interface branch {
    id_sucursal?: number;
    nombre_sucursal: String;
    domicilio: String;
    correo: String;
    telefono: String;
    estatus:String;
}

//empleados
export interface employee{
    id_empleado: number;
    nombre_empleado: String;
    id_sucursal: number;
    correo: String;
    telefono: String;
    estatus: String;
}

export interface employees{
    employees: employee[];
}

//roles
export interface role{
    id_rol?: number;
    nombre_rol: String;
    descripcion_rol: String;
    estatus: String;
}

export interface roles{
    roles: role[];
}

//tipo problema
export interface type_of_problem{
    id_tipo_problema?: number;
    tipo_problema:String;
    descripcion_tipo_problema: String;
    estatus: String;
}

export interface type_of_problems{
    type_problem: type_of_problem[];
}

//usuario
export interface user{
    id_usuario?: number;
    id_empleado: number;
    id_rol: number;
    usuario: String;
    password: String;
    estatus: String;
}

export interface users{
    users: user[];
}

//usario por tipo problema
export interface user_problem{
    id_usuario_problema?: number;    
    id_tipo_problema: number;
    tipo_problema?: String;
    id_usuario: number; 
    usuario?: String;
    estatus: String;
}

export interface users_problems{
    users_problems: user_problem[];
}

//respuesta 
export interface response{
    Mensaje: String;
    Estatus: String;
}
  
export interface Item {
    _id: String;
    option: String;
}

export interface ItemSelect {
    option: String;
}


