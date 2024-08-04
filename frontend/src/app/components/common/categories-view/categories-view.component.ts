import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { setCategoryData } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.css'],
})
export class CategoriesViewComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private catService: CategoryService,
    private catStore: Store<{ cat: Category[] }>
  ) {}
  ngOnInit(): void {
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
}
