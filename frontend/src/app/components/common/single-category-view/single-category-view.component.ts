import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-single-category-view',
  templateUrl: './single-category-view.component.html',
  styleUrls: ['./single-category-view.component.css'],
})
export class SingleCategoryViewComponent {
  @Input() category?: Category;
}
