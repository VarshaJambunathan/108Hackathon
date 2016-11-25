var file, raw;
var setresult; //reference to the <p> tag

function init() {
    $.getJSON("baselocation.json",function(data) {
       //Variable data contains parsed excel data

       //new global variable for extra json key
       raw= data;

       console.log("Reading latitude and longitude");

       //add a key-value pair to hold Distance_value
       for(i=0;i< raw.length; i++) {
            raw[i].Distance_value = 0;
       } 
       //console.log(file[0].District_name);

        //user's lat-lon
        var user= document.getElementById('input').value; //"12.9719,77.5299" vijayanagar   13.0081,77.5648 malleshwaram


        //for multiple queries make a new variable with time stamp
        
        
        //ajax call
        callajax(user, function() {

            var finaldata = "";   //Reference to html display data

                for(k=0;k<4;k++){
                        var finaldata = finaldata.concat("", (k+1) + "==" + file[k].Locality_name + "==" + file[k].District_name + '===' + file[k].Mobile_Number +  "===" + file[k].Distance_value +"<br/>");
                    }

                 ///////////////////////////////////////// one is the id of <p> tag ////////////////////////////////////   
                document.getElementById("one").innerHTML = finaldata ;

        });
    
        
    }) ;  //getjson
}

function  callajax(user,callback) {


        //place a GET query urls in an array called 'url'
        var urls = [];

//extract the lat-lon of each place in a for loop
        for(i=0;i<raw.length;i++) 
        {
            //for each lat-lon
            var dest = "" + raw[i].Latitude+ "," + raw[i].Longitude; //first value in baselocation.json

            urls.push("https://maps.googleapis.com/maps/api/directions/json?origin="+user+"&destination="+dest+"&key=AIzaSyChxZIGi4Y1AMQjAzjVktr4w8nQJBGxz6I");
            //console.log(urls[i]); 
        }
        file = JSON.parse(raw);

    //ajax calls for map data
        var get_distance = $.each(urls, function(index,value) {
                
            $.ajax({url: value, async: false, dataType: 'jsonp',success: function(result){

                console.log("Querying data . . ");

                //retrieve the first distance value; 
                //var distance = result.routes[0].legs[0].distance.text
                //console.log("Distance = "+ distance);

                //for each query make a new json key in file for distance attribute
                file[index].Distance_value = result.routes[0].legs[0].distance.text;
                //console.log(result.routes[0].legs[0].distance.text);

            } 

             , complete : function(data) {
                //console.log("place = " + file[index].District_name + " Distance == " + file[index].Distance_value);
                } 

            });
        }); 

    
        $.when(get_distance) .then( function () {  //success
            
            console.log(file.length);
                
                console.log("Displaying data . . . "); 

                //sorting file wrt distance
                sorting(file, 'Distance_value');

                for(j=0; j < file.length;j++) {
                    console.log("place = " + file[j].Locality_name + " Distance == " + file[j].Distance_value);
                }

                 
                               
            } , function() {  //failure

            console.log('error');
        });

        callback();
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