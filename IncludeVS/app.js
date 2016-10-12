var EvaluateExpression = (function () {
    function EvaluateExpression(expression, variable) {
        this.expression = expression;
        this.variable = variable;
    }
    EvaluateExpression.prototype.isIfStatement = function (statement) {
        var pattern = new RegExp('(if)*.*(then)');
        return pattern.test(statement);
    };
    EvaluateExpression.prototype.evaluateExpression = function () {
        if (this.isIfStatement(this.expression)) {
            var token = this.expression.replace('if', '').replace('then', '').replace('x', this.variable).trim();
            this.expressionState = eval(token);
        }
        else {
            this.expressionState = 'Invalid Expression';
        }
        console.log(this.expressionState);
    };
    return EvaluateExpression;
}());
window.onload = function () {
    //var evalExp = new EvaluateExpression('if x == 2 then', '3');
    //evalExp.evaluateExpression();
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
};
//# sourceMappingURL=app.js.map