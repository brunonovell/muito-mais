import {Component, OnInit} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {ApiMmService} from 'src/app/services/api-mm.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  VALOR_CAMPO_PESQUISA: String = '';
  VALOR_CAMPO_STOCKOPERATOR: String = '';
  VALOR_CAMPO_OPERATOR: Number = 0;
  VALOR_CAMPO_FISCALSITUATION: String = '';
  VALOR_CAMPO_COMPANY: Number = 0;

  constructor(private serviceMuitoMais: ApiMmService, private appComponent: AppComponent) {
  }

  ngOnInit(): void {

  }

  pesquisar(): void {
    if (this.VALOR_CAMPO_PESQUISA.length !== 0 && this.VALOR_CAMPO_COMPANY !== 0) {

      this.serviceMuitoMais
        .pesquisar(
          this.VALOR_CAMPO_PESQUISA.toUpperCase(),
          this.VALOR_CAMPO_STOCKOPERATOR,
          this.VALOR_CAMPO_OPERATOR,
          this.VALOR_CAMPO_FISCALSITUATION,
          this.VALOR_CAMPO_COMPANY
        ).subscribe(dados => {
        this.appComponent.listaProdutos = dados.list;
        this.appComponent.preencherTotalizadores();
      });



    } else {
      alert("Compos Obrigatórios!\n - pesquisa\n - empresa");
    }
  }
}
