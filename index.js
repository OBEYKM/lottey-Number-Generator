


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
const NEVER_USED = "Never-used";


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

var lotRange = document.querySelector(".lotRange");
var isLotRangeShown = true;

var neverUsedfun = document.querySelector(".NeverUsedfun");


var sum = [];

const maxHotNumber = 10;
const maxMinNumber = 10; 


loadData();

hideItems();



/////////////////////////////////////////////////////////General function ///////////////////////////////////////////////////

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


function showLotRange(){

    lotRange.innerHTML = "<label for=''>Lot Range  :  </label> <input class='base-lot'  type='number' id='baseLot' value='30' > <label  for='' id='messageBaseLot'></label> ";

    isLotRangeShown = true;
}


function showNeverUsedfun(){

    lotRange.innerHTML = "<label class='NeverUsedfun' for=''> <h5>lot Range not required</h5></label>"

}

function nullAllJackpotBox(){
    btnJ1.innerHTML = 00;
    btnJ2.innerHTML = 00;
    btnJ3.innerHTML = 00;
    btnJ4.innerHTML = 00;
}


function showClickedRadioFun(){



  for(const type of algorithmOption){

    // console.log(type.checked);

             if(type.checked){
                   console.log("showing funtion if availble of :  " + type.value);
                   
                   switch(type.value){

                    case BALANCED_WEIGHT:
                        console.log("loading  "+BALANCED_WEIGHT+" ....");
                        showLotRange();
                        hideItems();
                        nullAllJackpotBox();
                    break;
            
                    case HOT_NUMBER:
                        console.log("loading  "+HOT_NUMBER+" ....");                      
                        showLotRange();
                        nullAllJackpotBox();
                    break;
            
                    case NEVER_USED:
                        console.log("loading  "+NEVER_USED+" ....");               
                        showNeverUsedfun();
                        hideItems();
                        nullAllJackpotBox();
                    break;
            
                    default:
                        console.log("Error... , this should not happen!  , method showClickedRadioFun");
                
                   }

              }
    }


}


///////////////////////////////////////////////////////// end General function ///////////////////////////////////////////////////


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

        case NEVER_USED:
            generateNewNumberGroupFromData();
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

    displayNumberGenerated();


    
    load.innerHTML="Done , get your luck number and good luck!";
   

//    setTimeout(() => {

    
//     displayNumberGenerated();
    
//     load.innerHTML="Done , get your luck number and good luck!";
    
    // setTimeout(() => {
    //     load.innerHTML="didnt like the numbers , dont worry ! <br> just press Generate button again!";
    // }, 2100);

//    }, 1500);
    
   
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
    j2=getNumber();
    j3=getNumber();
    j4=getNumber();

    // while(j1>=15){

    //     j1=getNumber();

    // }


  
    // var out=true;

    // while(out){
    //     j2=getNumber();
    //     // alert("j2 number = "+j2);
    //     if(j2>=15 && j2<=28){
    //         out=false;
          
    //     }


    // }



    // out=true;

    // while(out){
    //     j3=getNumber();
    //     // alert("j2 number = "+j2);
    //     if(j3>=29 && j3<=42){
    //         out=false;
          
    //     }

       
    // }


    // out=true;

    // while(out){
    //     j4=getNumber();
    //     if(j4>=42 && j4<=56){
    //         out=false;
    //     }
    // }

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
/*30 */ [12,13,41,15],[42,02,29,14],[08,43,17,28],[08,10,44,46],[17,20,34,40],[04,14,18,01],[46,14,02,37],[31,09,42,07],[19,47,41,21],
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
        [32,12,10,28],[17,44,25,18],[31,36,06,10],[19,36,16,20],[42,25,47,27],[14,31,24,42],[33,32,27,14],[22,40,46,24],[29,35,38,47],
        [42,10,07,26],[03,42,16,04],[05,29,47,45],[35,17,47,22],[06,20,34,01],[03,02,15,11],[24,19,48,27],[21,33,17,39],[34,36,10,09],
        [04,02,16,12],[25,06,37,18],[46,24,03,32],[46,41,11,05],[06,36,08,42],[37,42,27,34],[07,35,34,21],[32,06,18,38],[05,12,30,34],
        [06,41,27,08],[34,36,22,45],[21,30,17,11],[42,38,03,32],[38,09,07,08],[06,07,47,24],[09,19,44,10],[02,45,09,40],[37,46,13,30],
        [11,38,29,32],[37,46,06,19],[26,19,03,42],[37,16,14,05],[21,47,18,42],[21,38,12,26],[26,45,44,02],[05,45,03,31],[36,40,05,02],
        [21,16,27,35],[03,17,22,10],[48,18,31,05],[43,48,23,45],[44,31,39,10],[08,44,47,10],[03,22,35,20],[47,27,19,28],[35,22,44,43],
        [22,25,01,10],[38,13,33,27],[41,04,36,08],[47,23,41,11],[10,04,21,25],[24,21,38,29],[12,09,43,40],[07,18,37,36],[40,04,37,22],
        [07,01,22,17],[09,38,44,05],[30,13,39,10],[23,11,02,07],[28,36,06,08],[04,20,24,28],[24,47,44,13],[07,34,25,04],[08,45,30,23],
        [42,18,24,07],[22,48,03,20],[24,37,41,05],[27,47,12,48],[02,43,39,41],[44,16,23,37],[41,22,21,25],[15,48,37,25],[39,04,38,13],
        [48,29,21,32],[08,19,21,02],[45,07,27,26],[16,15,35,29],[45,23,37,17],[38,43,24,48],[38,20,30,40],[27,31,15,20],[35,09,11,36],
        [16,37,03,09],[31,27,03,28],[08,34,24,28],[17,35,27,26],[40,13,19,07],[11,08,07,19],[29,10,21,05],[21,36,25,45],[22,08,43,34],
        [30,34,36,05],[46,36,14,39],[17,16,26,32],[27,30,18,16],[35,33,42,26],[25,46,44,07],[13,31,07,25],[32,43,11,16],[09,13,48,12],
        [41,34,32,27],[06,43,33,04],[27,10,47,41],[17,05,33,48],[12,11,18,05],[40,28,17,05],[05,44,39,35],[03,21,24,31],[33,18,01,42],
        [12,19,39,47],[08,25,26,06],[12,21,06,29],[31,18,34,04],[07,33,27,42],[04,10,48,24],[47,32,06,16],[22,42,32,09],[14,03,44,33],
        [27,22,26,13],[46,29,16,43],[05,12,21,03],[21,27,15,14],[37,46,15,23],[15,09,11,25],[41,14,12,45],[02,39,23,44],[21,38,04,33],
        [28,42,39,29],[41,42,31,40],[38,24,25,06],[18,13,22,46],[39,35,28,04],[03,44,47,27],[31,29,34,38],[01,21,34,02],[40,18,06,39],
        [31,29,34,38],[01,21,34,02],[40,18,06,39],[17,32,27,03],[39,22,26,28],[19,46,07,33],[27,21,48,19],[41,08,35,31],[05,28,24,35],
        [40,07,25,42],[10,34,17,06],[46,25,44,02],[11,32,40,20],[28,16,32,30],[37,28,44,09],[32,14,48,02],[21,27,16,15],[18,16,48,38],
        [39,05,42,30],[48,22,13,38],[44,18,38,14],[19,20,05,36],[37,34,13,38],[42,22,04,19],[01,18,07,14],[06,30,37,01],[33,14,37,05],
        [06,04,39,23],[13,21,01,28],[41,38,47,16],[25,02,37,46],[39,29,27,36],[14,23,04,39],[10,15,38,23],[22,40,23,03],[37,23,03,29],
        [24,37,26,41],[39,10,06,45],[38,31,28,12],[27,48,34,23],[09,02,44,40],[35,32,28,27],[13,05,27,41],[20,07,34,13],[10,07,23,47],
        [24,41,32,46],[18,40,41,35],[45,31,17,40],[02,26,32,45],[23,38,20,28],[20,15,45,01],[03,39,35,43],[14,03,24,27],[19,37,01,30],
        [06,15,43,27],[24,36,12,47],[28,04,31,29],[43,12,34,13],[12,33,22,14],[38,18,09,12],[03,09,21,15],[31,03,36,16],[29,27,26,13],
        [43,25,34,33],[28,01,03,39],[24,28,07,20],[02,32,34,41],[45,42,03,43],[14,31,27,45],[28,32,17,10],[10,45,32,41],[01,44,10,21],
        [14,37,22,09],[48,03,09,35],[26,02,46,38],[21,44,43,33],[16,04,47,38],[02,31,34,01],[02,10,12,19],[26,34,06,24],[30,17,29,42],
        [27,05,01,45],[31,01,32,42],[04,42,35,38],[16,40,38,20],[37,40,21,36],[16,19,39,32],[06,34,04,25],[03,10,01,04],[27,21,23,41],
        [36,05,04,30],[08,01,04,10],[38,05,48,44],[40,21,39,46],[08,03,01,40],[43,14,05,20],[17,37,10,08],[23,22,33,34],[08,02,10,32],
        [06,22,16,30],[44,41,23,18],[27,07,42,34],[31,09,38,39],[07,29,04,19],[47,31,20,33],[43,20,24,23],[15,13,17,23],[21,35,41,31],
        [37,46,42,01],[13,15,03,18],[07,32,30,41],[39,21,16,25],[48,41,04,13],[18,06,47,25],[07,21,26,34],[07,21,26,34],[32,35,33,36],
        [23,08,21,24],[15,09,22,32],[09,27,28,02],[10,30,14,31],[13,42,47,14],[39,02,13,18],[43,08,05,44],[38,19,09,18],[22,11,03,18],
        [31,03,38,47],[29,27,35,14],[25,01,18,47],[30,26,37,48],[11,40,15,06],[44,18,22,40],[11,31,34,02],[29,15,13,07],[10,32,01,33],
        [06,44,47,17],[42,09,20,31],[24,42,46,17],[30,13,17,44],[16,13,10,45],[12,35,19,13],[39,08,34,16],[08,04,30,35],[06,02,13,11],
        [02,08,07,40],[29,12,40,20],[41,38,33,13],[23,31,30,28],[39,46,28,18],[30,07,16,05],[40,32,47,12],[27,23,11,38],[08,28,03,16],
        [12,26,19,24],[28,19,37,07],[20,11,23,27],[42,01,21,18],[41,22,27,09],[07,15,43,36],[38,02,19,23],[38,46,10,06],[28,05,44,43],
        [40,03,29,27],[07,32,11,34],[40,11,20,35],[37,41,12,25],[37,27,42,26],[15,29,43,33],[19,44,36,02],[02,13,31,07],[10,29,09,17],
        [07,26,30,39],[31,39,20,35],[39,12,06,25],[27,36,23,34],[27,15,48,32],[46,20,31,44],[41,47,44,08],[07,02,30,21],[28,18,32,05],
        [32,40,48,38],[24,07,38,14],[22,12,48,47],[47,01,36,24],[38,31,46,43],[09,32,16,47],[21,15,30,43],[29,10,25,17],[39,14,34,03],
        [02,33,46,05],[35,47,32,36],[13,26,36,33],[27,18,30,37],[31,44,20,07],[05,04,46,23],[12,30,31,34],[16,04,17,41],[45,24,15,35],
        [18,47,02,17],[41,02,10,14],[44,17,19,36],[10,15,41,35],[33,30,29,45],[05,15,09,42],[09,33,04,31],[40,39,26,30],[34,37,48,24],
        [38,43,25,45],[16,45,39,04],[08,14,44,04],[10,13,28,03],[48,30,09,02],[48,20,26,46],[33,45,03,18],[17,19,25,08],[34,22,05,35],
        [09,05,18,22],[15,34,47,44],[24,20,45,28],[18,31,01,47],[18,12,35,04],[23,10,24,01],[35,22,37,12],[25,19,48,38],[15,10,05,14],
        [23,44,31,47],[10,42,18,16],[37,25,33,39],[17,13,16,18],[20,36,14,02],[25,11,16,40],[40,48,47,06],[13,17,46,48],[13,27,35,01],
        [07,09,04,08],[18,17,15,48],[47,11,01,35],[14,21,17,30],[33,18,22,12],[21,17,37,45],[25,34,20,11],[06,30,23,47],[32,08,23,22],
        [35,24,20,16],[08,46,06,15],[37,22,20,18],[21,46,12,47],[04,20,47,36],[11,08,28,02],[05,17,07,16],[09,06,44,05],[12,45,44,27],
        [12,20,48,38],[37,08,06,05],[03,29,09,33],[16,01,44,11],[37,30,27,02],[30,45,44,43],[02,46,20,38],[35,48,11,06],[22,08,16,32],
        [05,27,39,07],[11,28,14,36],[37,36,29,09],[35,21,10,07],[14,23,48,12],[37,17,24,20],[34,32,25,12],[05,09,07,10],[10,19,13,16],
        [24,02,31,30],[13,31,19,25],[16,47,37,17],[39,21,43,14],[29,11,37,31],[14,19,27,48],[17,36,27,08],[15,42,45,14],[46,42,06,09],
        [14,06,39,15],[36,11,24,47],[02,24,27,48],[30,19,01,40],[44,25,35,27],[22,08,27,24],[18,09,04,30],[10,43,24,35],[34,38,46,40]
        
        
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

    console.log("=============================== Getting non-matching lot===================================");
    checkIfNumberLotExists();
    // generateNewNumberGroupFromData();
    console.log("===============================End  non-matching lot===================================");

    // addAllLotteryNumber();

    // findMinSumNumber();
    // findMaxSumNumber();

    // findHotNumber();

}


function poolData(){
    baseLot = document.querySelector("#baseLot");
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


///////////////////////////////////////// algorithm based on permutation not used yet ///////////////////////////////////////



function checkIfNumberLotExists(){

    var found;
    var temp;
    var  alltrue;

    var count = 0;

    // test data to check if algorithm works

    // datat =  [
    //     [52,54,56,45],[53,31,54,05],[01,12,02,10],[41,23,12,17],[26,43,32,41],[26,43,32,42],[41,23,12,18],[53,31,54,07],[05,09,41,31],
    //     [52,54,56,46],[17,16,11,53],[12,01,10,02],[35,20,13,38],[55,32,43,03],[26,43,32,11],[12,47,15,29],[33,18,09,27],[09,05,31,41]

    // ]

    for (let current = 0; current < data.length-1; current++) {
        
        
        for (let next = current+1; next < data.length; next++) {
          

            // console.log("Checking   :   "+data[current]+"   and   " + data[next]);

            found = new Array();

            for (let lot = 0; lot < 4; lot++) {
                
                temp = false;

                data[current].forEach(lottery => {

                     
                   if (lottery == data[next][lot]) {


                      temp = true;
                    

                   }

                });

                found.push(temp);


            }

            alltrue = 0;

            found.forEach(e => {

                if (e) {
                    alltrue++;
                }
                
            });

            if(alltrue==4){
                console.log("found (4)  the same lot number  : "+data[current]+"   and   " + data[next] + " position  "+(current+1)+" and "+ (next+1));
                count++;
            }


        }
        
    }

    console.log("Total count = "+count);

}


function generateNewNumberGroupFromData(){


    var temp;
    var found;

    var randomArray = getRandomArrayNumber();

    console.log("Number got to check :"+randomArray);

    var alltrue = 0;


    var current=0;

    var tempCurrent;

 
        while ( current < data.length) {
        
    

            temp = false ; 
            alltrue = 0;
            found = new Array();
            
    
            data[current].forEach(lottery => {
                
    
                randomArray.forEach(lotteryTrial => {

                    if(lottery==lotteryTrial){
                        temp = true;
                    }
                    
                });
                
                found.push(temp);
                temp = false ; 

            });


            

            found.forEach(e => {
                
                if (e) {
                
                    alltrue++;

                }

            });

            tempCurrent = current;
            current++;

            if (alltrue == 4) {

                console.log(" found (4) match of given generated number :  "+data[tempCurrent]+" and " +randomArray+" , getting new one....");
                   randomArray = getRandomArrayNumber();
                   console.log("new number got to check : "+randomArray);              
                // console.log("Value of current = "+(tempCurrent));
                current = 0;
                // tempCurrent = current;
                // console.log("Value of current after change = "+(tempCurrent));
                
            }

            if(alltrue==3){
                console.log(" found (3) match of given generated number :  "+data[tempCurrent]+" and " +randomArray+" , getting new one....");
                randomArray = getRandomArrayNumber();     
                console.log("new number got to check : "+randomArray); 
             // console.log("Value of current = "+(tempCurrent));
             current = 0;
             // tempCurrent = current;
             // console.log("Value of current after change = "+(tempCurrent));
            }

        
           
            
         }



         j1 = randomArray[0];
         j2 = randomArray[1];
         j3 = randomArray[2];
         j4 = randomArray[3];

         displayNumberGenerated();

        
        load.innerHTML = "this lottery number has "+alltrue+" number that are same from prevoius winners!"
        load.style.visibility = "visible";

        setTimeout(() => {
            load.innerHTML ="";
            load.style.visibility = "hidden";
        },7000);
      


         console.log("================================Done , found unique lottery number============================");
         console.log("Here is the number : "+randomArray);
         console.log("================================END found unique lottery number============================");

}


function getRandomArrayNumber(){

    return [
        getNumber(),
        getNumber(),
        getNumber(),
        getNumber()
    ]

}