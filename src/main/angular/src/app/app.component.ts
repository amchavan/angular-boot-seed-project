import {Component, OnInit} from '@angular/core';
import { DataProvider } from './data-provider';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(public dataProvider: DataProvider) {
        // no-op
    }

    ngOnInit(): void {
        this.fetchAllStartupInfo();
    }

    // Fetch all startup information from the backend server
    async fetchAllStartupInfo() {
        // Fetch global configuration information
        this.dataProvider.fetchGlobalConfiguration();
    }
}
