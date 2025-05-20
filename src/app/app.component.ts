import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {MainGridComponent} from './components/main-grid/main-grid.component';

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, MainGridComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = "Algoviewer";
}
