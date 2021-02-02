import {SimpleTreeNode} from './simple-tree/simple-tree-node';

/**
 * An example dataset for a tree, using literal data definitions
 *
 * @author amchavan, 02-Feb-2020
 */
export const RAW_TREE_NODE: SimpleTreeNode = {
    name: 'Europe',
    showChildren: true,
    children: [
        {
            name: 'Germany',
            children: [
                { name: 'Berlin', children: [], childrenCount: 0 },
                { name: 'Munich', children: [], childrenCount: 0 },
                { name: 'Frankfurt', children: [], childrenCount: 0 },
            ],
            childrenCount: 3
        },
        {
            name: 'France',
            showChildren: false,
            children: [
                { name: 'Paris', children: [], childrenCount: 0 },
                { name: 'Lyon', children: [], childrenCount: 0 }
                ],
            childrenCount: 3
        },
        {
            name: 'Italy',
            showChildren: false,
            children: [
                { name: 'Rome', children: [], childrenCount: 0 },
                { name: 'Milan', children: [], childrenCount: 0 },
                { name: 'Turin', children: [], childrenCount: 0 },
                { name: 'Florence', children: [], childrenCount: 0 },
                { name: 'Naples', children: [], childrenCount: 0 },
                { name: 'Verona', children: [], childrenCount: 0 }
                ],
            childrenCount: 6
        },
        {
            name: 'Poland',
            showChildren: false,
            children: [],
            childrenCount: 0
        },
        {
            name: 'Netherlands',
            showChildren: false,
            children: [],
            childrenCount: 0
        },
        {
            name: 'Belgium',
            showChildren: false,
            children: [
                { name: 'Brussels', children: [], childrenCount: 0 }
                ],
            childrenCount: 1
        },
        {
            name: 'Czech Republic',
            showChildren: false,
            children: [],
            childrenCount: 0
        },
        {
            name: 'Portugal',
            showChildren: false,
            children: [],
            childrenCount: 0
        },
        {
            name: 'Sweden',
            showChildren: false,
            children: [],
            childrenCount: 0
        },
    ],
    childrenCount: 9
};
