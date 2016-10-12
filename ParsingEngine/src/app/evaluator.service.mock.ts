/**
 * Created by Jamie on 2016-09-23.
 */

export class EvaluatorServiceMock {
    expression: string;
    input: string;
    private retVal: string;

    evaluate(expression: string, inputVariable: string) {
        this.expression = expression;
        this.input = inputVariable;
        return this.retVal;
    }

    reset() {
        this.expression = null;
        this.input = null;
        this.retVal = null;
    }

    returns(result: string) {
        this.retVal = result;
    }
}