import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {addNode, listNode, renderLinkedList, reverseList} from '../../visualizations/linkedList';

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

    linkedList: listNode[] = [
        {id: 1, value: 10},
        {id: 2, value: 20},
        {id: 3, value: 30},
    ];

    constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
        this.visualizationContainer = elementRef;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.visualizationTitle = params.get('name')!;
        })
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
        renderLinkedList(this.linkedList, this.visualizationContainer.nativeElement)
    }

    protected readonly addNode = addNode;
    protected readonly renderLinkedList = renderLinkedList;
    protected readonly reverseList = reverseList;
}
