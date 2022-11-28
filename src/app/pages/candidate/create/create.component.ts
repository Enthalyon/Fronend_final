import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Politicalparty } from '../../../models/politicalparty.model';
import { CandidateService } from '../../../services/candidate.service';
import { PoliticalpartyService } from '../../../services/politicalparty.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  candidateId: string = "";
  //politicalparty: Politicalparty[];
 
  candidate: Candidate = {
    numero_resolucion: "",
    cedula: "",
    nombre: "",
    apellido:"",
    //politicalparty: {
    //  _id: null,
    //}
  }

  /**
   * 
   * @param CandidateService 
   * @param activatedRoute 
   * @param router 
   */
  constructor(private candidateService: CandidateService,
              private politicalpartyService: PoliticalpartyService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
   ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.candidateId){
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getCandidates(this.candidateId);
    }
    else
      this.creationMode = true;
  }

  getCandidates(id: string): void {
    this.candidateService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getUser(id: string): void{
    this.candidateService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.candidate.cedula=="" || this.candidate.nombre==null)
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.candidateService.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El candidato se ha creado correctamente.',
            icon: 'success',
          });
          this.router.navigate(["pages/candidatos/listar"]);    
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El candidato no ha podido ser creado. Intente de nuevo mas tarde.',
            icon: 'error',
            timer: 5000
          })
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }

  edit(): void{
    if(this.validateMandatoryData){
      let candidate_: Candidate = { ...this.candidate };
      delete candidate_._id;
      this.candidateService.edit(this.candidate._id, candidate_).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El candidato ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/candidatos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El candidato no ha podido ser actualizado. Intente de nuevo.',
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