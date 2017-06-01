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

/* exersice 3*/

function getResponse(){

	var query = new XMLHttpRequest();
	var url = "https://api.github.com/search/repositories?q="+ document.getElementById('serch').value;
	query.open('GET', url , true)

	query.onreadystatechange = function(){
		if((query.readyState == 4) && (query.status == 200)){
			var result = JSON.parse(query.responseText);
				var ul = '<ul>';
				
				for (var i = 0; i < result.items.length; i++ ){
					ul += '<li>'+ result.items[i].full_name;+'</li>';
				}
			ul += '</ul>';	
			document.getElementById('response').innerHTML = ul;						
		}
	}

	query.send();


} 
