import {Component, model, signal} from '@angular/core';
import {GridItemComponent} from '../grid-item/grid-item.component';
import {FormsModule} from '@angular/forms';
import {GridItem} from '../../model/grid-item/GridItem.type';

@Component({
    selector: 'app-main-grid',
    imports: [
        GridItemComponent,
        FormsModule
    ],
    standalone: true,
    templateUrl: './main-grid.component.html',
    styleUrl: './main-grid.component.css'
})
export class MainGridComponent {
    searchTerm = model<string>("");
    gridItems = signal<GridItem[]>([]);

    testItem:GridItem = {
        imagePath: "/placeholder.webp",
        name: "Name"
    }

    filterItems():GridItem[] {
        return this.gridItems()
            .filter(item =>
                item.name.includes(
                    this.searchTerm().charAt(0).toUpperCase() + this.searchTerm().slice(1)));
    }

    fillTestList() {
        for (let i = 0; i < 12; i++) {
            this.gridItems.update(items => {
                items.push(this.testItem);

                return items;
            })
        }
    }

    ngOnInit() {
        this.fillTestList();
    }
}
