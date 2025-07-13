import * as d3 from "d3";
import {DSAButton, DSAModule} from '../model/dsa-module/DSAModule';
import {hierarchy} from 'd3';

interface TreeBSTNode {
    value: number,
    left: TreeBSTNode | null,
    right: TreeBSTNode | null
}

export class TreeBSTModule implements DSAModule {
    private root: TreeBSTNode | null;
    maxSize: number;
    currSize: number;

    constructor(private size: number, container: Element) {
        this.root = null;
        this.maxSize = size;
        this.currSize = 0;

        this.container = container;
    }

    name: string = 'BST Tree';
    container: Element;

    buttons: DSAButton[] = [
        {label: 'Insert Random', action: this.insert.bind(this)},
        {label: 'Print Inorder', action: this.traverse.bind(this)},
    ];

    render = (): void => {
        d3.select(this.container).select('svg').remove();

        const nodeWidth: number = 40;
        const nodeHeight: number = 40;
        const totalWidth: number = this.container.clientWidth;
        const totalHeight: number = this.container.clientHeight;

        if (!this.root) {
            return;
        }

        const svg = d3.select(this.container)
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet')

        const treeHierarchy = d3.hierarchy(this.root, (d: TreeBSTNode) => {
            const children = [];
            if (d.left) children.push(d.left);
            if (d.right) children.push(d.right);
            return children.length ? children : null;
        });

        const treeLayout = d3.tree<TreeBSTNode>()
            .size([totalWidth, totalHeight - 100]);

        const treeData = treeLayout(treeHierarchy);

        const linkGenerator = (d: any) => {
            const parent = d.source;
            const child = d.target;
            const startX = parent.x;
            const startY = parent.y + nodeHeight/2;
            const endX = child.x;
            const endY = child.y + nodeHeight + 5;
            const midY = startY + (endY - startY) / 2;

            return `M ${startX},${startY}
                V ${midY}
                H ${endX}
                V ${endY}`;
        };

        svg.selectAll('.tree-link')
            .data(treeData.links())
            .enter()
            .append('path')
            .attr('class', 'tree-link')
            .attr('d', linkGenerator)
            .attr('fill', 'none')
            .attr('stroke', '#333')
            .attr('stroke-width', 2);

        const nodes = svg.selectAll('.tree-node')
            .data(treeData.descendants())
            .enter()
            .append('g')
            .attr('class', 'tree-node')
            .attr('transform', d => `translate(${d.x},${d.y + nodeHeight / 2 + 5})`);

        nodes.append('rect')
            .attr('x', -nodeWidth / 2)
            .attr('y', -nodeHeight / 2)
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('fill', '#f0f0f0')
            .attr('stroke', '#333')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        nodes.append('text')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-family', 'Poppins')
            .style('font-size', '1em')
            .text(d => d.data.value);
    };

    private getRandomInt(): number {
        return Math.floor(Math.random() * 100);
    }

    insert(data: number = this.getRandomInt()) {
        if (this.currSize < this.maxSize) {
            if (this.root != null) {
                this.currSize++;
                this.insert_aux(data);
            } else {
                this.currSize++;
                this.root = {
                    value: data,
                    left: null,
                    right: null
                }
            }
        }
        this.render();
        console.log(this.treeStructure());
    }

    insert_aux(data: number) {
        let visitingNode: TreeBSTNode = this.root!;

        while (visitingNode.value !== data) {
            if (visitingNode.value < data) {
                if (visitingNode.right == null) {
                    visitingNode.right = {
                        value: data,
                        left: null,
                        right: null
                    };
                } else {
                    visitingNode = visitingNode.right;
                }
            } else {
                if (visitingNode.left == null) {
                    visitingNode.left = {
                        value: data,
                        left: null,
                        right: null
                    };
                } else {
                    visitingNode = visitingNode.left;
                }
            }
        }
    }

    private renderNewNode(newNode: TreeBSTNode) {

    }

    traverse() {
        this.print_preorder(this.root!);
    }

    print_preorder(root: TreeBSTNode) {
        if (root) {
            console.log(root.value);
            this.print_preorder(root.left!);
            this.print_preorder(root.right!);
        }
    }

    private treeStructure() {
        return JSON.stringify(this.root);
    }
}
