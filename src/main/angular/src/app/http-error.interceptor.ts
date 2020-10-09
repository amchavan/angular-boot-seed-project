import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageExchange } from './message-exchange';

declare global {
}

/**
 * An implementation of HttpInterceptor that sends a "error-message" type event with a
 * simple description of the error. Adapted from
 * https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices
 *
 * amchavan, 03-Sep-2020
 */
export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                // retry(1),
                catchError( (error: HttpErrorResponse) => {
                    let errorDescription: string;
                    let serverName = '';
                    let errorInfo = {};
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorDescription = 'Error: ${error.error.message}';
                    } else {
                        // Server-side error
                        // -----------------------------

                        if ( error.status === 0 ) {

                            // Special case: server could not be reached by the browser itself,
                            // which reports *nothing* to the JS code (even though the browser console does
                            // indicate the problem).
                            // Reasons may include the server being unreachable (down, routing) or security
                            // issues (e.g. invalid CORS headers)
                            errorDescription = 'Cannot reach server (no further information is available)';

                        } else {

                            // Isolate server name to build a simple error message
                            const begin = error.url.indexOf( '//' ) + 2;
                            const end = error.url.substring( begin ).indexOf( '/' );
                            serverName = error.url.substring( begin, begin + end );
                            errorInfo = error;
                            errorDescription = 'There was an unexpected error';
                        }
                    }

                    // Note the 'shorthand' notation: in ES6, you can/should use {errorDescription}
                    // instead of {errorDescription: errorDescription}
                    MessageExchange.GLOBAL_MESSAGE_BUS.next( { type: 'error-message', serverName, errorInfo, errorDescription } );
                    return throwError( errorDescription );
                })
            );
    }
}
