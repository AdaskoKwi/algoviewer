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
    gridItems = signal<GridItem[]>([
        {imagePath: "/Binary_search_tree.svg.png", name: "BST Tree"},
        {imagePath: "/dijkstra.png", name: "Dijkstra's Algorithm"},
        {imagePath: "/Depth-First-Search.gif", name: "DFS"},
        {imagePath: "/Lifo_stack.png", name: "Stack"},
        {imagePath: "/Max-Heap.svg", name: "Heap"},
        {imagePath: "/Singly-linked-list.svg", name: "Linked List"},
        {imagePath: "/Sorting_quicksort_anim.gif", name: "QuickSort"},
        {imagePath: "/Animated_BFS.gif", name: "BFS"}
    ]);

    filterItems():GridItem[] {
        return this.gridItems()
            .filter(item =>
                item.name.toLowerCase().includes(
                    this.searchTerm().toLowerCase()));
    }
}
