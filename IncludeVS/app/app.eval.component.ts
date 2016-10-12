import { Component } from '@angular/core';
@Component({
    selector: 'eval-app',
    templateUrl: 'app/evals/eval.form.component.html'
})
export class AppEvalComponent {
    ifThenExpression: string = 'if (isNotNull(@{B})) then \"yes\" else \"no\"';
    result: string;
    pageTitle: string = 'Evaluate Expression';
    inputVal: string = '[{A: "asd"}, {B : "d"}]'

    isIfStatement(statement: string) {
        var pattern = new RegExp('(if)*.*(then)','i');
        return pattern.test(statement);
    }


    evaluateExpression(): void {
        if (this.isIfStatement(this.ifThenExpression)) {
            let result:any = this.getSpecialExpression()
            try{

                let value = eval(result.expression)                                
                if(value){
                    this.result = result.positive
                }
                else{
                    this.result = result.negative
                }
            }
            catch(e){
                console.log(e);
                this.result = 'Invalid Expression'
            }
        }
        else {
            console.log('else');
            this.result = 'Invalid Expression';
        }
    }

    sanitizeVariable(variable){
        return eval('(' + variable + ')');
    }

    getPositiveValue(){
        let values = /then(.*?)else/i.exec(this.ifThenExpression)
        return values[1].trim()
    }

    getNegativeValue(){
        return this.ifThenExpression.split('else').pop()
    }

    getSpecialExpression(){
        let vars = this.sanitizeVariable(this.inputVal)
        let _expression:string = /\(([^)]*)\)*/.exec(this.ifThenExpression)[0]
        console.log(_expression)
        _expression = _expression.replace(' AND ', ' && ')
        _expression = _expression.replace(' OR ', ' || ')
        _expression = _expression.replace(/BeginsWith/g,'.startsWith')
        _expression = _expression.replace(/EndsWith/g,'.endsWith')
        _expression = _expression.replace(/Contains/g,'.includes')
        _expression = _expression.replace(/isNotNull/g,'\'null\' != ')
        
        console.info(_expression);
        for(let i=0; i < vars.length; i++){
            for(let key in vars[i]){
                _expression = _expression.replace('@{'+key+'}', '"' + vars[i][key] + '"')
            }
        }
        let _positive = this.getPositiveValue()
        let _negative = this.getNegativeValue()
         console.info("final exp",_expression);
        return {
            expression : _expression,
            positive : _positive,
            negative : _negative
        }
    }
}