import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoDTO, PublicacionDTO } from 'src/app/modelo/app.model';
const baseUrl = 'https://foodbook-production.up.railway.app/api/';
@Injectable({
  providedIn: 'root'
})
export class AlimentoDAOService {

  constructor(private http: HttpClient) { }
  buscarAlimentosPorTitulo(nombre:string): Observable<AlimentoDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<AlimentoDTO[]>(baseUrl+"alimentos?nombre="+nombre);
  }
  buscarAlimentoPorId(id: any): Observable<AlimentoDTO[]> {//me llega id y devuelvo array
    return this.http.get<AlimentoDTO[]>(baseUrl+"alimentos/"+id);
  }

  borrarAlimento(id:any): Observable<any> {//eliminas por el id
    return this.http.delete(baseUrl+"alimentos/"+id);
  }

  buscarTodosAlimentos(): Observable<AlimentoDTO[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<AlimentoDTO[]>(baseUrl+"alimentos");
  }
  actualizarAlimento(id: any, alimento:AlimentoDTO): Observable<any> {//creo formdata con los campos que me llegan
    const formData: FormData = new FormData();

    formData.append('file', alimento.foto);
  formData.append("nombre",alimento.nombre);
  formData.append("descripcion",alimento.descripcion);
  formData.append("calorias",alimento.calorias.toString());
  formData.append("grasas",alimento.grasas.toString());
  formData.append("carbohidratos",alimento.carbohidratos.toString());
  formData.append("proteinas",alimento.proteinas.toString());
  formData.append("cantidad",alimento.cantidad.toString());
  formData.append("medida",alimento.medida);
  formData.append("enlace",alimento.enlace);

    return this.http.put(baseUrl+"alimentos/"+id, formData);
  }

  guardarAlimento(alimento:AlimentoDTO): Observable<any> {//devuelvo array y obtiene array en la peticion
    const formData: FormData = new FormData();

    formData.append('file', alimento.foto);
  formData.append("nombre",alimento.nombre);
  formData.append("descripcion",alimento.descripcion);
  formData.append("calorias",alimento.calorias.toString());
  formData.append("grasas",alimento.grasas.toString());
  formData.append("carbohidratos",alimento.carbohidratos.toString());
  formData.append("proteinas",alimento.proteinas.toString());
  formData.append("cantidad",alimento.cantidad.toString());
  formData.append("medida",alimento.medida);
  formData.append("enlace",alimento.enlace);




   
    return this.http.post(baseUrl+"alimentos",formData);
  }
 

}
