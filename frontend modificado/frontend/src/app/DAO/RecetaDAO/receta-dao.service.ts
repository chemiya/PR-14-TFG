import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoRecetaDTO, RecetaDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class RecetaDAOService {

  constructor(private http: HttpClient) { }
  buscarRecetas(titulo:string): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas?titulo="+titulo);
  }
  getRecetaPorId(id: any): Observable<RecetaDTO[]> {//me llega id y devuelvo array
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas/"+id);
  }
  getAlimentosReceta(id: any): Observable<AlimentoRecetaDTO[]> {//me llega id y devuelvo array
    return this.http.get<AlimentoRecetaDTO[]>(baseUrl+"recetas/"+id+"/alimentosRecetas");
  }
  anadirFavorita(idUsuario:any,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idUsuario+"/favoritas",idReceta);
  }
  comprobarFavorita(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+id);
  } 
  eliminarFavorita(idUsuario: any, idReceta:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+idReceta);
  }
}
