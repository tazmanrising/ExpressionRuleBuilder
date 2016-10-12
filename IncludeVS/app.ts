
class EvaluateExpression {

    expression: string;
    variable: string;
    expressionState: string;


    constructor(expression: string, variable: string) {
        this.expression = expression;
        this.variable = variable;
    }

    isIfStatement(statement: string) {
        var pattern = new RegExp('(if)*.*(then)');
        return pattern.test(statement);
    }

    evaluateExpression() {
        if (this.isIfStatement(this.expression)) {
            var token = this.expression.replace('if', '').replace('then', '').replace('x', this.variable).trim();
            this.expressionState = eval(token);
        }
        else {
            this.expressionState = 'Invalid Expression';
        }

        console.log(this.expressionState);
    }


}

window.onload = () => {
    //var evalExp = new EvaluateExpression('if x == 2 then', '3');
    //evalExp.evaluateExpression();

    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
};