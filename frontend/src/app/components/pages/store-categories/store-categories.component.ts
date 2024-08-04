import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryPaginatedReponse } from 'src/app/models/category.model';
import { Product, ProductsReponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store-categories',
  templateUrl: './store-categories.component.html',
  styleUrls: ['./store-categories.component.css'],
})
export class StoreCategoriesComponent {
  categoryId?: string;
  categoryTitle?: string;
  productsResponse?: ProductsReponse;
  pageNumber = 0;
  loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private productService: ProductService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      // console.log(params.get('categoryId'));
      this.categoryId = params.get('categoryId') as string;
      this.categoryTitle = params.get('categoryTitle') as string;
      this.titleService.setTitle(this.categoryTitle + ' :  Ecommerce');
      this.loadCategoryProducts(this.categoryId);
    });
  }

  loadCategoryProducts(
    categoryId: string,
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'addedDate',
    sortDir = 'desc'
  ) {
    this.productService
      .getProductsOfCategory(categoryId, pageNumber, pageSize, sortBy, sortDir)
      .subscribe({
        next: (data) => {
          if (this.pageNumber == 0) {
            this.productsResponse = data;
          } else {
            this.productsResponse = {
              ...data,
              content: [
                ...(this.productsResponse?.content as Product[]),
                ...data.content,
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
      this.loadCategoryProducts(this.categoryId as string, this.pageNumber);
    }
  }
}
