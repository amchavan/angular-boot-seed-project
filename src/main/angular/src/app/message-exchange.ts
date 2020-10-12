import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';

/**
 * A simple message-passing channel
 */
@Injectable()
export class MessageExchange {

    // Make this a global constant so we can send messages from
    // anywhere, not just components and services
    public static readonly GLOBAL_MESSAGE_BUS = new Subject<any>() ;
    public static readonly GLOBAL_CONFIG_AVAILABLE = "global-config-available" ;
    public static readonly CURRENT_TIMEZONE = "current-timezone" ;

    private static getExchange(): Observable<any> {
        return MessageExchange.GLOBAL_MESSAGE_BUS.asObservable();
    }

    /** Subscribe to messages sent to this channel */
    subscribe( next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return MessageExchange.getExchange().subscribe( next, error, complete );
    }

    /** Send a GLOBAL_CONFIG_AVAILABLE message to our subscribers (no args) */
    broadcastGlobalConfigAvailable( ) {
        MessageExchange.GLOBAL_MESSAGE_BUS.next( { type: MessageExchange.GLOBAL_CONFIG_AVAILABLE } );
    }

    /** Send a CURRENT_TIMEZONE message to our subscribers, with the new timezone */
    broadcastTimezone(currentTimezone: string) {
        MessageExchange.GLOBAL_MESSAGE_BUS.next( { type: MessageExchange.CURRENT_TIMEZONE,
                                                   currentTimezone: currentTimezone } );
    }
}
