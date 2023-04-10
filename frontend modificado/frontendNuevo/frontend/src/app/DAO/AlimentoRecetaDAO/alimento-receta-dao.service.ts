import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoRecetaDTO } from 'src/app/modelo/app.model';
const baseUrl = 'https://foodbook-production.up.railway.app/api/';
@Injectable({
  providedIn: 'root'
})
export class AlimentoRecetaDAOService {

  constructor(private http: HttpClient) { }
  buscarAlimentosReceta(id: any): Observable<AlimentoRecetaDTO[]> {//me llega id y devuelvo array
    return this.http.get<AlimentoRecetaDTO[]>(baseUrl+"recetas/"+id+"/alimentosRecetas");
  }
  
  guardarAlimentoReceta(alimentoReceta:AlimentoRecetaDTO,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    console.log("tengo en idReceta"+idReceta)
    return this.http.post(baseUrl+"recetas/"+idReceta+"/alimentosRecetas",alimentoReceta);
  }
}
