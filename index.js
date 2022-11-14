


const MIN = 1;
const MAX = 56;

const frequencyNumber = 1;
const lotNumber = 0; 

var hotTrack=0;

var MIN_RANGE;
var MAX_RANGE;

var j1;
var j2;
var j3;
var j4;

var data;
var datapool;
var dataHot;

var message = document.querySelector("#message");


const BALANCED_WEIGHT = "balanced-weight";
const HOT_NUMBER = "hot-numbers";


var algorithmOption = document.querySelectorAll(".algorithm");


var btnJ1 = document.querySelector("#j1");
var btnJ2 = document.querySelector("#j2");
var btnJ3 = document.querySelector("#j3");
var btnJ4 = document.querySelector("#j4");

var load = document.querySelector("#loading");

var baseLot = document.querySelector("#baseLot");
var maxBaseLot = document.querySelector("#maxBaseLot");
var messageBaseLot = document.querySelector("#messageBaseLot");


var sum = [];

const maxHotNumber = 10;
const maxMinNumber = 10; 


loadData();





function generateType(){


    var option = null;


    console.log("Base lot is   =   "+ baseLot.value);

    // check if value of base lot given from user does not exceed database lot

    if(baseLot.value > data.length || baseLot.value < 4){

        messageBaseLot.innerHTML = " <b style='color: #00FFDD; width:60%' >  Please digit a number that is lower than or equal  "+ data.length +" and must be grater than 3 </b>";

        setTimeout(() => {
            messageBaseLot.innerHTML ="";
        }, 5000);

        return;

    }

    //end


   


    console.log(".........................loading option avalable.............................");

    for(const type of algorithmOption){


        
               console.log(type.value);

              //   finding radio button that is selected

             if(type.checked){
                   console.log("algorithm selected :  " + type.value);
                   option = type.value;
              }
    }

    ///// to generate based on algorithm selected !

    switch(option){


        case BALANCED_WEIGHT:
            console.log("generating balanced weight numbers..................");
            poolData();
            generateBalanceWeightNumbers();
        break;

        case HOT_NUMBER:
            poolData();
            generateHotnumbers();
        break;

        default:
            message.innerHTML = " <u style='color:red' >  please choose an algorithm !  </u> ";

            setTimeout(() => {
                message.innerHTML = "Please choose type of algarithm to generate your lucky number";
            }, 1500);

        break;

      }

}


function test(){
    alert(
        "sum of 05+05="+(05+05)
    )
}



function generateBalanceWeightNumbers(){


    clearNumberGenerated();


    load.innerHTML="please wait ;)  ,  loading your luck number...";
    load.style.visibility="visible";
 
  
    restart();
        
    while(outRange() || !hasOdd()){
        restart();
        console.log("regenerating the numbers");
    }


   

   setTimeout(() => {

    
    displayNumberGenerated();
    
    load.innerHTML="Done , get your luck number and good luck!";
    
    // setTimeout(() => {
    //     load.innerHTML="didnt like the numbers , dont worry ! <br> just press Generate button again!";
    // }, 2100);

   }, 1500);
    
   
}

function generateHotnumbers(){


    var nRange  = findHotNumber();

    printArray(nRange
        ,"***********nRange got to perform hot numbers algorithm***********"
    ,"**********end of show hot number algorithm**************");


    /// re-order ascending order based on frequency number



    var temp = 0;
    var tempCurrent;
    var tempNext;


    console.log("nRange  =  "+nRange.length);

    for( var current = 0 ; current < nRange.length; current++){

        for( var next = 0 ; next < nRange.length ; next++ ){

            tempCurrent  = nRange[current];
            tempNext = nRange[next];

            // console.log("TempCurrent =  "+nRange[current]);
            // console.log("NextCurrent =  "+nRange[next]);

            if(tempCurrent[frequencyNumber] > tempNext[frequencyNumber]){
                console.log("Switching "+tempCurrent[frequencyNumber]+" with "+tempNext[frequencyNumber]);
                temp = tempNext;
                nRange[next] = nRange[current];
                nRange[current] = temp;
            }

        }

    }


    printArray(nRange , " ********************* after re-ordering nRange ************************" , 
    "********************** end after re-ordering nRange********************");

    hotTrack=0;
    dataHot = nRange;
    showHotNumbers(nRange);




}

function showHotNumbers(array){


        j1 = array[hotTrack][lotNumber];
        j2 = array[++hotTrack][lotNumber];
        j3 = array[++hotTrack][lotNumber];
        j4 = array[++hotTrack][lotNumber];
        hotTrack++;
  

    displayNumberGenerated();

}

function displayNext4HotNumbers(){


    if(hotTrack<=55){
        j1 = dataHot[hotTrack][lotNumber];
    }else{
        // j1 = -1;
    }

    if(hotTrack<=55){
        j2 = dataHot[++hotTrack][lotNumber];
    }else{
        // j2 = -1;
    }

    if(hotTrack<=55){
        j3 = dataHot[++hotTrack][lotNumber];
    }else{
        // j3 = -1;
    }
      

    if(hotTrack<=55){
        j4 = dataHot[++hotTrack][lotNumber];
    }else{
        // j4 = -1;
    }      
     

    displayNumberGenerated();


    if(hotTrack>=56){
        hotTrack=55;
        return;
    }else{
        hotTrack++;
    }

   
    console.log("hot track next = " + hotTrack);
}


function inHotTrack(order){

    switch(order){

        case 1 :
            if(hotTrack>55){
                return false;
            }else{
                return true;
            }
        break;

        case 2 :
            if(hotTrack<0){
                return false;
            }else{
                return true;
            }
        break;

    }
  
}

function displayPrev4HotNumbers(){
 
    //     j1 = dataHot[hotTrack][lotNumber];
    //     j2 = dataHot[--hotTrack][lotNumber];
    //     j3 = dataHot[--hotTrack][lotNumber];
    //     j4 = dataHot[--hotTrack][lotNumber];
    //     hotTrack--;

    // displayNumberGenerated();

    if(hotTrack>=0){
        j1 = dataHot[hotTrack][lotNumber];
    }else{
        j1 = 00;
    }

    if(hotTrack>=0){
        j2 = dataHot[--hotTrack][lotNumber];
    }else{
        j2 = 00;
    }

    if(hotTrack>=0){
        j3 = dataHot[--hotTrack][lotNumber];
    }else{
        j3 = 00;
    }
      

    if(hotTrack>=0){
        j4 = dataHot[--hotTrack][lotNumber];
    }else{
        j4 = 00;
    } 
    
    
        displayNumberGenerated();


    

    if(hotTrack<=-1){
        hotTrack = 0
        return;
    }else{
        hotTrack--;
    }

    console.log("hot track prev =" + hotTrack);

}

function printArray(array , startMesaage  , endMessage){

    console.log(startMesaage);

    for(const obj of array){
        console.log(obj);
    }

    console.log(endMessage);


}

function hasOdd(){

    // console.log("methos hasOdd got called");

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

    if(nOdd==1){
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


1

function clearNumberGenerated(){
    btnJ1.innerHTML="00";
    btnJ2.innerHTML="00";
    btnJ3.innerHTML="00";
    btnJ4.innerHTML="00";
}

function displayNumberGenerated(){
    btnJ1.innerHTML=j1;
    btnJ2.innerHTML=j2;
    btnJ3.innerHTML=j3;
    btnJ4.innerHTML=j4;

}

function loadData(){

    console.log("loading data...");

    datapool = new Array();

       data =  [
        [52,54,56,45],[53,31,54,05],[01,12,02,10],[41,23,12,17],[26,43,32,41],[26,43,32,41],[41,23,12,17],[53,31,54,05],[05,09,41,31],
        [10,30,01,12],[17,16,11,53],[43,11,05,39],[35,20,13,38],[55,32,43,03],[54,15,45,03],[12,47,15,29],[33,18,09,27],[55,27,50,36],
        [34,28,38,53],[21,38,01,10],[33,43,25,32],[40,01,37,23],[09,53,11,46],[56,52,44,04],[24,43,54,21],[01,12,02,10],[53,01,38,25],
        [03,23,42,18],[26,49,03,04],[24,19,35,33],[56,36,23,19],[52,54,56,45],[22,06,47,02],[13,33,48,12],[14,27,12,32],[26,02,43,50],
        [53,11,44,41],[26,41,04,48],[39,36,22,55],[33,10,03,27],[37,06,25,53],[42,12,08,31],[33,47,48,35],[51,44,46,50],[14,42,18,19],
        [20,16,03,14],[02,06,01,39],[32,48,07,16],[04,25,51,14],[45,43,32,06],[48,25,32,24],[03,13,36,16],[47,49,54,53],[08,48,03,33],
        [56,03,40,32],[17,52,51,43],[04,37,26,39],[27,09,23,40],[46,55,09,15],[48,08,04,42],[08,05,26,34],[03,22,14,16],[08,24,47,41],
        [26,39,49,38],[10,42,33,30],[25,11,27,49],[35,06,38,14],[52,16,01,27],[55,23,10,11],[15,04,23,07],[06,47,24,14],[35,55,20,44],
        [02,47,06,10],[26,17,12,22],[41,34,48,12],[54,43,53,47],[18,31,20,14],[17,30,28,42],[50,44,04,43],[33,18,28,02],[25,08,46,12],
        [25,08,46,12],[28,33,26,21],[18,56,22,04],[44,03,51,14],[53,16,06,31],[34,32,37,22],[05,18,09,36],[15,26,49,36],[56,21,27,24],
        [19,05,14,33],[34,45,10,24],[41,11,12,31],[21,03,47,10],[16,56,55,49],[35,52,44,49],[10,13,56,14],[03,29,22,23],[10,14,56,32],
        [43,53,27,46],[26,24,21,13],[21,05,11,14],[08,56,52,11],[14,35,31,54],[12,45,11,14],[20,04,27,22],[30,52,24,46],[41,26,18,32],
        [27,03,53,22],[04,22,07,50],[36,38,45,05],[36,37,47,30],[16,19,51,14],[35,10,40,21],[25,34,37,20],[28,16,26,13],[36,04,14,20],
        [39,10,50,11],[09,43,15,49],[52,31,42,34],[24,08,04,41],[07,48,28,52],[11,13,32,47],[24,06,39,42],[47,40,53,36],[19,30,18,43],
        [21,56,40,47],[49,28,38,35],[11,13,32,47],[24,06,39,42],[47,40,53,36],[19,30,18,43],[21,56,40,47],[49,28,38,35],[39,10,50,11],
        [09,43,15,49],[52,31,42,34],[24,08,04,41],[07,48,28,52],[05,18,33,15],[33,19,43,21],[07,10,19,42],[06,22,26,28],[48,01,09,32],
        [05,30,32,40],[21,23,37,08],[30,33,03,35],[02,41,40,05],[28,10,12,08],[36,22,32,31],[26,31,12,01],[23,28,45,21],[36,15,40,01]
        
       ];



      


      

    //    console.log(data[0]);

    //    var j = data[0,0];

    //    console.log("number : "+j);


    //////////////////////////////

    for(const d of data){
        console.log(d);
    }

    console.log("Total number of lottery :  " + data.length);
    maxBaseLot.innerHTML = " <b style='color: #00FFDD; margin-left : 0.2rem;'> <u>  MAX : "+ data.length +"</u> </b> ";
    console.log("................finished loading all lottery numbers................");

    // addAllLotteryNumber();

    // findMinSumNumber();
    // findMaxSumNumber();

    // findHotNumber();

}


function poolData(){
    console.log("Obtaining "+baseLot.value+" lottery numbers for generating numbers based on choosen algorithm.......");

    datapool = new Array();

    var index = data.length-1;

    for( var i=0; i<baseLot.value; i++){

     datapool.push(data[index]);
     index--;
    }


    console.log("*****************************Data pool*************************************");

    for( const d of datapool ){
        console.log(d);
    }

    console.log("*****************************end Data pool*************************************");

    console.log("Done pulling "+baseLot.value+" from database lot ......................");

    addAllLotteryNumber();

    findMinSumNumber();
    findMaxSumNumber();

    findHotNumber();

}

function findHotNumber(){


    var nRage = [
        [1,0],
        [2,0]
    ];

    for( var i=MIN+2; i<=MAX; i++){

        nRage.push([i,0]);

    }






    console.log("....................nRange....................");


    for(const n of nRage){
        console.log(n);
    }


    console.log("............................................");

 

    for(const lot of nRage){

        for(const n of datapool){

            for(var i=0; i<n.length; i++){

                if(lot[lotNumber]==n[i]){


                    console.log("found a match of "+lot[lotNumber]+" == "+n[i]);

                    lot[frequencyNumber]++;


                }


            }

        }

    

    }

    console.log("....................nRange after adding frequency....................");


    var numRange = 0;
    for(var n of nRage){
        console.log(n);
        numRange+=n[frequencyNumber];
    }


    console.log("--------------------------------------------------------------------");

    console.log("Adding all frequency (numbers available)   =  "+numRange);


    console.log("............................................");

    var maxfr=0;
    var max=0;

    for(var i=0; i<nRage.length; i++){

        var checkNum = nRage[i];

        // console.log("Checking max with = "+checkNum[frequencyNumber]);

        console.log("checking "+maxfr+" < "+checkNum[frequencyNumber]);

        console.log(checkNum);


            if(maxfr < checkNum[frequencyNumber]){


                // console.log("attributing maxfr = "+checkNum[frequencyNumber]);
                maxfr =  checkNum[frequencyNumber];
                max =  checkNum[lotNumber];


            }
 
        
    }

    console.log("Hot Number is  = "+max);

    return nRage;

}


function findMinSumNumber(){


    var min;

    min = sum[1];

        for( var i=0 ; i<sum.length ; i++){


            if(min>sum[i]){
                min = sum[i];
            }


        }


    console.log("..........................summation of each lottery...........................");
    console.log(".");


    console.log("...............................MIN VALUE..............................");

    for(const s of sum){
        console.log(s);
    }

    console.log("total number of sum lottery  :  " + sum.length);
    console.log("Min value   :   " + min);

    MIN_RANGE = min;

    console.log("..........................................");



}


function addAllLotteryNumber(){

    var temp=0;
    sum = new Array();

    for(let lottery of datapool){

        temp=0;

        for( var i=0 ; i<lottery.length ; i++ ){

            temp+=lottery[i];

        }

        sum.push(temp);

    }


}


function findMaxSumNumber(){
   
    var max;

    max = sum[1];

        for( var i=0 ; i<sum.length ; i++){


            if(max<sum[i]){
                max = sum[i];
            }


        }


        console.log("...............................MAX VALUE..............................");

    console.log("total number of sum lottery  :  " + sum.length);
    console.log("Max value   :   " + max);

    MAX_RANGE = max;

    console.log("..........................................");
 

}
