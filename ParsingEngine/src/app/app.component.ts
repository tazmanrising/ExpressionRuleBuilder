import { Component } from '@angular/core';
import { EvaluatorService } from "./evaluator.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent {
    ifThenExpression: string = 'if (@{Age} == "11" AND @{SeniorContent} == "12") ' +
        '"1\\26\\Asset\\amCharts.jpg" else if (@{SeniorContent} == "44")  ' +
        '"1\\27\\Asset\\amCharts.jpg" else  "1\\102\\Asset\\SampleRL.mdb"';
    inputVal: string = '[ {"Age": 20}, { "SeniorContent":"asd"} ]';
    result: string;
    pageTitle: string = "Expression Evaluator";


    constructor(private evaluator: EvaluatorService) {
    }

    evaluateExpression() {
        this.result = this.evaluator.evaluate(this.ifThenExpression, this.inputVal);
    }
}
