import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-totalizador',
  templateUrl: './totalizador.component.html',
  styleUrls: ['./totalizador.component.scss']
})
export class TotalizadorComponent implements OnInit {

  QTD_DE_CADASTROS: Number = 0;
  CUSTO: Number = 0;
  VENDA: Number = 0;
  CUSTO_VENDA: Number = 0;
  TOTAL_EM_ESTOQUE_REAL:Number = 0;

  constructor(private appComponet:AppComponent) {
  }

  ngOnInit(): void {
  }

  //TODO: Terminar metato para preencher o totalizador
  preencherTotalizadores(){

  }
}
