import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioDTO, PublicacionDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class PublicacionDAOService {

  constructor(private http: HttpClient) { }
  getPublicacionesReceta(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"recetas/"+id+"/publicaciones");
  }
  getPublicacionesUsuario(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"usuarios/"+id+"/publicaciones");
  }
  getPublicacionesAlimento(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"alimentos/"+id+"/publicaciones");
  }
  
  getPublicacionesSeguidos(id:any): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones/seguidos/"+id);
  }
  getPublicacionPorId(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones/"+id);
  }

  getComentariosPublicacion(id:any): Observable<ComentarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ComentarioDTO[]>(baseUrl+"publicaciones/"+id+"/comentarios");
  }

  buscarTodasPublicaciones(): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones");
  }
  borrarPublicacion(id:any): Observable<any> {
    return this.http.delete(baseUrl+"publicaciones/"+id);
  }
  anadirPublicacion(publicacion:PublicacionDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    const formData: FormData = new FormData();

    formData.append('file', publicacion.foto);
  formData.append("titulo",publicacion.titulo);
  formData.append("descripcion",publicacion.descripcion);
  formData.append("idCreador",publicacion.idCreador.toString());
  formData.append("idReceta",publicacion.idReceta.toString());
  formData.append("idAlimento",publicacion.idAlimento.toString());
  formData.append("fechapublicacion",publicacion.fechapublicacion.toString());

   console.log("id:"+publicacion.idReceta.toString())
   
    return this.http.post(baseUrl+"publicaciones",formData);
  } 
  guardarComentario(comentario:any,idPublicacion:number): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"publicaciones/"+idPublicacion+"/comentarios",comentario);
  }
  
  getMisPublicaciones(id:any): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"usuarios/"+id+"/publicaciones");
  }
}
