var globaljson;

function query(e){
	var start=document.getElementById("origin").value.split(' ').join('+');
	var end=document.getElementById("dest").value.split(' ').join('+');
	var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+start+"&destination="+end+"&key=AIzaSyDovWr_LDmCl7_ZdN0yZf2HBq-47ZVkmWs&alternatives=true";

	var req = new XMLHttpRequest();
	console.log(url);
	req.open('GET',url,true);
	req.send();

	req.onreadystatechange = processRequest;

	function processRequest(e) {
	//Check if url returned data
		if(req.readyState == 4 && req.status == 200) //4 for done, 200 for completed
		{
			//Retrieve the json and display in an alert
			var response = JSON.parse(req.responseText);
			alert(response.status);
			console.log(response);
			var jsonData = "";
			var routes= response.routes;
			for(i=0;i<routes.length;i++) {
				var jsonData = jsonData.concat(" ", "Route distance " + (i+1) + " = ");  //&#09 = tab
				var jsonData = jsonData.concat(" ", routes[i].legs[0].distance.text + "<br/>");
			}
			document.getElementById("jsondata").innerHTML =jsonData;
			console.log(jsonData);
		}

	}
}