import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';

import {ProductComponent} from '@products/components/product/product.component'
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  ngOnInit(changes:SimpleChanges){
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
        this.getProducts();
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error:()=>{}
    })
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (category) => {
        this.categories.set(category);
      },
      error:()=>{}
    })
  }
}
