import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * A simple modal error box, displays an error message via an @Input() property
 * @author amchavan, 05-Sep-2020
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'error-box',
    templateUrl: './error-box.component.html',
    styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent {

    @Input() errorDescription: string;
    @Input() errorInfo: any;
    @Input() serverName: string;

    constructor( public activeModal: NgbActiveModal ) {
    }
}
