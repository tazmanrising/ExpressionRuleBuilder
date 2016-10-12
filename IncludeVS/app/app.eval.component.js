"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppEvalComponent = (function () {
    function AppEvalComponent() {
        this.ifThenExpression = 'if (isNotNull(@{B})) then \"yes\" else \"no\"';
        this.pageTitle = 'Evaluate Expression';
        this.inputVal = '[{A: "asd"}, {B : "d"}]';
    }
    AppEvalComponent.prototype.isIfStatement = function (statement) {
        var pattern = new RegExp('(if)*.*(then)', 'i');
        return pattern.test(statement);
    };
    AppEvalComponent.prototype.evaluateExpression = function () {
        if (this.isIfStatement(this.ifThenExpression)) {
            var result = this.getSpecialExpression();
            try {
                var value = eval(result.expression);
                if (value) {
                    this.result = result.positive;
                }
                else {
                    this.result = result.negative;
                }
            }
            catch (e) {
                console.log(e);
                this.result = 'Invalid Expression';
            }
        }
        else {
            console.log('else');
            this.result = 'Invalid Expression';
        }
    };
    AppEvalComponent.prototype.sanitizeVariable = function (variable) {
        return eval('(' + variable + ')');
    };
    AppEvalComponent.prototype.getPositiveValue = function () {
        var values = /then(.*?)else/i.exec(this.ifThenExpression);
        return values[1].trim();
    };
    AppEvalComponent.prototype.getNegativeValue = function () {
        return this.ifThenExpression.split('else').pop();
    };
    AppEvalComponent.prototype.getSpecialExpression = function () {
        var vars = this.sanitizeVariable(this.inputVal);
        var _expression = /\(([^)]*)\)*/.exec(this.ifThenExpression)[0];
        console.log(_expression);
        _expression = _expression.replace(' AND ', ' && ');
        _expression = _expression.replace(' OR ', ' || ');
        _expression = _expression.replace(/BeginsWith/g, '.startsWith');
        _expression = _expression.replace(/EndsWith/g, '.endsWith');
        _expression = _expression.replace(/Contains/g, '.includes');
        _expression = _expression.replace(/isNotNull/g, '\'null\' != ');
        console.info(_expression);
        for (var i = 0; i < vars.length; i++) {
            for (var key in vars[i]) {
                _expression = _expression.replace('@{' + key + '}', '"' + vars[i][key] + '"');
            }
        }
        var _positive = this.getPositiveValue();
        var _negative = this.getNegativeValue();
        console.info("final exp", _expression);
        return {
            expression: _expression,
            positive: _positive,
            negative: _negative
        };
    };
    AppEvalComponent = __decorate([
        core_1.Component({
            selector: 'eval-app',
            templateUrl: 'app/evals/eval.form.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppEvalComponent);
    return AppEvalComponent;
}());
exports.AppEvalComponent = AppEvalComponent;
//# sourceMappingURL=app.eval.component.js.map