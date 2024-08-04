import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  Category,
  CategoryPaginatedReponse,
} from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory?: Category;
  updateView = false;

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categoryResponse) => {
        this.categories = categoryResponse.content;
        console.log(categoryResponse);
      },
    });
  }

  open(content: any, category: Category) {
    this.selectedCategory = { ...category };
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        animation: true,
        backdrop: true,
      })
      .result.then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('modal  close');
        this.updateView = false;
      });
  }

  // delete category
  deleteCategory(categoryToDelete?: Category) {
    this.categoryService
      .deleteCategory(categoryToDelete!.categoryId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toastrService.success('category  deleted !!');
          this.modalService.dismissAll();
          this.categories = this.categories.filter(
            (cat) => cat.categoryId != this.selectedCategory?.categoryId
          );
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Error in deleting categories');
        },
      });
  }

  toggleUpdateView() {
    this.updateView = !this.updateView;
  }

  saveSelectedCategory() {
    this.categoryService.updateCategory(this.selectedCategory!).subscribe({
      next: (data) => {
        console.log(data);
        this.toastrService.success('Category Updated');
        this.categories = this.categories.map((cat) => {
          if (cat.categoryId === this.selectedCategory?.categoryId) {
            (cat.title = data.title), (cat.description = data.description);
            cat.coverImage = data.coverImage;
            return cat;
          }
          return cat;
        });
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Error in  updating category  !!');
      },
    });
  }
}
