import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  validador: boolean = false;

  constructor(private router: Router, private sqlite: SQLite) {
    this.sqlite.create({
      name: 'datos.db'
    }).then((db: SQLiteObject) => {
      console.log('BASE DE DATOS OK'); 
      //SE CREA LA TABLA
      db.executeSql("CREATE TABLE IF NOT EXISTS PERSONA(CORREO VARCHAR(30) PRIMARY KEY,"
      + "NOMBRE VARCHAR(20), APELLIDO VARCHAR(20)," + "CONTRASEÑA VARCHAR(30)", []).then(() =>{
        console.log('Tabla de usuario creada correctamente');
      })
    })
  }

  almacenarPersona(correo, nombre, apellido, contraseña) {
    this.sqlite.create({
      name: "datos.db"
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO PERSONA VALUES(?,?,?,?)", [correo, nombre, apellido, contraseña]).then(() =>{
        console.log('Usuario almacenado correctamente');
      })
    })
  }
  
  listarPersonas() {
    return this.sqlite.create({
      name: "datos.db"
    }).then((db: SQLiteObject) => {
      return db.executeSql("SELECT CORREO, NOMBRE, APELLIDO, CONTRASEÑA FROM PERSONA", []).then((data) =>{
        return data;
      })
    })
  }

  buscarPersonas(nombre) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT CORREO, NOMBRE, APELLIDO, CONTRASEÑA ' 
        + ' FROM PERSONA WHERE NOMBRE LIKE ?', [nombre + '%']).then((data) => {
          return data;
        })
    });
  }

  eliminarPersona(rut) {
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM PERSONA WHERE CORREO = ?', 
      [rut]).then(() => {
          console.log('FSR: Usuario eliminado correctamente');
        })
    });
  }

  canActivate(){
    if(this.validador) {
      return true;
    } else {
      this.router.navigate(['pagina-uno']);
      return false;
    }
  }

  validarCredenciales(user, pass, new_pass) {
    if(user == 'estudiante' && pass == new_pass ) {
      this.validador = true;
      this.router.navigate(['pagina-dos']);
      return true;
    } else {
      return false;
    }
  }
}