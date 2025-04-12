// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Product } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private http = inject(HttpClient);

//   constructor() { }

//   getProducts(){
//     return this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/products`);
//   } 
// }



// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { map } from 'rxjs/operators';
// import { Product } from '../models/product.model';

// @Injectable({
//   providedIn: 'root' 
// })
// export class ProductService {
//   private http = inject(HttpClient);

//   constructor() { }

//   getProducts(){
//     return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').pipe(
//       map(products =>
//         products.map(product => ({
//           ...product,
//           images: product.images.map(() =>
//             'https://picsum.photos/640/640?r=' + Math.random()
//           )
//         }))
//       )
//     );
//   }
// }




import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() { }

  getProducts(){
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products').pipe(
      map(products => 
        products.map(product => ({
          ...product,
          images: product.images.map(image => 
            this.cleanAndParseImageUrl(image)
          )
        }))
      )
    );
  }

  private cleanAndParseImageUrl(image: string): string {
    let cleanedImage = image.replace(/^\["?|"?]$/g, '');
    try {
      cleanedImage = JSON.parse(cleanedImage);
    } catch (error) {
      //
    }
    return cleanedImage;
  }
}