import {Injectable} from '@angular/core';
import {SimpleTreeNode} from './simple-tree/simple-tree-node';

@Injectable()
export class AdaptedTree implements SimpleTreeNode {
    private readonly theNode: SimpleTreeNode ;

    constructor() {
        this.theNode = this.node( 'root' );
    }

    get children(): SimpleTreeNode[] {
        return [];
    }

    get name(): string {
        return this.theNode.name;
    }

    get showChildren(): boolean {
        return this.theNode.showChildren;
    }

    set showChildren( show) {
        this.theNode.showChildren = show;
    }

    private node( nodeLabel: string ): SimpleTreeNode {
        return {
            name: nodeLabel,
            showChildren: true,
            children: []
        };
    }
}

export class SimpleTreeNodeXmlAdapter implements SimpleTreeNode {

    private readonly treeNode: SimpleTreeNode ;
    private readonly xmlNode: Node;
    private doShowChildren: boolean;

    public static fromXml(xml: string): SimpleTreeNodeXmlAdapter {
        const domParser = new DOMParser();
        const xmlDocument = domParser.parseFromString(xml, 'text/xml');
        return new SimpleTreeNodeXmlAdapter( xmlDocument.documentElement, true );
    }


    constructor( xmlNode: Node, doShowChildren: boolean ) {
        this.xmlNode = xmlNode;
        this.doShowChildren = doShowChildren;
    }

    get name(): string {
        let nodeValue = this.xmlNode.childNodes[0].nodeValue;
        nodeValue = nodeValue ? ': ' + nodeValue : '';
        return this.xmlNode.nodeName + nodeValue;
    }

    get children(): SimpleTreeNode[] {
        const ret: SimpleTreeNodeXmlAdapter[] = [];
        this.xmlNode.childNodes.forEach( child => {
            const adapter = new SimpleTreeNodeXmlAdapter( child, false );
            ret.push( adapter );
        });
        return ret;
    }

    get showChildren(): boolean {
        return this.doShowChildren;
    }

    set showChildren( show) {
        this.doShowChildren = show;
    }

}
