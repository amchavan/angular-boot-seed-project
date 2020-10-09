import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {DataProvider} from '../data-provider';
import {MessageExchange} from '../message-exchange';

@Component({
    selector: 'entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.css'],
    providers: [
        {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
        ]
})
export class EntryFormComponent implements OnInit {

    timezones: any = null;
    entryForm: any;

    constructor( private formBuilder: FormBuilder,
                 public  activeModal: NgbActiveModal,
                 private dataProvider: DataProvider,
                 private mx: MessageExchange ) {
    }

    ngOnInit() {
        this.mx.getExchange().subscribe( message => {
            console.log('>>> message:', message.type);
            if (message.type === MessageExchange.GLOBAL_CONFIG_AVAILABLE ) {
                this.fetchTimezones();
            }
        });

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
            timezones: [null, []],
        })
    }

    broadcastQueryResults( currentTime: string ) {
        this.mx.broadcastCurrentTime( currentTime );
    }

    onSelectTimezone(tz) {
        this.f.timezone.setValue( tz );
    }

    onSubmit() {
        this.dataProvider.fetchCurrentTime( this.f.timezone.value );
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
