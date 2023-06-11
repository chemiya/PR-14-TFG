import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasoDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class PasoDAOService {

  constructor(private http: HttpClient) { }
  buscarPasosReceta(id: any): Observable<PasoDTO[]> {//me llega id y devuelvo array
    return this.http.get<PasoDTO[]>(baseUrl+"recetas/"+id+"/pasos");
  }
  guardarPaso(paso:PasoDTO,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
   
    return this.http.post(baseUrl+"recetas/"+idReceta+"/pasos",paso);
  }
}
