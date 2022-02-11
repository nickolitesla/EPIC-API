// API Key for NASA
const apiKey = 'tK3Q0tNMmEakg5UPV3IvQ9rn4WQV3upzpWuLhA7H';

// Create date object
const date = new Date();
let month, day;

//Format the month correctly if < 10
//beacuse 9 is not valid but 09 is
if(date.getMonth() < 10)
    month = '0' + (date.getMonth() + 1);

//getMonth() returns 0-11 instead of 1-12 so must increment by 1
else
    month = date.getMonth() + 1;

//Format the date correctly if < 10
//beacuse 9 is not valid but 09 is
if((date.getDate()) < 10)
    day = '0' + (date.getDate() );
else
    day = date.getDate();
   
//concatenate strings
const todaysDate = date.getFullYear()+ '-' + month + '-' + day;
let dateString = date.getFullYear()+ '-' + month + '-' + day;

let obj;
fetchData(dateString);

// fetch the data for the prior day from EPIC API
function fetchData(date){
    fetch('https://api.nasa.gov/EPIC/api/natural/date/' + date + '?api_key=' + apiKey)
        .then(res => res.json())
        .then(data => {
            obj = data;  
            
            //If there are no pictures on the prior day then recursively 
            //test the x - 1 day until array > 0
            if(obj.length == 0){
                let tempNum = date.slice(-2) - 1;

                //Reformat date if under 10
                if(tempNum < 10){
                    tempNum = '0' + tempNum;
                }

                date = date.slice(0, -2) + tempNum;
                fetchData(date);
                return;
            } 

            console.log(date);
            console.log(obj);
            document.getElementById('header').innerHTML = 'EARTH ' + date;
            displayImageContent(obj, date);
            return obj;
        })
}

// Convert '-' to '/' from JSON to url request
function dateTransform(date){
    dateString = date.replace(/-/g, '/' );
    return dateString;
}

// Display image of earth for the day prior
function displayImageContent(data, date) {

    let dateTransformed = dateTransform(date);

    for(let i = 0; i < data.length; i++){


        //Create box for content and add it to the grid-container


        //create myslides div for slideshow
        var div = document.createElement('div');
        div.className = 'mySlides fade';
        div.setAttribute('data-id', i);
        div.innerText = (i + 1) + ' / ' + data.length;
        document.getElementsByClassName('slideshow-container')[0].append(div);

        //add images to the slideshow-container
        var img = document.createElement('img');
        img.src = 'https://api.nasa.gov/EPIC/archive/natural/' + dateTransformed + '/png/' + data[i].image + '.png?api_key=tK3Q0tNMmEakg5UPV3IvQ9rn4WQV3upzpWuLhA7H';
        document.getElementsByClassName('mySlides fade')[i].append(img);
    }

    //prev and next buttons
    var prev = document.createElement('a');
    prev.className = 'prev';
    prev.setAttribute('onclick', 'plusSlides(-1)');
    prev.innerHTML = '&#10094';
    document.getElementsByClassName('slideshow-container')[0].append(prev);

    var next = document.createElement('a');
    next.className = 'next';
    next.setAttribute('onclick', 'plusSlides(1)');
    next.innerHTML = '&#10095';
    document.getElementsByClassName('slideshow-container')[0].append(next);


    //functionality for slide show
    //reduced scope but needed for the 
    //intialization of the slide show
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
    showSlides(slideIndex += n);
    }

    function currentSlide(n) {
    showSlides(slideIndex = n);
    }

    function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slideIndex-1].style.display = "block";  

    var j = n - 1;
    if(j >= obj.length){ j = 0}
    if(j < 0){j = obj.length-1}


    //display info for the current earth img
    document.getElementById('date').innerText = obj[j].date;
    document.getElementById('lat').innerHTML = obj[j].centroid_coordinates.lat+ "&#176;";
    document.getElementById('lon').innerHTML = obj[j].centroid_coordinates.lon + "&#176;";
    document.getElementById('q0').innerText = obj[j].attitude_quaternions.q0;
    document.getElementById('q1').innerText = obj[j].attitude_quaternions.q1;
    document.getElementById('q2').innerText = obj[j].attitude_quaternions.q2;
    document.getElementById('q3').innerText = obj[j].attitude_quaternions.q3;
    document.getElementById('x').innerHTML = obj[j].dscovr_j2000_position.x;
    document.getElementById('y').innerHTML = obj[j].dscovr_j2000_position.y;
    document.getElementById('z').innerHTML = obj[j].dscovr_j2000_position.z;
    document.getElementById('caption').innerText = obj[j].caption;
    }
}

//functionality for slide show
//that has global scope

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    try{
        slides[slideIndex-1].style.display = "block";  
    } catch(err){

    }

    try{
    var j = n - 1;
    if(j >= obj.length){ j = 0}
    if(j < 0){j = obj.length-1}


    //display info for the current earth img
    document.getElementById('date').innerText = obj[j].date;
    document.getElementById('lat').innerHTML = obj[j].centroid_coordinates.lat+ "&#176;";
    document.getElementById('lon').innerHTML = obj[j].centroid_coordinates.lon + "&#176;";
    document.getElementById('q0').innerText = obj[j].attitude_quaternions.q0;
    document.getElementById('q1').innerText = obj[j].attitude_quaternions.q1;
    document.getElementById('q2').innerText = obj[j].attitude_quaternions.q2;
    document.getElementById('q3').innerText = obj[j].attitude_quaternions.q3;
    document.getElementById('x').innerHTML = obj[j].dscovr_j2000_position.x;
    document.getElementById('y').innerHTML = obj[j].dscovr_j2000_position.y;
    document.getElementById('z').innerHTML = obj[j].dscovr_j2000_position.z;
    document.getElementById('caption').innerText = obj[j].caption;
    } catch(err){
        
    }
}

//Funcitonallity to change the date and get the new images of 
//Earth based on that date
//Fix issue with day displaying incorrectly if you choose the day 
//of it will roll back a day but not update in input or header
const dateElement = document.querySelector('#chooseDate');
const header = document.getElementById('header');

//set max date to todaysDate
dateElement.setAttribute("max", todaysDate);

//add event listener when date is changed on input
dateElement.addEventListener('change', (event) => {
    const newDate = dateElement.value;
    header.innerText = 'Earth ' + newDate;
    console.log(newDate);
    const slideShowChildren = document.getElementsByClassName('slideshow-container')[0];
    slideShowChildren.innerHTML = "";
    fetchData(newDate);
})

