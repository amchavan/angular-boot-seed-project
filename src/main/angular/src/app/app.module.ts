import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header/page-header.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainButtonGroupComponent } from './main-button-group/main-button-group.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageExchange } from './message-exchange';
import { DataProvider } from './data-provider';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';

@NgModule({
    declarations: [
        AppComponent,
        PageHeaderComponent,
        EntryFormComponent,
        MainButtonGroupComponent,
        ErrorBoxComponent,
        SimpleTreeComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        NgbActiveModal,
        HttpClientModule,
        MessageExchange,
        DataProvider,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }

    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EntryFormComponent,
        ErrorBoxComponent,
    ]
})
export class AppModule { }
