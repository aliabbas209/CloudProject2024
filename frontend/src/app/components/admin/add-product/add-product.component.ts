import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { setCategoryData } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  product = new Product();
  imageData: ImageData = {
    previewImageUrl: '',
    file: undefined,
  };
  constructor(
    private catService: CategoryService,
    private catStore: Store<{ cat: Category[] }>,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    // loading categories
    this.catStore.select('cat').subscribe({
      next: (categories) => {
        if (categories.length > 0) {
          console.log('categories already there');
          this.categories = categories;
        } else {
          console.log('no categories.. load from server');
          this.catService.getCategories().subscribe({
            next: (categories) => {
              this.categories = categories.content;
              this.catStore.dispatch(
                setCategoryData({ categories: this.categories })
              );
            },
          });
        }
      },
    });
  }

  formSubmitted(event: SubmitEvent) {
    event.preventDefault();
    // validate data....
    if (this.product.title.trim() === '') {
      this.toastr.error('Title is required !!');
      return;
    }
    if (this.product.description.trim() === '') {
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

    if (this.product.category.categoryId === '') {
      //add product without category
    } else {
      //add product with category
      this.productService.createProductWithCategory(this.product).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('Product created id ' + data.productId);
          this.product = new Product();
          // image upload...
          this.productService
            .uploadProductImage(data.productId, this.imageData.file!)
            .subscribe({
              next: (data) => {
                console.log(data);
                this.toastr.success('product image also updated...');
                this.imageData = {
                  previewImageUrl: '',
                  file: undefined,
                };
              },
              error: (error) => {
                console.log(error);
                this.toastr.error('Error in uploading image...');
              },
            });
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Error in creating product !!');
        },
      });
    }
  }

  // imageFieldChanged

  imageFieldChanged(event: Event) {
    console.log(event);
    this.imageData.file = (event.target as HTMLInputElement).files![0];
    console.log(this.imageData.file);
    if (
      this.imageData.file.type == 'image/png' ||
      this.imageData.file.type == 'image/jpeg'
    ) {
      //preview ..
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageData.file);
      // upload file
    } else {
      this.toastr.error('Only JPEG or PNG allowed !!');
      this.imageData.file = undefined;
    }
  }

  // custom login to compare
  compareFn(value: any, option: any) {
    return value?.categoryId === option?.categoryId;
  }
}

export interface ImageData {
  previewImageUrl: string;
  file: File | undefined;
}
