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
    id_empleado?: string;
    nombre_empleado?:string;
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

export interface store {
    id_almacen?:number;
    id_sucursal?: number;
    nombre_sucursal?: string;
    id_codigo_articulo?: string;
    nombre_articulo?:string;
    cantidad_total: number;
    cantidad_disponible: number;
    tipo: string;                        
}

export interface articlebytypeproblem{
    id_articulo_problema?: number;
    id_codigo_articulo: string;
    nombre_articulo?: string;
    id_tipo_problema: number;
    tipo_problema?: string;
}

export interface problem{
    id_tipo_problema: number;
    tipo_problema: string;
    descripcion_problema: string;
    id_usuario: number;
    nombre_empleado: number;
    id_sucursal: number;
    nombre_sucursal: string;
    id_usuario_designado: number;
    nombre_empleado_designado: string;
    estatus: string;
    fecha_solicitud: string;
    fecha_aceptado: string;
    fecha_revision: string;
    fecha_enproceso: string;
    fecha_terminado: string;
    fecha_rechazado: string;
    id_problema: number;
}

export interface add_problem{
    id_tipo_problema: number;
    descripcion_problema: string;
    id_usuario?: number;
    estatus: string;
}

export interface assignament_problem{    
    id_usuario_designado:number;
    estatus: string;    
}


export interface estatus_problem {
    id_problema: number;
    estatus: string;    
    materials?: materials [];
}


export interface materials {
    codigo: string;
    cantidad: number;
}


export interface requeriment {
    id_requisito_problema?: number;
    id_problema: number;
    id_codigo_articulo?: string;
    nombre_articulo?: string;
    descripcion_requisito?: string;
    cantidad: number;
    unidad: string;
    precio: number;
}

export interface table_show {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
}


