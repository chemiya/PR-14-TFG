import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';

const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class RecetaServicioService {

  constructor(private http: HttpClient) { }
  buscarRecetas(titulo:string): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas?titulo="+titulo);
  }
  buscarRecetaPorId(id: any): Observable<RecetaDTO[]> {//me llega id y devuelvo array
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas/"+id);
  }

  buscarMisRecetas(id:any): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"usuarios/"+id+"/recetas");
  }
 

  borrarReceta(id:any): Observable<any> {//elimina por el id
    return this.http.delete(baseUrl+"recetas/"+id);
  }
  buscarTodasRecetas(): Observable<RecetaDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<RecetaDTO[]>(baseUrl+"recetas");
  }
  guardarReceta(receta:RecetaDTO): Observable<any> {//creo un formdata con los campos modificados
    const formData: FormData = new FormData();

    formData.append('file', receta.foto);
  formData.append("titulo",receta.titulo);
  formData.append("resumen",receta.resumen);
  formData.append("dificultad",receta.dificultad);
  formData.append("idCreador",receta.idCreador.toString());
  
  formData.append("tiempo",receta.tiempo.toString());

   
   
    return this.http.post(baseUrl+"recetas",formData);
  }

  actualizarReceta(id: any, receta:RecetaDTO): Observable<any> {//creo formdata con los campos que me llegan
    const formData: FormData = new FormData();
    
    formData.append('file', receta.foto);
    formData.append("titulo",receta.titulo);
    formData.append("resumen",receta.resumen);
    formData.append("dificultad",receta.dificultad);
    formData.append("idCreador",receta.idCreador.toString());
    
    formData.append("tiempo",receta.tiempo.toString());
   
   
  
 

    return this.http.put(baseUrl+"recetas/"+id, formData);
  }




 
 

}
