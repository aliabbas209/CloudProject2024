import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/models/cart.model';

export const updateCart = createAction('UPDATE_CART', props<{ cart: Cart }>());
export const removeCart = createAction('REMVOE_CART');
