import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { TimeAgoPipe} from '@shared/pipes/time-ago.pipe'
import { RouterLinkWithHref} from '@angular/router'
@Component({
  selector: 'app-product',
  imports: [CommonModule,TimeAgoPipe,RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter();

  addToCartHandler(){
    // click from the child
    this.addToCart.emit(this.product)
  }
}
