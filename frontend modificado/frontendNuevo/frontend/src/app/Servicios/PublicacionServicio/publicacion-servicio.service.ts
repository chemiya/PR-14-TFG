import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicacionDTO } from 'src/app/DTO/PublicacionDTO';

const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class PublicacionServicioService {

  constructor(private http: HttpClient) { }
  buscarPublicacionesReceta(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"recetas/"+id+"/publicaciones");
  }
  buscarPublicacionesUsuario(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"usuarios/"+id+"/publicaciones");
  }
  buscarPublicacionesAlimento(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"alimentos/"+id+"/publicaciones");
  }
  
  buscarPublicacionesSeguidos(id:any): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones/seguidos/"+id);
  }
  buscarPublicacionPorId(id: any): Observable<PublicacionDTO[]> {//me llega id y devuelvo array
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones/"+id);
  }

  eliminarPublicacion(id:any): Observable<any> {//eliminas por el id
    return this.http.delete(baseUrl+"publicaciones/"+id);
  }

 

  buscarTodasPublicaciones(): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"publicaciones");
  }
  borrarPublicacion(id:any): Observable<any> {//elimino por id
    return this.http.delete(baseUrl+"publicaciones/"+id);
  }
  guardarPublicacion(publicacion:PublicacionDTO): Observable<any> {//creo formdata con los datos que me llegan
    const formData: FormData = new FormData();

    formData.append('file', publicacion.foto);
  formData.append("titulo",publicacion.titulo);
  formData.append("descripcion",publicacion.descripcion);
  formData.append("idCreador",publicacion.idCreador.toString());
  formData.append("idReceta",publicacion.idReceta.toString());
  formData.append("idAlimento",publicacion.idAlimento.toString());
  formData.append("fechapublicacion",publicacion.fechapublicacion.toString());

   console.log("id:"+publicacion.idReceta.toString())
   
    return this.http.post(baseUrl+"publicaciones",formData);
  } 
  actualizarPublicacion(id: any, publicacion:PublicacionDTO): Observable<any> {//creo formdata con los campos que me llegan
    const formData: FormData = new FormData();
    
  
    formData.append('file', publicacion.foto);
  formData.append("titulo",publicacion.titulo);
  formData.append("descripcion",publicacion.descripcion);
  formData.append("idCreador",publicacion.idCreador.toString());
  formData.append("idReceta",publicacion.idReceta.toString());
  formData.append("idAlimento",publicacion.idAlimento.toString());
  formData.append("fechapublicacion",publicacion.fechapublicacion.toString());
   
   
  
 

    return this.http.put(baseUrl+"publicaciones/"+id, formData);
  }

  
  buscarMisPublicaciones(id:any): Observable<PublicacionDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<PublicacionDTO[]>(baseUrl+"usuarios/"+id+"/publicaciones");
  }
}
