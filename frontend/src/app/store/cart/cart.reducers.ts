import { Cart } from '../../models/cart.model';
import { createReducer, on } from '@ngrx/store';
import { removeCart, updateCart } from '../cart/cart.actions';
import { User } from 'src/app/models/user.model';

function getBlankCart() {
  return {
    cartId: '',
    createdAt: new Date(),
    items: [],
    user: new User('', '', '', '', ''),
  };
}
const initialCart: Cart = getBlankCart();

export const cartReducer = createReducer(
  initialCart,
  on(updateCart, (state, { cart }) => {
    console.log('updating cart in store');
    return { ...cart };
  }),
  on(removeCart, (state) => {
    return getBlankCart();
  })
);
