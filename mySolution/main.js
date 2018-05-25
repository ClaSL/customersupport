"use strict"


// GET DATA
function getData() {

    fetch("https://kea-alt-del.dk/customersupport/")
    .then(res=>res.json())
    .then(show)
}

getData();


// GRAB ELEMENTS (classes in HTML template and content from json)

function show(requests){

    console.log(requests)

    let caseTemplate = document.querySelector('.request-template').content;


// SORT messages after IMPORTANCE (GREEN:#<40 YELLOW:# 41-70 RED:#71) 


    requests.sort(function(a,b){
        if(a.importance<b.importance){
            return 1; 
        } else {
            return -1;
        }
    })


    requests.forEach(request=>{
        console.log(request)

// CLONE TEMPLATE

        let clone = caseTemplate.cloneNode(true);

        // show Message (heading)

        clone.querySelector('.message').textContent=`${request.message}`;

    //  MORE (is hidden in CSS)

    clone.querySelector('.moreText').textContent=`${request.full}`;



    // REVEAL More

 

        
        // show date

        clone.querySelector('.date').textContent=`${request.time.day}/${request.time.month}/${request.time.year} at ${request.time.hour}:${request.time.minute}`;


        // show importance

        clone.querySelector('.importance').textContent=`${request.importance}`;



// show different Importance COLORS:  IMPORTANCE (GREEN:#<40 YELLOW:# 41-70 RED:#71) 

        //Grab the importance number:
        console.log(request.importance);

        if(request.importance<40){
            //console.log("has middle", request.middle)
            clone.querySelector('.importance').style.color ="green";

        } else if (request.importance>70) {

            clone.querySelector('.importance').style.color ="red";
        } 
        
        else {
            clone.querySelector('.importance').style.color ="orange";

        };
        
        //GIVES ERROR
// clone.querySelector("#more").addEventlistener("click",function(showText){
// console.log("Clicked more ");
// console.log(showText);
// });


// show NAME (first middle last)
       
        if(request.middle){
            //console.log("has middle", request.middle)
            clone.querySelector('.name').textContent=`${request.first} ${request.middle} ${request.last}`;
        } else {
            //console.log("no middle")
            clone.querySelector('.name').textContent=`${request.first} ${request.last}`;
        }
        
      
// PASTE (show) TEMPLATE in html (append)
        document.querySelector("#request-container").appendChild(clone)
    });

    // BTN1 show more text (show more = json: full)

   
}







// FURTHER STEPS:




// BTN2 solved (animate (transform,translate) when clicked AND remove from DOM)
