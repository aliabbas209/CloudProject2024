import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { setCategoryData } from './category.actions';

const intialState: Category[] = [];

export const categoryReducer = createReducer(
  intialState,
  on(setCategoryData, (state, { categories }) => {
    console.log('category state changing');

    return [...categories];
  })
);
