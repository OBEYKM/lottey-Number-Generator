


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

var flowBtns = document.querySelectorAll(".flowBtn");


var sum = [];

const maxHotNumber = 10;
const maxMinNumber = 10; 


loadData();

hideItems();


function hideItems(){
    
    flowBtns.forEach(btn => {
        
        btn.style.visibility = "hidden";

    });

}


function showItems(){

    flowBtns.forEach(btn => {
        
        btn.style.visibility = "visible";

    });


}





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
            hideItems();
        break;

        case HOT_NUMBER:
            poolData();
            generateHotnumbers();
            showItems();
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
    displayNext4HotNumbers();




}


function displayNext4HotNumbers(){


    console.log("hot track next before = " + hotTrack);

    if(hotTrack<0){
        hotTrack = 0;
    }

    if(hotTrack<55){
        // console.log("CtB = "+hotTrack);
        j1 = dataHot[hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
    }else{
        // j1 = -1;
    }

    if(hotTrack<55){
        // console.log("CtB = "+hotTrack);
        j2 = dataHot[++hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
    }else{
        // j2 = -1;
    }

    if(hotTrack<55){
        // console.log("CtB = "+hotTrack);
        j3 = dataHot[++hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
    }else{
        // j3 = -1;
    }
      

    if(hotTrack<55){
        // console.log("CtB = "+hotTrack);
        j4 = dataHot[++hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
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

   
    console.log("hot track next after = " + hotTrack);
}




function displayPrev4HotNumbers(){
 
    //     j1 = dataHot[hotTrack][lotNumber];
    //     j2 = dataHot[--hotTrack][lotNumber];
    //     j3 = dataHot[--hotTrack][lotNumber];
    //     j4 = dataHot[--hotTrack][lotNumber];
    //     hotTrack--;

    // displayNumberGenerated();
    console.log("hot track prev before =" + hotTrack);

    if(hotTrack>55){
        hotTrack = 55;
    }

    if(hotTrack>0){
        // console.log("CtB = "+hotTrack);
        j1 = dataHot[hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
    }else{
        j1 = 00;
    }

    if(hotTrack>0){
        // console.log("CtB = "+hotTrack);
        j2 = dataHot[--hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
    }else{
        j2 = 00;
    }

    if(hotTrack>0){
        // console.log("CtB = "+hotTrack);
        j3 = dataHot[--hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
    }else{
        j3 = 00;
    }
      

    if(hotTrack>0){
        // console.log("CtB = "+hotTrack);
        j4 = dataHot[--hotTrack][lotNumber];
        // console.log("CtA = "+hotTrack);
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

    console.log("hot track prev after =" + hotTrack);

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
        [05,30,32,40],[21,23,37,08],[30,33,03,35],[02,41,40,05],[28,10,12,08],[36,22,32,31],[26,31,12,01],[23,28,45,21],[36,15,40,01],
        [36,34,31,43],[01,02,15,43],[34,05,48,42],[03,25,04,02],[08,05,32,18],[46,12,14,33],[06,25,48,12],[08,48,36,09],[45,42,32,26],
        [04,27,28,31],[06,08,24,46],[40,17,12,22],[45,11,31,15],[22,48,13,42],[48,18,23,26],[17,23,20,25],[12,11,42,46],[18,15,13,45],
        [09,05,33,16],[22,31,48,16],[46,22,29,15],[45,15,01,19],[40,19,47,27],[36,10,30,21],[31,39,48,20],[21,10,40,32],[43,21,18,34],
        [39,31,08,10],[16,04,34,12],[20,02,08,03],[12,43,44,38],[38,01,37,35],[38,06,39,40],[14,20,42,07],[16,24,21,27],[41,10,47,36],
        [30,13,40,42],[08,12,20,45],[40,26,01,29],[15,23,14,12],[14,02,42,32],[05,26,45,21],[02,24,29,38],[48,17,09,16],[32,25,33,07],
        [47,13,25,15],[29,23,38,48],[13,41,12,28],[19,34,37,33],[42,45,09,16],[41,35,27,04],[41,18,15,31],[09,23,11,01],[37,36,24,44],
        [37,25,01,18],[47,44,18,16],[27,23,21,28],[29,01,07,19],[08,40,47,05],[40,11,07,23],[17,06,37,23],[45,34,05,08],[32,03,07,34],
        [42,43,40,34],[26,09,33,27],[02,39,46,23],[28,30,43,26],[33,22,03,31],[04,25,17,33],[05,40,47,22],[15,08,11,42],[20,39,12,28],
        [03,40,05,38],[17,44,03,47],[04,33,06,10],[32,25,06,19],[30,44,20,23],[09,18,27,39],[16,22,32,40],[41,34,18,38],[19,26,21,36],
        [41,17,47,34],[31,07,25,42],[46,37,48,22],[08,22,13,41],[30,25,32,44],[39,24,42,06],[39,25,36,17],[45,08,43,23],[14,10,45,22],
        [12,34,16,15],[17,21,36,43],[27,33,44,41],[26,46,07,34],[41,17,14,09],[05,13,21,25],[44,30,07,43],[03,16,42,45],[40,35,26,48],
        [02,04,03,40],[15,02,39,30],[10,36,47,18],[23,33,10,04],[45,35,19,33],[27,05,44,39],[19,41,06,44],[45,03,28,15],[03,45,36,47],
        [12,13,41,15],[42,02,29,14],[08,43,17,28],[08,10,44,46],[17,20,34,40],[04,14,18,01],[46,14,02,37],[31,09,42,07],[19,47,41,21],
        [41,35,45,05],[20,40,36,18],[43,15,39,25],[22,36,46,47],[13,45,04,26],[02,46,28,06],[20,05,34,19],[27,13,36,16],[44,06,38,43],
        [27,46,34,09],[12,22,33,41],[03,04,22,18],[15,31,45,10],[11,47,16,29],[45,19,35,04],[13,10,15,39],[19,01,43,38],[19,02,05,46],
        [34,12,16,04],[23,35,20,21],[08,22,25,39],[27,14,25,36],[31,44,09,48],[13,08,07,47],[32,17,16,37],[36,15,34,32],[38,14,09,29],
        [11,31,06,33],[13,09,32,47],[22,40,15,39],[17,32,47,24],[45,35,02,46],[32,18,12,27],[29,45,44,31],[02,11,26,36],[37,01,31,39],
        [41,38,05,19],[07,23,13,39],[13,18,20,11],[44,45,24,23],[48,05,07,21],[39,41,06,16],[38,18,26,44],[02,01,45,34],[12,13,05,17],
        [10,29,12,33],[40,48,39,11],[45,33,37,29],[38,44,33,26],[12,37,18,25],[07,15,28,29],[45,01,35,46],[20,04,38,46],[24,30,22,16],
        [16,39,36,45],[25,19,42,43],[22,40,31,01],[20,16,42,13],[10,45,32,43],[10,38,14,28],[36,07,03,26],[18,20,31,01],[05,42,38,30],
        [06,30,46,04],[21,18,24,05],[42,27,37,06],[45,20,17,33],[05,23,20,39],[46,14,04,19],[44,48,27,26],[07,13,26,18],[04,10,31,07],
        [21,46,01,39],[27,35,34,41],[33,13,17,46],[18,20,31,01],[05,42,38,30],[06,30,46,04],[21,18,24,05],[33,13,25,14],[29,41,20,30],
        [40,08,44,27],[06,12,26,08],[34,16,38,21],[20,43,41,11],[14,11,10,02],[32,28,26,33],[07,37,22,08],[10,18,09,31],[02,08,18,17],
        [28,27,25,06],[16,22,33,45],[39,27,33,30],[41,02,43,34],[21,04,41,20],[43,35,41,11],[48,26,40,21],[06,34,27,22],[16,10,12,45],
        [11,09,25,34],[32,28,41,36],[43,14,03,01],[22,31,41,17],[05,41,12,35],[21,27,09,10],[42,02,29,07],[07,22,30,38],[46,37,23,07],
        
       ];




       // TODO: algorithm based on probability on re-apearing on next draw based on user lottery and on every how many lot
      


      

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
