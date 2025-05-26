import * as d3 from "d3";
import {DSAButton, DSAModule} from '../model/dsa-module/DSAModule';

interface TreeBSTNode {
    data: number,
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
        {label: 'Print Inorder', action: this.traverse.bind(this)}
    ];

    render = (): void => {
        d3.select(this.container).select('svg').remove();

        const nodeWidth: number = 40;
        const nodeHeight: number = 40;
        const totalWidth: number = this.container.clientWidth;
        const totalHeight: number = this.container.clientHeight;

        const svg = d3.select(this.container)
            .append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
            .attr('preserveAspectRatio', 'xMinYMin meet')

    };

    private getRandomInt(): number {
        return Math.floor(Math.random() * 100);
    }

    insert(data: number = this.getRandomInt()) {
        if (this.currSize < this.maxSize) {
            if (this.root != null) {
                this.currSize++;
                return this.insert_aux(data);
            } else {
                this.currSize++;
                this.root = {
                    data: data,
                    left: null,
                    right: null
                }
            }
        }
    }

    insert_aux(data: number) {
        let visitingNode: TreeBSTNode = this.root!;

        while (visitingNode.data !== data) {
            if (visitingNode.data < data) {
                if (visitingNode.right == null) {
                    visitingNode.right = {
                        data: data,
                        left: null,
                        right: null
                    };
                } else {
                    visitingNode = visitingNode.right;
                }
            } else {
                if (visitingNode.left == null) {
                    visitingNode.left = {
                        data: data,
                        left: null,
                        right: null
                    };
                } else {
                    visitingNode = visitingNode.left;
                }
            }
        }
    }

    traverse() {
        this.print_preorder(this.root!);
    }

    print_preorder(root: TreeBSTNode) {
        if (root) {
            console.log(root.data);
            this.print_preorder(root.left!);
            this.print_preorder(root.right!);
        }
    }

}
