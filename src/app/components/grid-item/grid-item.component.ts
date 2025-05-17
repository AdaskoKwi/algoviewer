import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {GridItem} from '../../model/grid-item/GridItem.type';

@Component({
    selector: 'app-grid-item',
    imports: [
        NgOptimizedImage
    ],
    standalone: true,
    templateUrl: './grid-item.component.html',
    styleUrl: './grid-item.component.css'
})
export class GridItemComponent {
    @Input() gridItem!: GridItem


}
