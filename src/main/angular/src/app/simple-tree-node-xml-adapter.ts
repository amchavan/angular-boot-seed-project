import { SimpleTreeNode } from './simple-tree/simple-tree-node';

/**
 * A simple-minded implementation of SimpleTreeNode that allows
 * displaying the contents of an XML document as an expandable
 * tree.
 *
 * DEMO! Only works on simple cases.
 *
 * @author amchavan, 02-Feb-2020
 */
export class SimpleTreeNodeXmlAdapter implements SimpleTreeNode {

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

    get childrenCount(): number {
        const parent: ParentNode = (this.xmlNode as unknown as ParentNode);
        return parent.childElementCount;
    }
}
