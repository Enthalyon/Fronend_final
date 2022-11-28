import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Result } from '../../../models/result.model';
import { Table } from '../../../models/table.model';
import { CandidateService } from '../../../services/candidate.service';
import { ResultService } from '../../../services/result.service';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  resultId: string = "";
  sendingAttemp: boolean = false;
  result: Result = {
    votos: null,    
    table: {
      _id: null
    },
    candidate: {
      _id: null
    },
  }
  candidates: Candidate[];
  tables: Table[];

  /**
   * 
   * @param resultsService
   * @param activatedRoute 
   * @param router 
   */
  constructor(private resultsService: ResultService,
              private tablesService: TableService,
              private candidatesService: CandidateService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.getCandidates()
    this.getTables();
    if(this.activatedRoute.snapshot.params.resultId){
      this.creationMode = false;
      this.resultId = this.activatedRoute.snapshot.params.resultId;
      this.getResult(this.resultId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getResult(id: string): void {
    this.resultsService.getOne(id).subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCandidates(): void {
    this.candidatesService.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getTables(): void {
    this.tablesService.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * 
   * @returns 
   */
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.result.votos==null || this.result.candidate==null || this.result.table==null)
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      console.log(this.result);
      this.resultsService.create(this.result).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'La tabla resultado ha sido creada correctamente.',
            'success'
          );
          this.router.navigate(['pages/resultados/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La tabla resultado ha podido ser creada. Intente de nuevo.',
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
      delete this.result._id;
      console.log(this.resultId);
      console.log(this.result);
      this.resultsService.edit(this.resultId, this.result).subscribe(
        data => {
          Swal.fire(
            'Actualizada',
            'La tabla resultado ha sido actualizada correctamente.',
            'success'
          );
          this.router.navigate(['pages/resultados/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La tabla resultado no ha podido ser actualizada. Intente de nuevo.',
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
