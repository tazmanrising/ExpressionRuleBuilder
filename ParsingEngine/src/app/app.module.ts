import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PARSER, EvaluatorService } from "./evaluator.service";

var parser;
try {
    parser = require('./parser');
} catch (error) {
    console.error("Failed to load parser - try npm run build:parser first.");
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        EvaluatorService,
        {provide: PARSER, useValue: parser.parser}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}