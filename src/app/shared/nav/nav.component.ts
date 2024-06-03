import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;
  today: string = '';

  title = 'Star Wars Catalog';

  constructor() { }

  ngOnInit(): void {
    this.time();

    var data = new Date();
        var day = data.getDate();
        var month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][data.getMonth()];
        var year = data.getFullYear();

        this.today =  day + ' de ' + month + ' de ' + year;
  }

  time() {
    var dataAtual = new Date();
    var dia = dataAtual.getDate() + '-' + ( dataAtual.getMonth() + 1 ) + '-' + dataAtual.getFullYear();
    var hora = dataAtual.getHours() + ':' + dataAtual.getMinutes() + ':' + dataAtual.getSeconds();
    this.today = dia + ' ' + hora;
  }
}
