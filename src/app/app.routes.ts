import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookDetailsComponent } from './features/book-details/book-details.component';
import { AuthorDetailsComponent } from './features/author-details/author-details.component';
import { SearchComponent } from './features/search/search.component';
import { WishlistComponent } from './shared/components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"book-details/:id",component:BookDetailsComponent},
    {path:"author-details/:id",component:AuthorDetailsComponent},
    {path:"search-item/:id",component:SearchComponent},
    {path:"wishlist",component:WishlistComponent},
];
