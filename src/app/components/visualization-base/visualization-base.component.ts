import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DSAModule} from '../../model/dsa-module/DSAModule';
import {LinkedListModule} from '../../visualizations/linkedList';
import {StackModule} from '../../visualizations/stack';
import {HeapModule} from '../../visualizations/heap';

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
    currentModule! :DSAModule;

    dsaModules: DSAModule[] = [
        new LinkedListModule(),
        new StackModule(),
        new HeapModule(15),
    ];

    constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
        this.visualizationContainer = elementRef;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.visualizationTitle = params.get('name')!;
        })
        this.currentModule = this.dsaModules.find(module => module.name === this.visualizationTitle)!;
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
        this.currentModule.render(this.visualizationContainer.nativeElement);
    }
}
