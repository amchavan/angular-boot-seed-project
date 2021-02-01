import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SimpleTreeNode } from './simple-tree-node';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.css']
})
export class SimpleTreeComponent implements OnInit {

  @Input() treeData: SimpleTreeNode[];

  ngOnInit() {
  }

  toggleChild(node) {
    node.showChildren = !node.showChildren;
  }

}
