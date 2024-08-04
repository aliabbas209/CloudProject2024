import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductCardComponent } from './single-product-card.component';

describe('SingleProductCardComponent', () => {
  let component: SingleProductCardComponent;
  let fixture: ComponentFixture<SingleProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProductCardComponent]
    });
    fixture = TestBed.createComponent(SingleProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
