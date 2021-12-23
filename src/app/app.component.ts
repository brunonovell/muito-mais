import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  listaProdutos = []

  title = 'mm-manutencao';

  //TODO: Terminar regra de negocio do totalizador
  preencherTotalizadores(): void {
    this.listaProdutos.map(item => console.log(item))
  }
}
