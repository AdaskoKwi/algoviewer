import { Routes } from '@angular/router';
import {ItemPageComponent} from './pages/item-page/item-page.component';
import {MainGridComponent} from './components/main-grid/main-grid.component';

export const routes: Routes = [
    {path: '', component: MainGridComponent},
    {path: 'view', component: ItemPageComponent}
];
