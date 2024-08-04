import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoryViewComponent } from './single-category-view.component';

describe('SingleCategoryViewComponent', () => {
  let component: SingleCategoryViewComponent;
  let fixture: ComponentFixture<SingleCategoryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCategoryViewComponent]
    });
    fixture = TestBed.createComponent(SingleCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
