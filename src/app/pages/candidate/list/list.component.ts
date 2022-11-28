import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

 
  columnNamesCand: string[] = ['Numero Resolucion', 'Cedula', 'Nombre', 'Apellido', 'Opciones']
  candidates: Candidate[];

  constructor(private candidatesService: CandidateService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.candidatesService.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/candidatos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/candidatos/actualizar/"+id]);
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar candidato',
      text: '¿Está seguro que desea eliminar el candidato?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.candidatesService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El candidato ha sido eliminado correctamente.',
              icon: 'success'
            });
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