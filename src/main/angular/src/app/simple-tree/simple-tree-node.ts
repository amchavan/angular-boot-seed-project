export interface SimpleTreeNode {
    readonly name: string;
    showChildren?: boolean;
    readonly children: SimpleTreeNode[];
    readonly childrenCount: number;
}
