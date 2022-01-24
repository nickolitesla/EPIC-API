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
let dateString = date.getFullYear()+ '-' + month + '-' + day;

let obj;
fetchData();

// fetch the data for the prior day from EPIC API
function fetchData(){
    fetch('https://api.nasa.gov/EPIC/api/natural/date/' + dateString + '?api_key=' + apiKey)
        .then(res => res.json())
        .then(data => {
            obj = data;  
            
            //If there are no pictures on the prior day then recursively 
            //test the x - 1 day until array > 0
            if(obj.length == 0){
                let tempNum = dateString.slice(-2) - 1;

                //Reformat date if under 10
                if(tempNum < 10){
                    tempNum = '0' + tempNum;
                }

                dateString = dateString.slice(0, -2) + tempNum;
                fetchData();
                return;
            } 

            console.log(dateString);
            console.log(obj);
            document.getElementById('header').innerHTML = 'EARTH  ' + dateString;
            displayImageContent(obj);
            return obj;
        })
}

// Convert '-' to '/' from JSON to url request
function dateTransform(date){
    dateString = dateString.replace(/-/g, '/' );
    return dateString;
}

// Display image of earth for the day prior
function displayImageContent(data) {

    let dateTransformed = dateTransform();

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

        //Create content-container
     

        // /* 
        
        //     Add coordinates to content-container 
        
        // */
        
          
            
        // //Create Latitude label and add it to document
        // var latLabel = document.createElement('h2');
        // latLabel.id = 'content';
        // latLabel.innerText = 'Latitude:';
        // document.getElementsByClassName('content-container')[i].append(latLabel);

        // //Create latitude and add it to document
        // var lat = document.createElement('h2');
        // lat.id = 'content';
        // lat.innerText = data[i].centroid_coordinates.lat;
        // document.getElementsByClassName('content-container')[i].append(lat);

        // //Create longitude label and add it to document
        // var lonLabel = document.createElement('h2');
        // lonLabel.id = 'content';
        // lonLabel.innerText = 'Longitude:';
        // document.getElementsByClassName('content-container')[i].append(lonLabel);

        // //Create longitude and add it to document
        // var long = document.createElement('h2');
        // long.id = 'content';
        // long.innerText = data[i].centroid_coordinates.lon;
        // document.getElementsByClassName('content-container')[i].append(long);

        // // //add attitude quaternions into content-container
        // // var attitudeQuaternions = document.createElement('h2');
        // // attitudeQuaternions.id = 'content';

        // // //
        // // attitudeQuaternions.innerText = 'q0: ' + data[i].attitude_quaternions.q0;
        // // document.getElementsByClassName('content-container')[i].append(attitudeQuaternions);

        // //Add caption
        // var caption = document.createElement('h2');
        // caption.id = 'caption';
        // caption.innerText = data[i].caption;
        // document.getElementsByClassName('content-container')[i].append(caption);
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

