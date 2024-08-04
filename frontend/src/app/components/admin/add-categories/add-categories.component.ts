import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent {
  category: Category = new Category('', '', '', '');

  constructor(
    private toastrService: ToastrService,
    private categoryService: CategoryService
  ) {}

  formSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.category);
    if (this.category.title.trim() === '') {
      this.toastrService.warning('Title is required !!');
      return;
    }
    if (this.category.description.trim() === '') {
      this.toastrService.warning('Description is required !!');
      return;
    }
    if (this.category.coverImage.trim() === '') {
      this.toastrService.warning('Cover Image Url is required !!');
      return;
    }

    // submit the form to server
    this.categoryService.createCateory(this.category).subscribe({
      next: (data) => {
        console.log('category added');
        this.toastrService.success('Category  Added to DB !!');
        this.category = new Category('', '', '', '');
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Error in adding category');
      },
    });
  }
}
