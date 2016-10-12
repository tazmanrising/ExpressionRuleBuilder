/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EvaluatorService } from "./evaluator.service";
import { EvaluatorServiceMock } from "./evaluator.service.mock";

describe('App: RuleEvaluator', () => {
    let evaluatorMock: EvaluatorServiceMock = new EvaluatorServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                {provide: EvaluatorService, useValue:evaluatorMock}
            ]
        });
    });

    afterEach(() => {
        evaluatorMock.reset();
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('Should pass the expression to the evaluator', function() {
        let component = TestBed.createComponent(AppComponent).componentInstance;
        component.ifThenExpression = "expression";
        component.evaluateExpression();
        expect(evaluatorMock.expression).toEqual("expression");
    });

    it('Should pass the input variable to the evaluator', function() {
        let component = TestBed.createComponent(AppComponent).componentInstance;
        component.inputVal = "input";
        component.evaluateExpression();
        expect(evaluatorMock.input).toEqual("input");
    });

    it('Should output the result to the result field', function() {
        let component = TestBed.createComponent(AppComponent).componentInstance;
        evaluatorMock.returns("result");
        component.evaluateExpression();
        expect(component.result).toEqual("result");
    });
});
