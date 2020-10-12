import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EntryFormComponent} from "../entry-form/entry-form.component";

@Component({
  selector: 'main-button-group',
  templateUrl: './main-button-group.component.html',
  styleUrls: ['./main-button-group.component.css']
})
export class MainButtonGroupComponent {

  constructor(private modalService: NgbModal ) {
  }

  openEntryForm() {
    this.modalService.open( EntryFormComponent, { size: 'lg'} ).result.then(
        () => {
          // success -- no-op
        },
        () => {
          // failure -- no-op
        });
  }
}
