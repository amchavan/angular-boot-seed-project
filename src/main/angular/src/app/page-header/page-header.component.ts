import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataProvider} from '../data-provider';
import {MessageExchange} from '../message-exchange';
import {Subscription} from 'rxjs';
import {ErrorBoxComponent} from '../error-box/error-box.component';

const NOT_YET = 'not-yet-available';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

    public version: string;
    private messageExchangeSubscription: Subscription;

    constructor( public dataProvider: DataProvider,
                 public mx: MessageExchange,
                 private modalService: NgbModal ) {
        this.version  = NOT_YET;
    }

    ngOnInit() {

        // Put up a modal error box when we receive message
        this.messageExchangeSubscription = this.mx.getExchange().subscribe( message => {
            console.log('>>> PageHeaderComponent received:', message.type);
            if (message.type === 'error-message') {
                this.openErrorBox( message.serverName, message.errorDescription, message.errorInfo );
            }
            else if (message.type === MessageExchange.GLOBAL_CONFIG_AVAILABLE ) {
                this.fetchVersion();
            }
        });
    }

    fetchVersion() {
        this.dataProvider.fetchVersion()
            .then( res => {
            this.version = res['version'];
            })
            .catch( err => {
                console.error( err );
            });
    }

    openErrorBox( serverName: string, errorDescription: string, errorInfo: any ) {
        const errorBoxRef = this.modalService.open( ErrorBoxComponent );
        errorBoxRef.componentInstance.serverName = serverName;
        errorBoxRef.componentInstance.errorDescription = errorDescription;
        errorBoxRef.componentInstance.errorInfo = errorInfo;
    }
}
