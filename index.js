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
if((date.getDate() - 1) < 10)
    day = '0' + (date.getDate() - 1);
else
    day = date.getDate() - 1;
   
//concatenate strings
let dateString = date.getFullYear()+ '-' + month + '-' + day;

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

            console.log(tempNum)
            dateString = dateString.slice(0, -2) + tempNum;
            console.log(dateString);
            fetchData();
            } 
            document.getElementById('header').innerHTML = 'EARTH  ' + dateString;
            displayImageContent(obj);
            console.log(obj);
            console.log(data);
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

    const content = {
        attitude_quaternions: [],
        caption: '',
        centroid_coordinates: [],

    };

    for(let i = 0; i < data.length; i++){

        //Create box for content and add it to the grid-container
        var box = document.createElement('div');
        box.className = 'box';
        document.getElementById('grid-container').append(box);

        //Display the image
        var img = document.createElement('img');
        img.className = 'earthImg'
        img.src = 'https://api.nasa.gov/EPIC/archive/natural/' + dateTransformed + '/png/' + data[i].image + '.png?api_key=tK3Q0tNMmEakg5UPV3IvQ9rn4WQV3upzpWuLhA7H';
        console.log(img.src)
        document.getElementsByClassName('box')[i].appendChild(img);

        //Create content-container
        var divContent = document.createElement('div');
        divContent.className = 'content-container';
        document.getElementsByClassName('box')[i].append(divContent);


        /* 
        
            Add coordinates to content-container 
        
        */
        
        //Create Latitude label and add it to document
        var latLabel = document.createElement('h2');
        latLabel.id = 'content';
        latLabel.innerText = 'Latitude:';
        document.getElementsByClassName('content-container')[i].append(latLabel);

        //Create latitude and add it to document
        var lat = document.createElement('h2');
        lat.id = 'content';
        lat.innerText = data[i].centroid_coordinates.lat;
        document.getElementsByClassName('content-container')[i].append(lat);

        //Create longitude label and add it to document
        var lonLabel = document.createElement('h2');
        lonLabel.id = 'content';
        lonLabel.innerText = 'Longitude:';
        document.getElementsByClassName('content-container')[i].append(lonLabel);

        //Create longitude and add it to document
        var long = document.createElement('h2');
        long.id = 'content';
        long.innerText = data[i].centroid_coordinates.lon;
        document.getElementsByClassName('content-container')[i].append(long);

        // //add attitude quaternions into content-container
        // var attitudeQuaternions = document.createElement('h2');
        // attitudeQuaternions.id = 'content';

        // //
        // attitudeQuaternions.innerText = 'q0: ' + data[i].attitude_quaternions.q0;
        // document.getElementsByClassName('content-container')[i].append(attitudeQuaternions);

        //Add caption
        var caption = document.createElement('h2');
        caption.id = 'caption';
        caption.innerText = data[i].caption;
        document.getElementsByClassName('content-container')[i].append(caption);


    }
}