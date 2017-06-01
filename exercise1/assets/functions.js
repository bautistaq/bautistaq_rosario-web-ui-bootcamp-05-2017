'use strict'

window.onload = function(){

	setTimeout(function(){ 
	document.getElementById('hide').style.opacity = "1";}, 900)
}

/* function clickme(){

	alert("You click me!");

} */

function sendAjax (config){
	var url = config.url;
	var method = config.type;
	
	var joke = new Promise(function(done, reject){

		var ajax = new XMLHttpRequest();
		ajax.open( method , url, true);

		ajax.onreadystatechange = function(){
			if((ajax.readyState == 4) && (ajax.status == 200)){
				var resp = JSON.parse(ajax.responseText);
				done(resp.value.joke)
							
			} else if ((ajax.status == 403) && (ajax.status == 404)){
				reject('Error');
			}
		} 
		ajax.send();
	})

	.then(function(resp){
		document.getElementById('joke').innerHTML =  resp
	})

	.catch(function(err){
	
		document.getElementById('joke').innerHTML =  err.style.red
	})
	
}

function clickjoke(){

	var config = {
		type: 'POST',
		url:"http://api.icndb.com/jokes/random",
	}
	sendAjax(config);
} 

