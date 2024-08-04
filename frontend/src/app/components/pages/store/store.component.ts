import { Component, OnInit } from '@angular/core';
import { Product, ProductsReponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  productsResponse?: ProductsReponse;
  loading = false;
  pageNumber = 0;

  constructor(public productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts(this.pageNumber);
  }

  loadProducts(
    pageNumber = 0,
    pageSize = 9,
    sortBy = 'addedDate',
    sortDir = 'desc'
  ) {
    this.productService
      .getLiveProducts(pageNumber, pageSize, sortBy, sortDir)
      .subscribe({
        next: (productsResponse) => {
          if (this.pageNumber == 0) {
            this.productsResponse = productsResponse;
          } else {
            this.productsResponse = {
              ...productsResponse,
              content: [
                ...(this.productsResponse?.content as Product[]),
                ...productsResponse.content,
              ],
            };
          }
          console.log(this.productsResponse);
        },
      });
  }

  userScrolled(event: any) {
    console.log(event);

    if (this.loading || this.productsResponse?.lastPage) {
      return;
    } else {
      console.log('loading data from server');

      this.pageNumber += 1;
      this.loadProducts(this.pageNumber);
    }
  }
}
