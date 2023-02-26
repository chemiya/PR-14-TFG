import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';

/**corregido html y ts------------------ */

@Component({
  selector: 'app-buscar-alimento',
  templateUrl: './buscar-alimento.component.html',
  styleUrls: ['./buscar-alimento.component.css']
})
export class BuscarAlimentoComponent {

}
