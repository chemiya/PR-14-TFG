import { Time } from "@angular/common"

export interface Usuario{
    id:number,
    username:string,
    password:string,
    email:string
}

export interface Publicacion{
    id:number,
    descripcion:string,
    titulo:string,
    fechapublicacion:Date,
    foto:string,
    idCreador:number,
    idReceta:number,
    idAlimento:number
   
}

export interface Receta{
    id:number,
    titulo:string,
    resumen:string,
    pasos:string,
    idCreador:number,
    tiempo:number
}

export interface ResumenPublicacion{
    id:number,
    titulo:string,
    username:string,
    receta:string
    idReceta:number,
    idCreador:number
    descripcion:string,
    fechapublicacion:Date,
    alimento:string
}


export interface Comentario{
    idUsuario:number,
    comentario:string,
    username:string
}

export interface ResumenReceta{
    id:number,
    titulo:string,
    resumen:string,
    pasos:string,
    idCreador:number,
    tiempo:number,
    username:string
}

export interface ResumenAlimentoReceta{
    id:number,
    cantidad:number,
    idAlimento:number,
    alimento:string
}

export interface AlimentoReceta{
    id:number,
    cantidad:number,
    idAlimento:number,
    idReceta:number,
    
}



export interface ResumenAlimento{
    id:number,
    descripcion:string,
    nombre:string,
    calorias:number
}


export interface ResumenUsuario{
    id:number,
    username:string,
    seguidores:number
}

