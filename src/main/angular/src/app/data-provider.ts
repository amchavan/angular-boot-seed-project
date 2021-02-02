import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageExchange} from './message-exchange';

/** Where this application's globalConfiguration information is stored */
const configDefs = '/assets/config/config.json';

/** Global globalConfiguration information */
export const globalConfiguration: any = {
    apiUrl: undefined,
    adminUrl: undefined,
    protrackUrl: undefined,
    aquaUrl: undefined
};


@Injectable()
export class DataProvider {

    private readonly API_URL_DEV_FIELD = 'devApiUrl';
    private readonly ADMIN_URL_DEV_FIELD = 'devAdminUrl';
    private readonly API_URL_FIELD = 'apiUrl';
    private readonly ADMIN_URL_FIELD = 'adminUrl';

    constructor( private httpClient: HttpClient,
                 public mx: MessageExchange ) {
    }

    static logError(err ) {
        console.error( '>>> Data provider: error: ' + err );
    }

    fetchGlobalConfiguration(): void {

        console.log( '>>> fetchGlobalConfiguration() start' );
        let ourURL = document.URL;
        const hashCharIndex = ourURL.search('#');
        if (hashCharIndex > 0) {
            ourURL = ourURL.substring(0, hashCharIndex);
        }

        const lastSlash = ourURL.lastIndexOf('/');
        if (lastSlash > 0) {
            ourURL = ourURL.substring(0, lastSlash);
        }

        const configUrl = ourURL + configDefs;
        console.log( '>>> trying', configUrl );
        this.httpClient
            .get(configUrl)
            .toPromise()
            .then((res) => {

                console.log( '>>> OK:', configUrl );

                // Are we working in development mode? Which means, is the
                // front-end served by the Angular CLI?
                if (document.URL.indexOf('42') >= 0) {
                    // Our URL is something like localhost:4200 -- dev mode
                    globalConfiguration.apiUrl = res[this.API_URL_DEV_FIELD];
                    globalConfiguration.adminUrl = res[this.ADMIN_URL_DEV_FIELD];
                } else {
                    // Integration testing, or production mode -- the front-end
                    // is served by the Spring Boot application
                    globalConfiguration.apiUrl = res[this.API_URL_FIELD];
                    globalConfiguration.adminUrl = res[this.ADMIN_URL_FIELD];
                }

                this.mx.broadcastGlobalConfigAvailable();

            })
            .catch(error => console.error('GET ' + configUrl + ' failed: ' + JSON.stringify(error)));
    }

    fetchVersion(): Promise<any> {
        return this.httpClient.get(globalConfiguration.adminUrl + '/version').toPromise();
    }

    fetchCurrentTime(timezone: any): Promise<any> {
        const url = globalConfiguration.apiUrl + '/datetime?timezone=' + encodeURIComponent( timezone );
        return this.httpClient.get( url ).toPromise();
    }

    fetchTimezones(): Promise<any> {
        return this.httpClient.get(globalConfiguration.apiUrl + '/timezones')
            .toPromise();
    }

    fetchXmlFile(): Promise<any> {
        return this.httpClient.get('/assets/pom.xml', { responseType: 'text' }).toPromise();
    }
}
