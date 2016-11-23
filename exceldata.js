var file;

function init() {
    $.getJSON("baselocation.json",function(data) {
       //Variable data contains parsed excel data

       //new global variable for extra json key
       file= data;
       //console.log(file[0].District_name);

        //user's lat-lon
        var user= document.getElementById('input').value; //"12.9719,77.5299" vijayanagar

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
        $.each(urls, function(index,value) {
                
            $.ajax({url: value, async: true, success: function(result){

                //retrieve the first distance value; 
                //var distance = result.routes[0].legs[0].distance.text
                //console.log("Distance = "+ distance);

                //for each query make a new json key in file for distance attribute
                
                file[index].Distance_value = result.routes[0].legs[0].distance.text;

            } ,
            
            complete : function(data) {

                //sorting file wrt distance
                sorting(file, 'Distance_value', function() {
              });

            }});

        }).promise().done(function () {
            //Completed

            for(i=0;i<file.length;i++) {
                console.log(file[i].Distance_value);
            }
        });     
        
    });
}

function sorting(array, key) {
    function sortByKey(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

    array.sort(sortByKey);
}







                    /*
                    //Reference to html display data
                    var finaldata = "";
                    
                    for(k=0;k<4;k++){
                        var finaldata = finaldata.concat("", (k+1) + "} =====" + file[k].District_name + "====" + file[k].Locality_name + "=====" + file[k].Distance_value + "<br/>");       
                    }

                    //Get the first four values from file and display it in <p>
                    document.getElementById("one").innerHTML = finaldata ;
                    */
