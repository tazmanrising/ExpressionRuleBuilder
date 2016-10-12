/**
 * Created by Jamie on 2016-09-23.
 */
import { Inject, Injectable, OpaqueToken } from '@angular/core';

export let PARSER = new OpaqueToken('parser');

@Injectable()
export class EvaluatorService {
    private parser:any;

    constructor(@Inject(PARSER) parser: any) {
        this.parser = parser;
    }

    evaluate(expression: string, value: string) : string {
        try {
            var input = JSON.parse(value);
        } catch (error) {
            return "input must be valid JSON";
        }
        input.forEach(item => {
            for (let key in item) {
                expression = expression.replace(new RegExp('@{'+key+'}', 'g'), '"' + item[key] + '"')
            }
        });
        expression = expression.replace(/@{[^}]*}/g, 'undefined');
        console.log(expression);
        try {
            return this.parser.parse(expression);
        } catch(error) {
            return "Expression is not valid";
        }
    }
}