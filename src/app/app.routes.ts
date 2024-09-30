import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookDetailsComponent } from './features/book-details/book-details.component';
import { AuthorDetailsComponent } from './features/author-details/author-details.component';
import { SearchComponent } from './features/search/search.component';
import { WishlistComponent } from './shared/components/wishlist/wishlist.component';
import { authGuard } from './core/gaurds/auth.guard';

export const routes: Routes = [
    {path:"home",redirectTo:"",pathMatch:"full"},
    {path:"",component:HomeComponent},
    {path:"book-details/:id",component:BookDetailsComponent,canActivate:[authGuard]},
    {path:"author-details/:id",component:AuthorDetailsComponent,canActivate:[authGuard]},
    {path:"search-item/:id",component:SearchComponent},
    {path:"wishlist",component:WishlistComponent},
];
