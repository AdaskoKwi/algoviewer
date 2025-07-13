import * as d3 from "d3";
import {DSAButton, DSAModule} from '../model/dsa-module/DSAModule';
import {Selection} from 'd3';

interface DataBar {
    id: number;
    value: number;
    color: string;
}

export class QuickSortModule implements DSAModule {
    private xScale: d3.ScaleBand<number>;
    private svg!: Selection<SVGSVGElement, unknown, null, undefined>;
    private containerWidth: number = 0;
    private containerHeight: number = 0;

    constructor(maxSize: number, container: Element) {
        this.xScale = d3.scaleBand<number>()
            .padding(0.1);
        this.setup(maxSize);

        this.container = container;
    }

    listToSort: DataBar[] = [];
    name: string = 'QuickSort';
    container: Element;
    sorting: boolean = false;

    buttons: DSAButton[] = [
        {label: 'Start Sort', action: this.startSort.bind(this)},
        {label: 'Reset', action: this.reset.bind(this)}
    ];

    render = (): void => {
        this.containerWidth = this.container.clientWidth;
        this.containerHeight = this.container.clientHeight;

        d3.select(this.container).select('svg').remove();

        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.containerWidth)
            .attr('height', this.containerHeight)
            .attr('viewBox', `0 0 ${this.containerWidth} ${this.containerHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet');

        this.updateBars();
    }

    private updateBars(duration: number = 300): void {
        this.xScale.domain(this.listToSort.map((d: DataBar, i: number): number => i))
            .range([0, this.containerWidth]);

        const barWidth = this.xScale.bandwidth();
        const maxValue = Math.max(...this.listToSort.map(d => d.value));

        const bars = this.svg.selectAll<SVGRectElement, DataBar>('rect')
            .data(this.listToSort, d => d.id.toString());

        bars.exit()
            .transition()
            .duration(duration)
            .attr('y', this.containerHeight)
            .attr('height', 0)
            .remove();

        const enterBars = bars.enter()
            .append('rect')
            .attr('x', (d, i) => this.xScale(i)!)
            .attr('y', this.containerHeight)
            .attr('width', barWidth)
            .attr('height', 0)
            .attr('fill', d => d.color)
            .attr('stroke', 'hsl(0, 0%, 25%)')
            .attr('stroke-width', 1)
            .attr('rx', 3)
            .attr('ry', 3);

        bars.merge(enterBars)
            .transition()
            .duration(duration)
            .attr('x', (d, i) => this.xScale(i)!)
            .attr('y', d => this.containerHeight - (d.value / maxValue) * (this.containerHeight - 20))
            .attr('height', d => (d.value / maxValue) * (this.containerHeight - 20))
            .attr('width', barWidth)
            .attr('fill', d => d.color);
    }

    private getRandomInt(min: number = 10, max: number = 100): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setup(size: number): void {
        this.listToSort = Array.from({length: size}, (_, i) => ({
            id: i + 1,
            value: this.getRandomInt(),
            color: '#69b3a2'
        }));
    }

    reset(): void {
        if (this.sorting) return;
        this.setup(this.listToSort.length);
        this.updateBars();
    }

    private async startSort(): Promise<void> {
        if (this.sorting) return;
        this.sorting = true;
        await this.quicksort(0, this.listToSort.length - 1);
        await this.highlightComplete();
        this.sorting = false;
    }

    private async quicksort(left: number, right: number): Promise<void> {
        if (left < right) {
            const pivotIndex = await this.partition(left, right);
            await this.quicksort(left, pivotIndex - 1);
            await this.quicksort(pivotIndex + 1, right);
        }
    }

    private async partition(low: number, high: number): Promise<number> {
        const pivot = this.listToSort[high];
        let i = low - 1;

        pivot.color = '#ff0000';
        this.updateBars();
        await this.delay(600);

        for (let j = low; j < high; j++) {
            this.listToSort[j].color = '#ffff00';
            this.updateBars();
            await this.delay(200);

            if (this.listToSort[j].value < pivot.value) {
                i++;

                this.listToSort[i].color = '#ffa500';
                this.listToSort[j].color = '#ffa500';
                this.updateBars();
                await this.delay(200);

                [this.listToSort[i], this.listToSort[j]] = [this.listToSort[j], this.listToSort[i]];

                this.listToSort[i].color = '#69b3a2';
                this.listToSort[j].color = '#69b3a2';
                this.updateBars();
                await this.delay(200);
            }

            this.listToSort[j].color = '#69b3a2';
            this.updateBars();
        }

        [this.listToSort[i + 1], this.listToSort[high]] = [this.listToSort[high], this.listToSort[i + 1]];
        this.listToSort[i + 1].color = '#00ff00';
        pivot.color = '#69b3a2';
        this.updateBars();
        await this.delay(600);

        return i + 1;
    }

    private async highlightComplete(): Promise<void> {
        for (const bar of this.listToSort) {
            bar.color = '#4CAF50';
            this.updateBars(100);
            await this.delay(50);
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
