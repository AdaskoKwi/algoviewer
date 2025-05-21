import * as d3 from "d3";
import {DSAButton, DSAModule} from '../model/dsa-module/DSAModule';

export interface ListNode {
    id: number,
    value: number,
}

export class LinkedListModule implements DSAModule {
    constructor() {
    }

    linkedList: ListNode[] = [
        {id: 1, value: 10},
        {id: 2, value: 20},
        {id: 3, value: 30},
    ];

    name: string = 'Linked List'

     buttons: DSAButton[] = [
         {label: "Add Node", action: this.addNode.bind(this)},
         {label: "Delete Node", action: this.deleteNode.bind(this)},
         {label: "Reverse List", action: this.reverseList.bind(this)}
    ];

    render = (container: Element): void => {
        d3.select(container).select('svg').remove();

        const nodeWidth: number = 120;
        const nodeHeight: number = 60;
        const spacing: number = 150;
        const totalWidth: number = this.linkedList.length * (nodeWidth + spacing) - spacing;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', container.clientHeight)
            .attr('viewBox', `0 0 ${this.linkedList.length * spacing} 100`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', `0 0 10 10`)
            .attr('refX', 10)
            .attr('refY', 5)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 z')
            .attr('fill', 'hsl(0, 0%, 25%)')

        svg.selectAll('rect')
            .data(this.linkedList)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * spacing + 10)
            .attr('y', 20)
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('fill', 'whitesmoke')
            .attr('stroke', 'hsl(0, 0%, 25%)')
            .attr('stroke-width', 2);

        svg.selectAll('text')
            .data(this.linkedList)
            .enter()
            .append('text')
            .attr('x', (d, i) => i * spacing + 10 + nodeWidth / 2)
            .attr('y', 20 + nodeHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .text(d => d.value)
            .attr('fill', 'black')
            .style('font-family', 'Arial')
            .style('font-size', '16px');

        for (let i = 0; i < this.linkedList.length - 1; i++) {
            const x1: number = i * spacing + 10 + nodeWidth;
            const y1: number = 20 + nodeHeight/2;

            const x2: number = (i+1) * spacing + 10;
            const y2: number = y1;

            svg.append('line')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', 'hsl(0, 0%, 25%)')
                .attr('stroke-width', 2)
                .attr('marker-end', 'url(#arrow)')
        }
    }

    addNode(): any {
        let length = this.linkedList.length;
        if (length < 8 && length > 0) {
            const lastNode: ListNode = this.linkedList.slice(-1)[0];
            const newNode: ListNode = {
                id: lastNode.id + 1,
                value: lastNode.value + 10
            }

            this.linkedList.push(newNode);
        }
        if (length == 0 ) {
            const newNode: ListNode = {
                id: 1,
                value: 10
            }

            this.linkedList.push(newNode);
        }
    }

    deleteNode(): any {
        if (this.linkedList.length > 0) {
          this.linkedList.pop();
        }
    }

    reverseList(): any {
        this.linkedList.reverse();
    }
}

