import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoDTO, AlimentoRecetaDTO, ComentarioDTO, PublicacionDTO, RecetaDTO, UsuarioDTO } from './modelo/app.model';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class ConexionAPIService {

  constructor(private http: HttpClient) { }

 








  

  anadirPublicacion(publicacion:PublicacionDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"publicaciones",publicacion);
  }

  guardarComentario(comentario:any,idPublicacion:number): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"publicaciones/"+idPublicacion+"/comentarios",comentario);
  }

  seguirUsuario(idSeguido:any,idSeguidor:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idSeguidor+"/seguidos",idSeguido);
  }

  guardarReceta(receta:RecetaDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"recetas",receta);
  }

  guardarAlimento(alimento:AlimentoDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    const formData: FormData = new FormData();

    formData.append('file', alimento.foto);
  formData.append("nombre",alimento.nombre);
  formData.append("descripcion",alimento.descripcion);
  formData.append("calorias",alimento.calorias.toString());


   
    return this.http.post(baseUrl+"alimentos",formData);
  }

  guardarAlimentoReceta(alimentoReceta:AlimentoRecetaDTO,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    console.log("tengo en idReceta"+idReceta)
    return this.http.post(baseUrl+"recetas/"+idReceta+"/alimentosRecetas",alimentoReceta);
  }

  getPublicacionesSeguidos(id:any): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones/seguidos/"+id);
  }

  getComentariosPublicacion(id:any): Observable<ComentarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ComentarioDTO[]>(baseUrl+"publicaciones/"+id+"/comentarios");
  }

  getMisPublicaciones(id:any): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"usuarios/"+id+"/misPublicaciones");
  }

  

  buscarTodasRecetas(): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas");
  }

  buscarTodosAlimentos(): Observable<AlimentoDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<AlimentoDTO[]>(baseUrl+"alimentos");
  }

 

 
  buscarTodosUsuarios(): Observable<UsuarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<UsuarioDTO[]>(baseUrl+"usuarios");
  }

  buscarTodasPublicaciones(): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones");
  }

  getFavoritas(id:any): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"usuarios/"+id+"/favoritas");
  }

  
  comprobarSeguimiento(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+id);
  }

  getPublicacionPorId(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones/"+id);
  }

 

 

  

 

 

  




 

  getUsuariosSeguidos(id: any): Observable<any[]> {//me llega id y devuelvo array
    return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidos");
  }
  getUsuarioSeguidores(id: any): Observable<any[]> {//me llega id y devuelvo array
    return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidores");
  }
 

  eliminarSeguimiento(idSeguido: any, idUsuario:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+idSeguido);
  }

  borrarReceta(id:any): Observable<any> {
    return this.http.delete(baseUrl+"recetas/"+id);
  }

  borrarAlimento(id:any): Observable<any> {
    return this.http.delete(baseUrl+"alimentos/"+id);
  }

  borrarUsuario(id:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+id);
  }

  borrarPublicacion(id:any): Observable<any> {
    return this.http.delete(baseUrl+"publicaciones/"+id);
  }

  editarUsuario(id: any, usuario:UsuarioDTO): Observable<any> {
    return this.http.put(baseUrl+"usuarios/"+id, usuario);
}

actualizarAlimento(id: any, alimento:AlimentoDTO): Observable<any> {
  return this.http.put(baseUrl+"alimentos/"+id, alimento);
}
}
