import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoRecetaDTO, PasoDTO, RecetaDTO } from 'src/app/modelo/app.model';
const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class RecetaDAOService {

  constructor(private http: HttpClient) { }
  buscarRecetas(titulo:string): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas?titulo="+titulo);
  }
  buscarRecetaPorId(id: any): Observable<RecetaDTO[]> {//me llega id y devuelvo array
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas/"+id);
  }

  buscarPasosReceta(id: any): Observable<PasoDTO[]> {//me llega id y devuelvo array
    return this.http.get<PasoDTO[]>(baseUrl+"recetas/"+id+"/pasos");
  }
  buscarAlimentosReceta(id: any): Observable<AlimentoRecetaDTO[]> {//me llega id y devuelvo array
    return this.http.get<AlimentoRecetaDTO[]>(baseUrl+"recetas/"+id+"/alimentosRecetas");
  }
  guardarFavorita(idUsuario:any,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    return this.http.post(baseUrl+"usuarios/"+idUsuario+"/favoritas",idReceta);
  }
  comprobarFavorita(id:any,idUsuario:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+id);
  } 
  borrarFavorita(idUsuario: any, idReceta:any): Observable<any> {
    return this.http.delete(baseUrl+"usuarios/"+idUsuario+"/favoritas/"+idReceta);
  }
  borrarReceta(id:any): Observable<any> {
    return this.http.delete(baseUrl+"recetas/"+id);
  }
  buscarTodasRecetas(): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas");
  }
  guardarReceta(receta:RecetaDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    const formData: FormData = new FormData();

    formData.append('file', receta.foto);
  formData.append("titulo",receta.titulo);
  formData.append("resumen",receta.resumen);
  formData.append("dificultad",receta.dificultad);
  formData.append("idCreador",receta.idCreador.toString());
  
  formData.append("tiempo",receta.tiempo.toString());

   
   
    return this.http.post(baseUrl+"recetas",formData);
  }



  guardarAlimentoReceta(alimentoReceta:AlimentoRecetaDTO,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
    console.log("tengo en idReceta"+idReceta)
    return this.http.post(baseUrl+"recetas/"+idReceta+"/alimentosRecetas",alimentoReceta);
  }

  guardarPaso(paso:PasoDTO,idReceta:any): Observable<any> {//devuelvo array y obtiene array en la peticion
   
    return this.http.post(baseUrl+"recetas/"+idReceta+"/pasos",paso);
  }
  buscarFavoritas(id:any): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"usuarios/"+id+"/favoritas");
  }

}
