import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoReceta, Comentario, Publicacion, Receta, ResumenAlimento, ResumenAlimentoReceta, ResumenPublicacion, ResumenReceta, ResumenUsuario, Usuario } from './modelo/app.model';
import { HttpClient } from '@angular/common/http';


const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class ConexionAPIService {

  constructor(private http: HttpClient) { }

  identificacion(usuario:Usuario): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/identificacion",usuario);
  }

  registro(usuario:Usuario): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/registro",usuario);
  }

  anadirFavorita(idUsuario:any,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idUsuario+"/favoritas",idReceta);
  }

  anadirPublicacion(publicacion:Publicacion): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"publicaciones",publicacion);
  }

  guardarComentario(comentario:any,idPublicacion:number): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"publicaciones/"+idPublicacion+"/comentarios",comentario);
  }

  seguirUsuario(idSeguido:any,idSeguidor:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idSeguidor+"/seguidos",idSeguido);
  }

  guardarReceta(receta:Receta): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"recetas",receta);
  }

  guardarAlimento(alimento:ResumenAlimento): Observable<any> {//devuelvo array y obtiene array en la peticion
    const formData: FormData = new FormData();

    formData.append('file', alimento.foto);
  formData.append("nombre",alimento.nombre);
  formData.append("descripcion",alimento.descripcion);
  formData.append("calorias",alimento.calorias.toString());


   
    return this.http.post(baseUrl+"alimentos",formData);
  }

  guardarAlimentoReceta(alimentoReceta:AlimentoReceta,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    console.log("tengo en idReceta"+idReceta)
    return this.http.post(baseUrl+"recetas/"+idReceta+"/alimentosRecetas",alimentoReceta);
  }

  getPublicacionesSeguidos(id:any): Observable<ResumenPublicacion[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenPublicacion[]>(baseUrl+"publicaciones/seguidos/"+id);
  }

  getComentariosPublicacion(id:any): Observable<Comentario[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<Comentario[]>(baseUrl+"publicaciones/"+id+"/comentarios");
  }

  getMisPublicaciones(id:any): Observable<ResumenPublicacion[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenPublicacion[]>(baseUrl+"usuarios/"+id+"/misPublicaciones");
  }

  buscarRecetas(titulo:string): Observable<ResumenReceta[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenReceta[]>(baseUrl+"recetas?titulo="+titulo);
  }

  buscarTodasRecetas(): Observable<ResumenReceta[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenReceta[]>(baseUrl+"recetas");
  }

  buscarTodosAlimentos(): Observable<ResumenAlimento[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenAlimento[]>(baseUrl+"alimentos");
  }

  buscarAlimentos(nombre:string): Observable<ResumenAlimento[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenAlimento[]>(baseUrl+"alimentos?nombre="+nombre);
  }

  buscarUsuarios(nombre:string): Observable<ResumenUsuario[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenUsuario[]>(baseUrl+"usuarios?nombre="+nombre);
  }
  buscarTodosUsuarios(): Observable<Usuario[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<Usuario[]>(baseUrl+"usuarios");
  }

  buscarTodasPublicaciones(): Observable<ResumenPublicacion[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenPublicacion[]>(baseUrl+"publicaciones");
  }

  getFavoritas(id:any): Observable<ResumenReceta[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ResumenReceta[]>(baseUrl+"usuarios/"+id+"/favoritas");
  }

  comprobarFavorita(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+id);
  }
  comprobarSeguimiento(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+id);
  }

  getPublicacionPorId(id: any): Observable<ResumenPublicacion[]> {//me llega id y devuelvo array
    return this.http.get<ResumenPublicacion[]>(baseUrl+"publicaciones/"+id);
  }

  getRecetaPorId(id: any): Observable<ResumenReceta[]> {//me llega id y devuelvo array
    return this.http.get<ResumenReceta[]>(baseUrl+"recetas/"+id);
  }

  getUsuarioPorId(id: any): Observable<Usuario[]> {//me llega id y devuelvo array
    return this.http.get<Usuario[]>(baseUrl+"usuarios/"+id);
  }

  getAlimentoPorId(id: any): Observable<ResumenAlimento[]> {//me llega id y devuelvo array
    return this.http.get<ResumenAlimento[]>(baseUrl+"alimentos/"+id);
  }

  getAlimentosReceta(id: any): Observable<ResumenAlimentoReceta[]> {//me llega id y devuelvo array
    return this.http.get<ResumenAlimentoReceta[]>(baseUrl+"recetas/"+id+"/alimentosRecetas");
  }

  getPublicacionesUsuario(id: any): Observable<ResumenPublicacion[]> {//me llega id y devuelvo array
    return this.http.get<ResumenPublicacion[]>(baseUrl+"usuarios/"+id+"/publicaciones");
  }

  getPublicacionesReceta(id: any): Observable<ResumenPublicacion[]> {//me llega id y devuelvo array
    return this.http.get<ResumenPublicacion[]>(baseUrl+"recetas/"+id+"/publicaciones");
  }

  getPublicacionesAlimento(id: any): Observable<ResumenPublicacion[]> {//me llega id y devuelvo array
    return this.http.get<ResumenPublicacion[]>(baseUrl+"alimentos/"+id+"/publicaciones");
  }


  getNumeroSeguidores(id: any): Observable<any> {//me llega id y devuelvo array
    return this.http.get<any>(baseUrl+"usuarios/"+id+"/numeroSeguidores");
  }
  getNumeroSeguidos(id: any): Observable<any> {//me llega id y devuelvo array
    return this.http.get<any>(baseUrl+"usuarios/"+id+"/numeroSeguidos");
  }

  getUsuariosSeguidos(id: any): Observable<any[]> {//me llega id y devuelvo array
    return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidos");
  }
  getUsuarioSeguidores(id: any): Observable<any[]> {//me llega id y devuelvo array
    return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidores");
  }
  eliminarFavorita(idUsuario: any, idReceta:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+idReceta);
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

  editarUsuario(id: any, usuario:Usuario): Observable<any> {
    return this.http.put(baseUrl+"usuarios/"+id, usuario);
}

actualizarAlimento(id: any, alimento:ResumenAlimento): Observable<any> {
  return this.http.put(baseUrl+"alimentos/"+id, alimento);
}
}
