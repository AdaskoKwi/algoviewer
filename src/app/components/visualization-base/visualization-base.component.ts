import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DSAModule} from '../../model/dsa-module/DSAModule';
import {LinkedListModule} from '../../visualizations/linkedList';
import {StackModule} from '../../visualizations/stack';
import {HeapModule} from '../../visualizations/heap';
import {QuickSortModule} from '../../visualizations/quicksort';
import {TreeBSTModule} from '../../visualizations/treebst';

@Component({
    selector: 'app-visualization-base',
    imports: [],
    standalone: true,
    templateUrl: './visualization-base.component.html',
    styleUrl: './visualization-base.component.css'
})
export class VisualizationBaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('visualizationContainer', { static: true }) visualizationContainer!: ElementRef<SVGSVGElement>;
    @Input() visualizationTitle!: string;
    dsaModules: DSAModule[] = [];
    currentModule! :DSAModule;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.visualizationTitle = params.get('name')!;
            console.log('Visualization Title from URL:', this.visualizationTitle);

            const element = this.visualizationContainer.nativeElement;

            this.dsaModules = [
                new LinkedListModule(element),
                new StackModule(element),
                new HeapModule(15, element),
                new QuickSortModule(20, element),
                new TreeBSTModule(15, element)
            ];
            this.currentModule = this.dsaModules.find(module => module.name === this.visualizationTitle)!;

            this.currentModule.render();
        })
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {

    }
}
