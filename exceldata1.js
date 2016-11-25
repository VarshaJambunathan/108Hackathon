var file;

function init() {
    $.getJSON("baselocation.json",function(data) {
       //Variable data contains parsed excel data

       //new global variable for extra json key
       file= data;

       document.getElementById("one").innerHTML = "Reading latitude and longitude";

       //add a key-value pair to hold Distance_value
       for(i=0;i< file.length; i++) {
            file[i].Distance_value = 0;
       } 
       //console.log(file[0].District_name);

        //user's lat-lon
        var user= document.getElementById('input').value; //"12.9719,77.5299" vijayanagar   13.0081,77.5648 malleshwaram

        //place a GET query urls in an array called 'url'
        var urls = [];

        //for multiple queries make a new variable with time stamp

        //extract the lat-lon of each place in a for loop
        for(i=0;i<file.length;i++) 
        {
            //for each lat-lon
            var dest = "" + file[i].Latitude+ "," + file[i].Longitude; //first value in baselocation.json

            urls.push("https://maps.googleapis.com/maps/api/directions/json?origin="+user+"&destination="+dest+"&key=AIzaSyDovWr_LDmCl7_ZdN0yZf2HBq-47ZVkmWs");
            //console.log(urls[i]); 
        }
        
        //ajax calls for map data
        var get_distance = $.each(urls, function(index,value) {
                
            $.ajax({url: value, async: false, dataType :'jsonp', success: function(result){

                document.getElementById("one").innerHTML = "Querying data . . ";

                //retrieve the first distance value; 
                //var distance = result.routes[0].legs[0].distance.text
                //console.log("Distance = "+ distance);

                //for each query make a new json key in file for distance attribute
                file[index].Distance_value = result.routes[0].legs[0].distance.text;
                //console.log(result.routes[0].legs[0].distance.text);

            } 

             , complete : function(data) {
                //console.log("place = " + file[index].District_name + " Distance == " + file[index].Distance_value);
                document.getElementById("one").innerHTML = "Processing completed !!"; 

            } 

            });
        }); 

    
        $.when(get_distance) .then( function () {  //success
            
            console.log(file.length);
                
                document.getElementById("one").innerHTML = "Displaying data . . . "; 

                //sorting file wrt distance
                sorting(file, 'Distance_value');

                for(j=0; j < file.length;j++) {
                    console.log("place = " + file[j].Locality_name + " Distance == " + file[j].Distance_value);
                }

                var finaldata = "";   //Reference to html display data

                for(k=0;k<4;k++){
                        var finaldata = finaldata.concat("", (k+1) + "==" + file[k].Locality_name + "==" + file[k].District_name + '===' + file[k].Mobile_Number +  "===" + file[k].Distance_value +"<br/>");
                    }

                document.getElementById("one").innerHTML = finaldata ;
            

            } , function() {  //failure

            console.log('error');
        });
        
    }) ;  //getjson
}

function sorting(array, key) {

    console.log("sorting");
    function sortByKey(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

    array.sort(sortByKey);
}

/*
 // sorting completed
              console.log("place = " + file[1].Locality_name + " Distance == " + file[1].Distance_value);

              //Get the first four values from file and display it in <p>
            document.getElementById("one").innerHTML = finaldata ;
            console.log("after display");
*/