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

    /** A simple SimpleTreeNodeXmlAdapter cache */
    private static xmlNodesCache = new WeakMap<Element, SimpleTreeNodeXmlAdapter>();

    private readonly xmlNode: Element;
    private doShowChildren: boolean;

    public static fromXml(xml: string): SimpleTreeNodeXmlAdapter {
        const domParser = new DOMParser();
        const xmlDocument = domParser.parseFromString(xml, 'text/xml');
        return new SimpleTreeNodeXmlAdapter( xmlDocument.documentElement, true );
    }

    constructor( xmlNode: Element, doShowChildren: boolean ) {
        this.xmlNode = xmlNode;
        this.doShowChildren = doShowChildren;
        SimpleTreeNodeXmlAdapter.xmlNodesCache.set( xmlNode, this );    // cache this adapter
    }

    get name(): string {
        let nodeValue = '';
        const childNode = this.xmlNode.childNodes[0];
        if (childNode) {
            nodeValue = ': ' + childNode.nodeValue;
        }
        return this.xmlNode.nodeName + nodeValue;
    }

    get children(): SimpleTreeNode[] {
        const firstChild = this.xmlNode.firstElementChild;
        if (firstChild === null) {
            return [];
        }

        const lastChild = this.xmlNode.lastElementChild;
        let currentChild = firstChild;
        const ret: SimpleTreeNodeXmlAdapter[] = [];
        while ( currentChild !== null ) {

            // We have a child node, now we need to wrap that in an adapter
            // We first look up the adapter in our cache, and if we can't find
            // there we create a new one: the constructor will cache it for
            // the next time
            // --------------------------------------------------------------
            let currentChildAdapter = SimpleTreeNodeXmlAdapter.xmlNodesCache.get( currentChild );
            if ( currentChildAdapter === undefined ) {
                currentChildAdapter = new SimpleTreeNodeXmlAdapter( currentChild, true );
            }

            // Add that adapter to the list of our children, then check that we are done
            ret.push( currentChildAdapter );
            if ( currentChild === lastChild ) {
                break;  // reached the last child, we're done
            }
            currentChild = currentChild.nextElementSibling;     // proceed with the next sibling node
        }

        return ret;
    }

    get showChildren(): boolean {
        return this.doShowChildren;
    }

    set showChildren( show ) {
        this.doShowChildren = show;
    }

    get childrenCount(): number {
        return this.xmlNode.childElementCount;
    }
}
