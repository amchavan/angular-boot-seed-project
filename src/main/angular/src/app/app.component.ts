import {Component, OnInit} from '@angular/core';
import {DataProvider} from './data-provider';
import {interval, Subscription} from "rxjs";
import {MessageExchange} from "./message-exchange";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public timezone = {"zoneId":"UTC","zoneOffset":"Z"};                // current timezone
    public datetime: string;                                            // current datetime

    private subscription: Subscription;

    constructor( public dataProvider: DataProvider,
                 public mx: MessageExchange ) {
        // no-op
    }

    ngOnInit(): void {

        this.mx.getExchange().subscribe( message => {
            console.log('>>> AppComponent received:', message.type);
            if (message.type === MessageExchange.GLOBAL_CONFIG_AVAILABLE ) {
                this.subscription = AppComponent.launchBackgroundLoop( this.updateClock( this ), 1000 );
            }
            else if (message.type === MessageExchange.CURRENT_TIMEZONE ) {
                this.timezone = message.currentTimezone;
            }
        });

        this.fetchAllStartupInfo();
    }

    private updateClock( component: AppComponent ) {
        return function() {
            component.dataProvider.fetchCurrentTime( component.timezone['zoneId'] )
                .then(datetime => component.datetime = datetime['datetime'])
                .catch(reason => console.error(reason));
        }
    }

    // Launch a background loop repeating an action every n milliseconds
    private static launchBackgroundLoop(action: any, delay: number ): Subscription {
        const source = interval( delay );
        return source.subscribe( action );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Fetch all startup information from the backend server
    public fetchAllStartupInfo() {
        // Fetch global configuration information
        this.dataProvider.fetchGlobalConfiguration();
    }

    public renderDatetime(): string {
        if( this.datetime === undefined ) {
            return "(not available)";
        }
        return this.datetime.split('\.')[0];
    }

    renderTimezone() {
        const offset = this.timezone['zoneOffset'] === 'Z' ? '' : ' (' + this.timezone['zoneOffset'] + ')';
        return this.timezone['zoneId'] + offset;
    }
}
