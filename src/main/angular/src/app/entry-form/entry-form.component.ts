import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {DataProvider} from '../data-provider';
import {MessageExchange} from '../message-exchange';

@Component({
    selector: 'entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit {

    static timezone = null;
    timezones: any = null;
    entryForm: any;

    constructor( private formBuilder: FormBuilder,
                 public  activeModal: NgbActiveModal,
                 private dataProvider: DataProvider,
                 private mx: MessageExchange ) {
    }

    ngOnInit() {
        this.fetchTimezones();
        this.entryForm = this.makeFormGroup(this.formBuilder);
    }

    // convenience getter for easy access to defs fields
    get f(): { [p: string]: AbstractControl } {
        return this.entryForm.controls;
    }

    // convenience getter for easy access to defs values
    get v(): any {
        return this.entryForm.value;
    }

    makeFormGroup(fb: FormBuilder): FormGroup {
        return fb.group({
            timezone: [EntryFormComponent.timezone, []],
        })
    }

    renderTimezone(tz: any ) {
        const offset = tz['zoneOffset'] === 'Z' ? '00:00' : tz['zoneOffset'];
        return offset + ' ' + tz['zoneId']
    }

    onSelectTimezone( tz: string ) {
        this.f.timezone.setValue( tz );
    }

    onSubmit() {
        EntryFormComponent.timezone = this.v.timezone;
        this.mx.broadcastTimezone(this.v.timezone);
        this.activeModal.dismiss();
    }

    cancel() {
        this.activeModal.dismiss();
    }

    private fetchTimezones() {
        if( this.timezones != null ) {
            return;
        }
        this.dataProvider.fetchTimezones()
            .then( res => {
                this.timezones = res;
            })
            .catch( err => {
                console.error( err );
            });
    }
}
