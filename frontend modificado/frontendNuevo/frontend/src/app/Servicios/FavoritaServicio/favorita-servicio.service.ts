import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';

const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class FavoritaServicioService {

  constructor(private http: HttpClient) { }
  guardarFavorita(idUsuario:any,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idUsuario+"/favoritas",idReceta);
  }
  comprobarFavorita(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+id);
  } 
  borrarFavorita(idUsuario: any, idReceta:any): Observable<any> {//eliminas por el id
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+idReceta);
  }
  buscarFavoritas(id:any): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"usuarios/"+id+"/favoritas");
  }
}
