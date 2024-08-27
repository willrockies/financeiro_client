import { MenuService } from 'src/app/services/menu.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent  {
  constructor(public menuService: MenuService) { }

  ngOninit(){
    this.menuService.menuSelecionado = 1;
  }
}
