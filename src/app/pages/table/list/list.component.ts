import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * 
   */
   tables: Table[];
   columnNames: string[] = ['Numero de mesa', 'Cantidad de inscritos', 'Opciones']
 
   /**
    * 
    * @param tablesService 
    * @param router 
    */
   constructor(private tablesService: TableService,
               private router: Router) { }
 
   /**
    * 
    */
   ngOnInit(): void {
     this.list();
   }
 
   /**
    * 
    */
   list(): void{
     this.tablesService.list().subscribe(
       data => {
         this.tables = data;
       },
       error => {
         console.log(error);
       }
     );
   }
 
   /**
    * 
    */
   create(): void{
     this.router.navigate(["pages/mesas/crear"]);
   }
 
   /**
    * 
    * @param id 
    */
   edit(id: string): void{
     this.router.navigate(["pages/mesas/actualizar/"+id]);
   }
 
   /**
    * 
    * @param id 
    */
   delete(id: string): void{
     Swal.fire({
       title: 'Eliminar Mesa',
       text: '¿Está seguro que quiere eliminar la mesa?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085D6',
       cancelButtonColor: '#D33',
       confirmButtonText: 'Si, eliminar',
     }).then((result) => {
       if(result.isConfirmed){
         this.tablesService.delete(id).subscribe(
           data => {
             Swal.fire(
               '¡Eliminado!',
               'La mesa ha sido eliminada correctamente.',
               'success'
             ),
             this.ngOnInit();
           },
           error => {
             console.log(error);
           }
         )
       }
     })
   }
 }

  