import { Politicalparty } from "./politicalparty.model";

export class Candidate {
    _id?: string; 
    numero_resolucion?: string;
    cedula?: string;
    nombre?: string;
    apellido?: string;
    politicalparty?: Politicalparty;
}
