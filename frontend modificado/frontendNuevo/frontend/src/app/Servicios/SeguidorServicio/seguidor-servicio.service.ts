import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class SeguidorServicioService {

  constructor(private http: HttpClient) { }

  buscarNumeroSeguidores(id: any): Observable<any> {//me llega id y devuelvo array
    return this.http.get<any>(baseUrl+"usuarios/"+id+"/numeroSeguidores");
  }
  buscarNumeroSeguidos(id: any): Observable<any> {//me llega id y devuelvo array
    return this.http.get<any>(baseUrl+"usuarios/"+id+"/numeroSeguidos");
  }
  buscarUsuariosSeguidos(id: any): Observable<any[]> {//me llega id y devuelvo array
    return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidos");
  }
  buscarUsuarioSeguidores(id: any): Observable<any[]> {//me llega id y devuelvo array
    return this.http.get<any[]>(baseUrl+"usuarios/"+id+"/seguidores");
  }
  borrarSeguimiento(idSeguido: any, idUsuario:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+idSeguido);
  }
  comprobarSeguimiento(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/seguidos/"+id);
  }
  guardarSeguimiento(idSeguido:any,idSeguidor:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idSeguidor+"/seguidos",idSeguido);
  }
}
