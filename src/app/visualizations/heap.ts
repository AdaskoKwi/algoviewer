import * as d3 from "d3";
import {DSAButton, DSAModule} from '../model/dsa-module/DSAModule';

export interface HeapNode {
    value: number
}

export class HeapModule implements DSAModule {
    constructor(maxSize: number) {
        this.maxSize = maxSize;
        this.size = 0;
    }

    heap: HeapNode[] = [];

    name: string = 'Heap';
    maxSize: number;
    size: number

    buttons: DSAButton[] = [
        {label: 'Insert Random', action: this.insertRand.bind(this)},
        {label: 'Clear', action: this.clear.bind(this)}
    ];

    render = (container: Element): void => {
        d3.select(container).select('svg').remove();

        const nodeWidth: number = 40;
        const nodeHeight: number = 40;
        const horizontalSpacing: number = 80;
        const verticalSpacing: number = 60;
        const totalWidth: number = container.clientWidth;
        const totalHeight: number = container.clientHeight;

        const svg = d3.select(container)
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet')

        const calculatePosition = (index: number) => {
            const depth: number = Math.floor(Math.log2(index + 1));
            const levelNodes: number = 2 ** depth;
            const levelWidth: number = levelNodes * (nodeWidth + horizontalSpacing);
            const xOffset: number = (totalWidth - levelWidth) / 2;

            const positionInLevel: number = index + 1 - 2 ** depth;
            const x: number = xOffset + positionInLevel * (nodeWidth + horizontalSpacing);
            const y: number = 20 + depth * (nodeHeight + verticalSpacing);

            return { x, y };
        };

        for (let i = 0; i < this.size; i++) {
            if (this.heap[i]) {
                const parentPos = calculatePosition(i);

                const leftChild: number = this.leftChild(i);
                if (leftChild < this.size && this.heap[leftChild]) {
                    const childPos = calculatePosition(leftChild);
                    svg.append('line')
                        .attr('x1', parentPos.x + nodeWidth/2)
                        .attr('y1', parentPos.y + nodeHeight)
                        .attr('x2', childPos.x + nodeWidth/2)
                        .attr('y2', childPos.y)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 2);
                }

                const rightChild: number = this.rightChild(i);
                if (rightChild < this.size && this.heap[rightChild]) {
                    const childPos = calculatePosition(rightChild);
                    svg.append('line')
                        .attr('x1', parentPos.x + nodeWidth/2)
                        .attr('y1', parentPos.y + nodeHeight)
                        .attr('x2', childPos.x + nodeWidth/2)
                        .attr('y2', childPos.y)
                        .attr('stroke', 'black')
                        .attr('stroke-width', 2);
                }
            }
        }

        const nodes = svg.selectAll('.heap-node')
            .data(this.heap.slice(0, this.size))
            .enter()
            .append('g')
            .attr('transform', (d, i) => {
                const pos = calculatePosition(i);
                return `translate(${pos.x},${pos.y})`;
            });

        nodes.append('rect')
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('fill', '#f0f0f0')
            .attr('stroke', '#333')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        nodes.append('text')
            .attr('x', nodeWidth/2)
            .attr('y', nodeHeight/2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-family', 'Poppins')
            .style('font-size', '1em')
            .text(d => d.value);
    }

    private parent(position: number): number  {
        return Math.floor((position-1) / 2);
    }

    private leftChild(position: number): number {
        return (2 * position) + 1;
    }

    private rightChild(position: number): number {
        return (2 * position) + 2;
    }

    private getRandomInt(): number {
        return Math.floor(Math.random() * 100);
    }

    private swap(first: number, second: number): void {
        [this.heap[first], this.heap[second]] = [this.heap[second], this.heap[first]];
    }

    insertRand(): void {
        if (this.size < this.maxSize) {
            const newNode: HeapNode = {value: this.getRandomInt()};
            this.heap[this.size] = newNode;

            let current = this.size;

            while (current > 0) {
                const parentIdx = this.parent(current);
                if (this.heap[current].value <= this.heap[parentIdx].value) break;

                this.swap(current, parentIdx);
                current = parentIdx;
            }

            this.size++;
        }

    }

    clear(): void {
        while (this.heap.length > 0) {
            this.heap.pop();
            this.size = this.heap.length;
        }
    }

}
