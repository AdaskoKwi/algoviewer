import { Component } from '@angular/core';
import {VisualizationBaseComponent} from '../../components/visualization-base/visualization-base.component';

@Component({
    selector: 'app-item-page',
    imports: [
        VisualizationBaseComponent
    ],
    standalone: true,
    templateUrl: './item-page.component.html',
    styleUrl: './item-page.component.css'
})
export class ItemPageComponent {

}
