import { Component } from '@angular/core';
import * as insurancesProducts from './InsurProducts.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  products = insurancesProducts;
  userFilter: any = { name: '' };

}
