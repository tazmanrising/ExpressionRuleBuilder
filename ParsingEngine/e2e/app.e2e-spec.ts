import { RuleEvaluatorPage } from './app.po';

describe('rule-evaluator App', function() {
  let page: RuleEvaluatorPage;

  beforeEach(() => {
    page = new RuleEvaluatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
