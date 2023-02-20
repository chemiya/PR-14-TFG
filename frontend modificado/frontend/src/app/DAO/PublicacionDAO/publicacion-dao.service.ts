import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicacionDTO } from 'src/app/modelo/app.model';
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
}
