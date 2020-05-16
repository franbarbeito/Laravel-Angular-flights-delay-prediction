import { Component, OnInit } from '@angular/core';
import { AeroSiglasService } from "../servicios/aero-siglas.service";
import { AerolineasService } from '../servicios/aerolineas.service';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { aeroSiglas } from '../modelos/aeroSiglas';
import { aerolineas } from '../modelos/aerolineas';
import { vuelo } from "../modelos/vuelo";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})

export class BuscadorComponent implements OnInit {

  sql = 'http://127.0.0.1:8000';
  siglas: aeroSiglas[];
  arrayVuelo: vuelo[];
  arrayEspecifico: vuelo[];

  // para recoger el input
  inputVuelo: String;
  // para recoger el valor del select
  selectedLevel;
  // para la lista de vuelos por aerolinea
  lista: boolean;
  // para el formulario
  vuelo: boolean;
  // para la vista de cada vuelo
  detalles:boolean;
  // para en caso de error de fecha
  errorFecha:boolean;
  // para en caso de error de input
  errorInput: boolean;
  // para en caso de error por no encontrarlo
  no_encontrado : boolean;

  model: NgbDateStruct;

  constructor(private aeroSiglasService: AeroSiglasService, private aerolinasService: AerolineasService, private httpClient: HttpClient) {
    httpClient.get(this.sql + '/api/siglas/lista').subscribe((data: aeroSiglas[]) => {
      this.siglas = data;
    });
  }

  ngOnInit(): void {
    this.lista = false;
    this.vuelo = true;
    this.detalles = false;
  }

  buscarVuelo() {
    if(this.inputVuelo == null){
      console.log("tiene que ingresar todos los datos");
      this.errorInput = true;
    }
    else{
      try {
        this.errorInput = false;
        var fecha = this.model.year +"-" + this.model.month +"-"+this.model.day;
        console.log(fecha);
        this.httpClient.get(this.sql+'/api/vuelo/'+this.inputVuelo+"/"+fecha).subscribe((data: vuelo[]) =>{
          console.log(data);
          if (Object.keys(data).length == 0){
            // No se ha encotrado el vuelo o no existe
            console.log("NO se ha encontrado nada");
            // abrir ventana de error
            this.vuelo = false;
            this.no_encontrado = true;
          }
          else{
            for (var i = 0; i < Object.keys(data).length;i++){
              this.httpClient.get(this.sql+'/api/aerolineas/'+data[i]['Aerolinea']).subscribe((datum) =>{
                for (var i = 0; i <Object.keys(datum).length; i++){
                  data[i]['Aerolinea']= datum[i]['nombreAerolinea'];
                }
              });
              this.arrayEspecifico = data;
              console.log(this.arrayEspecifico);
            }
            // importante 
            this.detalles = true;//activar el contenido del vuelo
            this.vuelo = false;//esconder el formulario
          }
        });
      } catch (TypeError) {
        console.log("Error!!");
        this.errorFecha = true;
      }
    }

  };
  listaAeropuerto() {
    console.log(this.selectedLevel)
    this.httpClient.get(this.sql + '/api/vuelosXaeropuerto/' + this.selectedLevel).subscribe((data: vuelo[]) => {
      this.arrayVuelo = data;
      console.log(this.arrayVuelo);
      this.lista = true;
    });
  };

}

