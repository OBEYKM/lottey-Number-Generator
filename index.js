
const MIN = 1;
const MAX = 56;

const MIN_RANGE=80;
const MAX_RANGE=163;

var j1;
var j2;
var j3;
var j4;


var btnJ1 = document.querySelector("#j1");
var btnJ2 = document.querySelector("#j2");
var btnJ3 = document.querySelector("#j3");
var btnJ4 = document.querySelector("#j4");
var load = document.querySelector("#loading");


function test(){
    alert(
        18387%2
    )
}

function generateLuckyNumber(){


    load.innerHTML="please wait ;)  ,  loading your luck number...";
    load.style.visibility="visible";
 
  
    restart();
        
    while(outRange() || !hasOdd()){
        restart();
        console.log("regenerating the numbers");
    }

    displayNumberGenerated();
    
   

    load.innerHTML="Done , get your luck number!";
    
    // setTimeout(() => {
    //     load.style.visibility="hidden";
    // }, 2500);

    setTimeout(() => {
        load.innerHTML="didnt like the numbers , dont worry ! <br> just press Generate button again!";
    }, 2700);
    
   
}

function hasOdd(){

    console.log("methos hasOdd got called");

    var nOdd = 0;

    if(j1%2!=0){
        nOdd++;
    }

    if(j2%2!=0){
        nOdd++;
    }

    if(j3%2!=0){
        nOdd++;
    }

    if(j4%2!=0){
        nOdd++;
    }

    console.log("nOdd = "+nOdd);

    if(nOdd==1 || nOdd==0){
        console.log("Found few odd number , not suitable to use it!")
        return false;
    }

    return true; 
}

function restart(){
    j1=0;
    j2=0;
    j3=0;
    j4=0;

 


    
    j1=getNumber();

    while(j1>=15){

        j1=getNumber();

    }


  
    var out=true;

    while(out){
        j2=getNumber();
        // alert("j2 number = "+j2);
        if(j2>=15 && j2<=28){
            out=false;
          
        }


    }



    out=true;

    while(out){
        j3=getNumber();
        // alert("j2 number = "+j2);
        if(j3>=29 && j3<=42){
            out=false;
          
        }

       
    }


    out=true;

    while(out){
        j4=getNumber();
        if(j4>=42 && j4<=56){
            out=false;
        }
    }

}






function getNumber(){


    var n;

    n = Math.random()*MAX;
    n = n+1;
    n = Math.floor(n);

    // alert("Number generated = "+n);

    return n;
    

}


function outRange(){

    sum = j1+j2+j3+j4;

    // displayNumberGenerated();

    if(sum>=MIN_RANGE && sum<=MAX_RANGE){

        // alert("number in range   sum="+sum);
        return false;
    }

    console.log("Total sum of number out of range   sum="+sum);
    return true;

}


function displayNumberGenerated(){
    btnJ1.innerHTML=j1;
    btnJ2.innerHTML=j2;
    btnJ3.innerHTML=j3;
    btnJ4.innerHTML=j4;

}