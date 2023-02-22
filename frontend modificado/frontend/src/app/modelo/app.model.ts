import { Time } from "@angular/common"

export interface UsuarioDTO{
    id:number,
    username:string,
    password:string,
    email:string,
    rol:string,
    fotoRuta:string,
    descripcion:string,
    foto:File,
    seguidores:number,
    seguidos:number
}

export interface PublicacionDTO{
    id:number,
    descripcion:string,
    titulo:string,
    fechapublicacion:Date,
    fotoRuta:string,
    idCreador:number,
    idReceta:number,
    idAlimento:number,
    usernameUsuario:string,
    tituloReceta:string,
    nombreAlimento:string,
    foto:File
   
}

export interface RecetaDTO{
    id:number,
    titulo:string,
    resumen:string,
    idCreador:number,
    tiempo:number,
    foto:File,
    dificultad:string,
    usernameUsuario:string,
    fotoRuta:string
}




export interface ComentarioDTO{
    id:number,
    idPublicacion:number,
    idUsuario:number,
    comentario:string,
    usernameUsuario:string,
    tituloPublicacion:string,
    fotoRuta:string
}



export interface AlimentoRecetaDTO{
    id:number,
    cantidad:number,
    idAlimento:number,
    nombreAlimento:string,
    idReceta:number,
    tituloReceta:string,
    medida:string,
    fotoRuta:string
}





export interface AlimentoDTO{
    id:number,
    descripcion:string,
    nombre:string,
    calorias:number,
    foto:File,
    fotoRuta:string,
    enlace:string,
    grasas:number,
    carbohidratos:number,
    proteinas:number,
    cantidad:number,
    medida:string

}



export interface PasoDTO{
    idReceta:number,
    orden:number,
    paso:string
}



