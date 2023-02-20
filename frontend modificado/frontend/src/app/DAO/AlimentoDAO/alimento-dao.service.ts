import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoDTO, PublicacionDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class AlimentoDAOService {

  constructor(private http: HttpClient) { }
  buscarAlimentos(nombre:string): Observable<AlimentoDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<AlimentoDTO[]>(baseUrl+"alimentos?nombre="+nombre);
  }
  getAlimentoPorId(id: any): Observable<AlimentoDTO[]> {//me llega id y devuelvo array
    return this.http.get<AlimentoDTO[]>(baseUrl+"alimentos/"+id);
  }
 

}
