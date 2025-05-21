import * as d3 from 'd3';
import {DSAButton, DSAModule} from '../model/dsa-module/DSAModule';

export interface StackNode {
    id: number,
    value: number
}

export class StackModule implements DSAModule {
    constructor() {
        for (let i = 1; i < 4; i++) {
            this.stackList.push({id: i, value: i});
        }
    };

    stackList: StackNode[] = [];

    name: string = 'Stack';

    buttons: DSAButton[] = [
        {label: 'Push', action: this.push.bind(this)},
        {label: 'Pop', action: this.pop.bind(this)},
        {label: 'Clear', action: this.clear.bind(this)}
    ];

    render = (container: Element): void => {
        d3.select(container).select('svg').remove();

        const rectWidth: number = 120;
        const rectHeight: number = 60;
        const totalHeight: number = container.clientHeight + 5;
        const totalWidth: number = container.clientWidth;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet');

        svg.selectAll('rect')
            .data(this.stackList)
            .enter()
            .append('rect')
            .attr('x', totalWidth / 2 - rectWidth / 2)
            .attr('y', (d, i) => (totalHeight - rectHeight - 5) - i * rectHeight)
            .attr('width', rectWidth)
            .attr('height', rectHeight)
            .attr('fill', 'whitesmoke')
            .attr('stroke', 'hsl(0, 0%, 25%)')
            .attr('stroke-width', 2);

        svg.selectAll('text')
            .data(this.stackList)
            .enter()
            .append('text')
            .attr('x', totalWidth / 2)
            .attr('y', (d, i) => (totalHeight - rectHeight / 2) - i * rectHeight)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .text(d => d.value)
            .attr('fill', 'black')
            .style('font-family', 'Poppins')
            .style('font-size', '1em');
    };

    push(): void {
        let length = this.stackList.length;
        if (length < 7 && length > 0) {
            let currentElement: StackNode = this.stackList.at(this.stackList.length - 1)!;
            let newElement: StackNode = {
                id: currentElement.id + 1,
                value: currentElement.value + 1
            };

            this.stackList.push(newElement);
        } if (length == 0) {
            let stackListElement: StackNode = {
                id: 1,
                value: 1
            };

            this.stackList.push(stackListElement);
        }
    }

    pop(): void {
        this.stackList.pop()
    }

    clear(): void {
        while (this.stackList.length > 0) {
            this.pop();
        }
    }
}
