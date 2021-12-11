import { Component, OnInit } from '@angular/core';
import { ApiMmService } from 'src/app/services/api-mm.service';

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


  constructor(private serviceMuitoMais: ApiMmService) { }

  ngOnInit(): void {

  }

  pesquisar(): void {
    if (this.VALOR_CAMPO_PESQUISA.length > 0 || this.VALOR_CAMPO_COMPANY != 0) {

      const retornoDoServico = this.serviceMuitoMais
        .buscaProdutos(
          this.VALOR_CAMPO_PESQUISA.toUpperCase(),
          this.VALOR_CAMPO_STOCKOPERATOR,
          this.VALOR_CAMPO_OPERATOR,
          this.VALOR_CAMPO_FISCALSITUATION,
          this.VALOR_CAMPO_COMPANY
        );

      console.log(retornoDoServico);

    } else {
      alert("Compos Obrigatórios!\n - pesquisa\n - empresa");
    }
  }
}
