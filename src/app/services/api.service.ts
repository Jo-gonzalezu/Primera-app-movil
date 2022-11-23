import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  rutaBase: string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php'

constructor(private http: HttpClient) { }

registrarAsistencia(CORREO, ID_CLASE) {
  let that = this;

  return new Promise(resolve => {
    resolve(that.http.post(that.rutaBase, {
      nombreFuncion: "AsistenciaAlmacenar",
      parametros: [CORREO, ID_CLASE]
    }).toPromise())
  })
}

PersonaListar() {
  let that = this;

  return new Promise(resolve => {
    resolve(that.http.get(that.rutaBase 
      + '?nombreFuncion=PersonaListar').toPromise())
  })
}
}
