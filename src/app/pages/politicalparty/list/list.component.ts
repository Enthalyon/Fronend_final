import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Politicalparty } from '../../../models/politicalparty.model';
import { PoliticalpartyService } from '../../../services/politicalparty.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  politicalpartys: Politicalparty[];
  columnNamesPart: string[] = ['Nombre', 'Lema', 'Opciones']

  constructor(private politicalpartyService: PoliticalpartyService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.politicalpartyService.list().subscribe(
      data => {
        this.politicalpartys = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/partidos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/partidos/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Partido Politico',
      text: '¿Está seguro que quiere eliminar el partido politico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.politicalpartyService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El partido politico ha sido eliminado correctamente.',
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