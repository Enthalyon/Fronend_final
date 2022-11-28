import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  tableId: string = "";
  sendingAttemp: boolean = false;
  table: Table = {
    numero: "",
    cantidad_inscritos: "",    
  }

  /**
   * 
   * @param tablesService  
   * @param activatedRoute 
   * @param router 
   */
  constructor(private tablesService: TableService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.tableId){
      this.creationMode = false;
      this.tableId = this.activatedRoute.snapshot.params.tableId;
      this.getMesa(this.tableId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getMesa(id: string): void {
    this.tablesService.getOne(id).subscribe(
      data => {
        this.table = data;
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
    if(this.table.numero=="" || this.table.cantidad_inscritos=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      this.tablesService.create(this.table).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'La mesa ha sido creada correctamente.',
            'success'
          );
          this.router.navigate(['pages/mesas/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La mesa no ha podido ser creada. Intente de nuevo.',
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
      let table_: Table = { ...this.table };
      delete table_._id;
      this.tablesService.edit(this.table._id, table_).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'La mesa ha sido actualizada correctamente.',
            'success'
          );
          this.router.navigate(['pages/mesas/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La mesa no ha podido ser actualizada. Intente de nuevo.',
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
