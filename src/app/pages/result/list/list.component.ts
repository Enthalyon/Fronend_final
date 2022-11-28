import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Result } from '../../../models/result.model';
import { ResultService } from '../../../services/result.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Cantidad de votos', 'Numero mesa', 'Nombre candidato', 'Opciones']
  results: Result[];

  constructor(private resultsService: ResultService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.resultsService.list().subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/resultados/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/resultados/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar el resultado',
      text: '¿Está seguro que quiere eliminar el resultado?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.resultsService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El resultado ha sido eliminado correctamente.',
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
