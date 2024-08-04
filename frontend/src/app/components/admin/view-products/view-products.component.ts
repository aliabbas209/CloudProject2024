import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Product, ProductsReponse } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { setCategoryData } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  productsResponse?: ProductsReponse;
  oldProductsResponse?: ProductsReponse;
  product?: Product;
  update = false;
  categories: Category[] = [];
  searchQuery = '';
  searchMode = false;
  constructor(
    public productService: ProductService,
    private toatrService: ToastrService,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private catStroe: Store<{ cat: Category[] }>,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadProducts(0);
  }

  loadProducts(pageNumber = 0) {
    this.productService
      .getAllProducts(pageNumber, 10, 'addedDate', 'desc')
      .subscribe({
        next: (productResponse) => {
          this.productsResponse = productResponse;
          console.log(this.productsResponse);
        },
      });
  }

  pageChange(page: number) {
    console.log(page);
    if (this.searchMode) {
      this.productSearchService(page - 1);
    } else {
      this.loadProducts(page - 1);
    }
  }

  open(content: any, product: Product) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      })
      .result.then()
      .catch()
      .finally(() => {
        this.update = false;
      });
    this.product = product;
  }

  yesDeleteProduct(event: any, product: Product) {
    if (event) {
      //delete the product
      this.productService.deleteProduct(product.productId).subscribe({
        next: (resposne: any) => {
          // this.toatrService.success('Product deleted !!');
          this.toatrService.success(resposne.message);
          console.log(resposne);
          if (this.productsResponse) {
            this.productsResponse.content =
              this.productsResponse.content.filter(
                (p) => p.productId !== product.productId
              );
          }
        },
        error: (error) => {
          console.log(error);
          this.toatrService.error('Error in deleting product !!');
        },
      });
    }
  }

  loadCategories() {
    this.categoryService.getCategoriesFromStore().subscribe({
      next: (categories) => {
        if (categories.length > 0) {
          //
          this.categories = categories;
        } else {
          // load the data from server
          this.categoryService.getCategories().subscribe({
            next: (categoryResponse) => {
              this.catStroe.dispatch(
                setCategoryData({ categories: categoryResponse.content })
              );
            },
          });
        }
      },
    });
  }

  toggleUpdateView(content: any, product: Product) {
    this.update = true;
    this.product = product;
    this.modalService
      .open(content, {
        size: 'xl',
      })
      .result.then()
      .catch()
      .finally(() => {
        this.update = false;
      });

    // loading category from store or backend
    this.loadCategories();
  }

  toggleUpateView1() {
    this.update = !this.update;
    this.loadCategories();
  }

  updateFormSubmitted(event: SubmitEvent) {
    event.preventDefault();

    // validate data....
    if (this.product != null) {
      if (this.product.title.trim() === '') {
        this.toastr.error('Title is required !!');
        return;
      }
      if (
        this.product.description == null ||
        this.product.description.trim() === ''
      ) {
        this.toastr.error('Description is required !!');
        return;
      }
      if (this.product.quantity <= 0) {
        this.toastr.error('Quantity must be > 0');
        return;
      }
      if (this.product.price <= 0) {
        this.toastr.error('Price must be > 0');
        return;
      }
      if (
        this.product.discountedPrice <= 0 ||
        parseInt(this.product.discountedPrice + '') >
          parseInt(this.product.price + '')
      ) {
        this.toastr.error(
          'Provide correct discounted value value>0  and value < price !!'
        );
        return;
      }

      // log
      console.log('submit for to update');
      this.productService.updateProduct(this.product).subscribe({
        next: (data) => {
          this.toastr.success('Product Updated');
          this.product = data;
        },
        error: (error) => {
          this.toastr.error('Error in  updating product !!');
          console.log(error);
        },
      });
    }
  }

  updateProductCategory() {
    console.log('updating category');

    if (this.product) {
      this.productService
        .updateCategoryOfProduct(
          this.product?.productId,
          this.product?.category.categoryId
        )
        .subscribe({
          next: (data) => {
            this.product = data;
            this.toastr.success('category updated !!');
          },
        });
    }
  }

  // search product method

  searchProduct() {
    if (this.searchQuery.trim() === '') {
      this.toastr.error('Search Query Required !!');
      console.log(this.oldProductsResponse);

      if (this.oldProductsResponse) {
        this.productsResponse = this.oldProductsResponse;
        this.searchMode = false;
      }

      return;
    }

    this.productSearchService(0);
  }

  // search product service
  productSearchService(
    pageNumber: number = 0,
    pageSize: number = 10,
    sortBy: string = 'title',
    sortDir: string = 'asc'
  ) {
    console.log('page number : ' + pageNumber);

    this.productService
      .searchProduct(this.searchQuery, pageNumber, pageSize, sortBy, sortDir)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (this.searchMode) {
            this.productsResponse = data;
          } else {
            this.oldProductsResponse = this.productsResponse;
            this.productsResponse = data;
            this.searchMode = true;
            console.log('old resposne');
            console.log(this.oldProductsResponse);
          }
        },
      });
  }

  restoreOldData() {
    if (this.searchQuery.trim() == '' && this.oldProductsResponse) {
      console.log('test');
      this.productsResponse = this.oldProductsResponse;
      this.oldProductsResponse = undefined;
      this.searchMode = false;
    }
  }

  compareFn(value: any, option: any) {
    return value?.categoryId === option?.categoryId;
  }
}
