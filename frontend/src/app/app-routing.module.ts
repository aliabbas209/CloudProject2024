import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { normalUserGuard } from './guards/normal-user.guard';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { adminUserGuard } from './guards/admin-user.guard';
import { HomeComponent as AdminHomeComponent } from './components/admin/home/home.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { ViewProductsComponent } from './components/admin/view-products/view-products.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewOrdersComponent } from './components/admin/view-orders/view-orders.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { UserComponent } from './components/pages/user/user.component';
import { StoreComponent } from './components/pages/store/store.component';
import { StoreCategoriesComponent } from './components/pages/store-categories/store-categories.component';
import { ViewProductComponent } from './components/pages/view-product/view-product.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    title: 'Home: Electronic Store',
  },
  {
    path: 'store',
    component: StoreComponent,
    title: 'All Products : Store',
  },
  {
    path: 'store/:categoryId/:categoryTitle',
    component: StoreCategoriesComponent,
  },
  {
    path: 'product/:productId',
    component: ViewProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart | Electornic Store',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About: Electronic Store',
  },
  {
    path: 'features',
    component: FeatureComponent,
    title: 'Features: Electronic Store',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login: Electronic Store',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup: Electronic Store',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Categories: Electronic Store',
  },
  {
    path: 'user',
    component: DashboardComponent,
    title: 'UserDashboard',
    canActivate: [normalUserGuard],
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [normalUserGuard],
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [normalUserGuard],
  },
  {
    path: 'admin',
    component: AdminDashboard,
    title: 'Admin Dashboard',
    canActivate: [adminUserGuard],
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
        title: 'Admin Dashabord',
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        title: 'Add Product',
      },
      {
        path: 'view-products',
        component: ViewProductsComponent,
        title: 'View products',
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent,
        title: 'Add Category',
      },
      {
        path: 'view-categories',
        component: ViewCategoriesComponent,
        title: 'View Categories',
      },
      {
        path: 'orders',
        component: ViewOrdersComponent,
        title: 'View Orders',
      },
      {
        path: 'users',
        component: ViewUsersComponent,
        title: 'All Users',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
