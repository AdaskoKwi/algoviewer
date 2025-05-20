import {Component, inject, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {GridItem} from '../../model/grid-item/GridItem.type';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
    selector: 'app-grid-item',
    imports: [
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive
    ],
    standalone: true,
    templateUrl: './grid-item.component.html',
    styleUrl: './grid-item.component.css'
})
export class GridItemComponent {
    @Input() gridItem!: GridItem

}
