import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageExchange {

    // Make this a global constant so we can send messages from
    // anywhere, not just components and services
    public static readonly GLOBAL_MESSAGE_BUS = new Subject<any>() ;
    public static readonly GLOBAL_CONFIG_AVAILABLE = "global-config-available" ;
    public static readonly CURRENT_TIMEZONE = "current-timezone" ;

    getExchange(): Observable<any> {
        return MessageExchange.GLOBAL_MESSAGE_BUS.asObservable();
    }

    broadcastGlobalConfigAvailable( ) {
        MessageExchange.GLOBAL_MESSAGE_BUS.next( { type: MessageExchange.GLOBAL_CONFIG_AVAILABLE } );
    }

    broadcastTimezone(currentTimezone: string) {
        MessageExchange.GLOBAL_MESSAGE_BUS.next( { type: MessageExchange.CURRENT_TIMEZONE, currentTimezone: currentTimezone } );
    }
}
