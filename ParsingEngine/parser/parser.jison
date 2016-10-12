/* description: Parses end evaluates if-then-else expressions. */

/* lexical grammar */
%lex
%%
\s+                   {/* skip whitespace */}
\"[^"]*\"             {return 'STR';}
\'[^']*\'             {return 'STR';}
[0-9]+("."[0-9]+)?\b  {return 'NUMBER';}
0x[0-9a-fA-F]+\b      {return 'HEX';}
(true|false)          {return 'BOOL';}
(null)                {return 'NULL';}
(undefined)           {return 'UNDEF';}
"-"                   {return '-'}
"("                   {return '(';}
")"                   {return ')';}
"{"                   {return '{';}
"}"                   {return '}';}
"@"                   {return '@';}
"=="                  {return 'EQ';}
"!="                  {return 'NEQ';}
"<"                   {return 'LT';}
">"                   {return 'GT';}
"<="                  {return 'LE';}
">="                  {return 'GE';}
"AND"                 {return 'AND';}
"OR"                  {return 'OR';}
"NAND"                {return 'NAND';}
"NOR"                 {return 'NOR';}
"if"                  {return 'IF';}
"then"                {return 'THEN';}
"else"                {return 'ELSE';}
<<EOF>>               {return 'EOF';}

/lex

/* operator associations and precedence */

%right '@'
%left AND OR NAND NOR
%left EQ NEQ LT GT LE GE
%left '(' ')' '{' '}'


%start body

%% /* language grammar */

body
: statement EOF
  { return $1; }
;

statement
  : selection-statement
    {$$ = $1;}
  | STR
    {$$ = $1.substring(1, $1.length - 1)} // remove quotes
  ;

selection-statement
  : IF '(' expr ')' statement
    {$$ = ($3 ? $5 : "");}
  | IF '(' expr ')' THEN statement
    {$$ = ($3 ? $6 : "");}
  | IF '(' expr ')' statement ELSE statement
    {$$ = ($3 ? $5 : $7);}
  | IF '(' expr ')' THEN statement ELSE statement
    {$$ = ($3 ? $6 : $8);}
  ;

expr
  : expr AND expr
    {$$ = $1==true && $3==true;} // have to coerce everything into a boolean, as the parser always sets everything as strings
  | expr OR expr
    {$$ = $1==true || $3==true;}
  | expr NAND expr
    {$$ = (!($1==true && $3==true))==true;}
  | expr NOR expr
    {$$ = (!($1==true || $3==true))==true;}
  | expr EQ expr
    {$$ = $1 == $3;}
  | expr NEQ expr
    {$$ = $1 != $3;}
  | expr LT expr
    {$$ = Number($1) < Number($3);} // have to coerce everything into number types as well
  | expr GT expr
    {$$ = Number($1) > Number($3);}
  | expr LE expr
    {$$ = Number($1) <= Number($3);}
  | expr GE expr
    {$$ = Number($1) >= Number($3);}
  | '(' expr ')'
    {$$ = $2;}
  | NUMBER
      {$$ = Number($1);}
  | '-' NUMBER
      {$$ = Number($);}
  | HEX
      {$$ = Number($1);}
  | BOOL
      {$$ = ($1 === "true");} // for whatever weird reason, JavaScript does not coerce the string 'false' into false
  | NULL
      {$$ = null;}
  | UNDEF
      {$$ = undefined;}
  | STR
      {
        var stringValue = $1.substring(1, $1.length - 1);
        if (Number(stringValue) !== null) {
          $$ = Number(stringValue); // cast to number, if possible
        } else if (stringValue === 'true') { // cast to boolean, if possible
          $$ = true;
        } else if (stringValue === 'false') {
          $$ = false;
        } else if (stringValue === 'null') { // cast to null, if possible
          $$ = null;
        } else if (stringValue === 'undefined') { // cast to undefined, if possible
          $$ = undefined;
        }
        $$ = stringValue;
      }
  ;