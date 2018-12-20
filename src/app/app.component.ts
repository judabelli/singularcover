import { Component } from '@angular/core';
import * as insurancesProducts from './InsurProducts.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SingularCover';
  products = insurancesProducts;
  userFilter: any = { name: '', kind:'', brand: '', price: ''};
  sliceStart = 0;
  sliceEnd = 5;

  decreaseNumbers() {
    this.sliceStart = (this.sliceStart) - 5;
    this.sliceEnd = (this.sliceEnd) - 5;
  }
  increaseNumbers() {
    this.sliceStart = (this.sliceStart) + 5;
    this.sliceEnd = (this.sliceEnd) + 5;
  }
}
