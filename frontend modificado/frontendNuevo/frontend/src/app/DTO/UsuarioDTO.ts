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