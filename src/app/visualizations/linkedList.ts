import * as d3 from "d3";

export interface listNode {
    id: number,
    value: number,
}

export function renderLinkedList(data: listNode[], container: Element): any {
    d3.select(container).select('svg').remove();

    const svg = d3.select(container)
        .append('svg')
        .attr('width', container.clientWidth)
        .attr('height', container.clientHeight)
        .attr('viewBox', `0 0 ${container.clientWidth} ${container.clientHeight/2}`)

    const nodeWidth: number = 120;
    const nodeHeight: number = 60;
    const spacing: number = 150;

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
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * spacing + 10)  // troszkę przesunięte od lewej, żeby było miejsce
        .attr('y', 20)                      // wysokość od góry svg
        .attr('width', nodeWidth)                  // szerokość prostokąta
        .attr('height', nodeHeight)                 // wysokość prostokąta
        .attr('fill', 'whitesmoke')
        .attr('stroke', 'hsl(0, 0%, 25%)')
        .attr('stroke-width', 2);

    svg.selectAll('text')
        .data(data)
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

    for (let i = 0; i < data.length - 1; i++) {
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

export function addNode(data: listNode[]): void {
    if (data.length < 8) {
        const lastNode: listNode = data.slice(-1)[0];
        const newNode: listNode = {
            id: lastNode.id + 1,
            value: lastNode.value + 10
        }

        data.push(newNode);
    }
}

export function reverseList(data: listNode[]): void {
    data.reverse();
}
