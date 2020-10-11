import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageExchange} from "./message-exchange";

/** Where this application's globalConfiguration information is stored */
const configDefs = '/assets/config/config.json';

/** Global globalConfiguration information */
export const globalConfiguration: any = {
    api_url: undefined,
    admin_url: undefined,
    protrack_url: undefined,
    aqua_url: undefined
};


@Injectable()
export class DataProvider {

    private readonly API_URL_DEV_FIELD = 'api_url_dev';
    private readonly ADMIN_URL_DEV_FIELD = 'admin_url_dev';
    private readonly API_URL_FIELD = 'api_url';
    private readonly ADMIN_URL_FIELD = 'admin_url';

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
                    globalConfiguration.api_url = res[this.API_URL_DEV_FIELD];
                    globalConfiguration.admin_url = res[this.ADMIN_URL_DEV_FIELD];
                }
                else {
                    // Integration testing, or production mode -- the front-end
                    // is served by the Spring Boot application
                    globalConfiguration.api_url = res[this.API_URL_FIELD];
                    globalConfiguration.admin_url = res[this.ADMIN_URL_FIELD];
                }

                this.mx.broadcastGlobalConfigAvailable();

            })
            .catch(error => console.error('GET ' + configUrl + ' failed: ' + JSON.stringify(error)));
    }

    fetchVersion() : Promise<Object> {
        return this.httpClient.get(globalConfiguration.admin_url + '/version').toPromise();
    }

    fetchCurrentTime(timezone: any): Promise<Object> {
        return this.httpClient.get(globalConfiguration.api_url + '/datetime?timezone=' + timezone ).toPromise();
    }

    fetchTimezones(): Promise<Object> {
        return this.httpClient.get(globalConfiguration.api_url + '/timezones').toPromise();
    }
}
