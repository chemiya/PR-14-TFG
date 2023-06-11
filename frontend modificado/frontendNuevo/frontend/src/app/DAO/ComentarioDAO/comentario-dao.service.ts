import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class ComentarioDAOService {

  constructor(private http: HttpClient) { }

  buscarComentariosPublicacion(id:any): Observable<ComentarioDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<ComentarioDTO[]>(baseUrl+"publicaciones/"+id+"/comentarios");
  }
  guardarComentario(comentario:any,idPublicacion:number): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"publicaciones/"+idPublicacion+"/comentarios",comentario);
  }
}
