import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Politicalparty } from '../../../models/politicalparty.model';
import { PoliticalpartyService } from '../../../services/politicalparty.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  politicalpartyId: string = "";
  politicalparty: Politicalparty = {
    nombre: "",
    lema: "",
  }

  /**
   * 
   * @param politicalpartyService 
   * @param activatedRoute 
   * @param router 
   */
  constructor(private politicalpartyService: PoliticalpartyService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.politicalpartyId){
      this.creationMode = false;
      this.politicalpartyId = this.activatedRoute.snapshot.params.politicalpartyId;
      this.getPoliticalparty(this.politicalpartyId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
   getPoliticalparty(id: string): void {
    this.politicalpartyService.getOne(id).subscribe(
      data => {
        this.politicalparty = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   * @returns 
   */
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.politicalparty.nombre=="" || this.politicalparty.lema=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      this.politicalpartyService.create(this.politicalparty).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El partido politico ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El partido politico no ha podido ser creado. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * 
   */
  edit(): void{
    if(this.validateMandatoryData){
      delete this.politicalparty._id;
      this.politicalpartyService.edit(this.politicalpartyId, this.politicalparty).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El partido politico ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El partido politico no ha podido ser actualizado. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }
}