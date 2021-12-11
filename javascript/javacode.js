function getHistory(){
    return document.getElementById("history-value").innerHTML;
}

function printHistory(num){
    document.getElementById("history-value").innerHTML=num;
}
// printHistory("9*9*9")

function getOutput(){
    return document.getElementById("output-value").innerHTML;
}

// For better readability comma , separated values 
//getformmatedNumber fun does that
function printOutput(num){
    // if empty then nothing otherwise show value
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    else{
        document.getElementById("output-value").innerHTML=getFormattedNumber(num);
    }
}
// printOutput("88878787878798");

function getFormattedNumber(num){
    //negative numbers with backspace creates problem
    if(num=="-"){
        return "";
    }
    var n=Number(num);
    var value=n.toLocaleString("en");
    return value;
}

//remove back comma for clear function to work
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

// USER INPUT 

//operators
var operator=document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        // alert("Operator clicked "+this.id);
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output=reverseNumberFormat(getOutput()).toString();
            // removing commas as it won't count as digit
            if(output){
                //if output as a value
                output=output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else {
            var output=getOutput();
            var history=getHistory();
            //for operator after operator case
            if(output=="" && history!=""){
                //check is that is not a number NaN
                if(isNaN(history[history.length-1])){
                    history=history.substr(0,history.length-1);
                }
            }

            if(output!="" || history!=""){
                //condition?true:false

                //if cond true first value is assigmed otherwise second value

                //here is prev and new output same 
                //then output = "" (empty)
                //otherwise number without comma
            output=output==""?
            output:reverseNumberFormat(output);
            // output=reverseNumberFormat(output);
            history=history+output;
            //prev value -prev value + operator
            if(this.id=="="){
            //if pressed "=" then no more calculation 
            //just show output and clear history
                var result=eval(history);
                printOutput(result);
                printHistory("");
                // printHistory(history);
            }
            //for all other operators just concatenate to history and print it
            //output will be empty till "=" pressed
            else{
                history=history+this.id;
                printHistory(history);
                printOutput("");
            }
        }
    }
    });
}

//numbers
var number=document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        // alert("Number clicked "+this.id);

        var output=reverseNumberFormat(getOutput());
        if(output!=NaN){
            output=output+this.id;
            printOutput(output);
        }
    })
}

