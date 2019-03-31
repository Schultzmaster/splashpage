$(document).ready(function() {

	$("#stackSubmit").click(function(e) {
		e.preventDefault();
		var value = $('#stackInput').val();
		console.log(value);
		var myurl="https://api.stackexchange.com/2.2/questions?tagged="+value+"&site=stackoverflow"
		$.ajax({
				url : myurl,
				dataType : "json",
				success : function(json) {
					console.log(json);
					var results = "";

					if(value==""){
						value = "most recent";
					}

					results += "<h3> Showing results for " + value + "</h3> <hr>"

					for(var i=0; i < 30; i++){
						results += "<p> <a class = "+"stack-link"+" href=" + json.items[i].link +  " target = "+"_blank"+">" + json.items[i].title + "</a> </p>";
					}
					$("#stackResults").html(results);
				}
		});
	});

	$("#weatherSubmit").click(function(e) {
		e.preventDefault();
		var value = $("#weatherInput").val();
		console.log(value);

		if(value==""){
			value = "provo";
		}

		var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=5f8fdc8ba393650915111ef6944157f2";
		$.ajax({
			url : myurl,
			dataType : "json",
			success : function(json) {
				console.log(json);
				var results = "";
				results += '<h2>Weather in ' + json.name + "</h2>";
				for (var i=0; i<json.weather.length; i++) {
					results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
				}
				results += '<h2>' + json.main.temp + " &deg;F</h2>"
				results += "<p>"
				for (var i=0; i<json.weather.length; i++) {
					results += json.weather[i].description

					if (i !== json.weather.length - 1)
					results += ", "
				}
				results += "</p>";
				$("#weatherResults").html(results);
				var clothing = "<h4>Suggested clothing: ";
				if(json.main.temp > 80){
					clothing += "shorts and";
				}
				else{
					clothing += "pants and";
				}
				if(json.weather[0].description == 'clear sky'){
					clothing +=" sun glasses."
				}
				else if(json.weather[0].description == 'few clouds'){
					clothing +=" a hat."
				}
				else if(json.weather[0].description == 'scattered clouds'){
					clothing +=" a hat."
				}
				else if(json.weather[0].description == 'broken clouds'){
					clothing +=" a hat."
				}
				else if(json.weather[0].description == 'shower rain'){
					clothing +=" an umbrella."
				}
				else if(json.weather[0].description == ' rain'){
					clothing +=" an umbrella."
				}
				else if(json.weather[0].description == 'thunderstorm'){
					clothing +=" an umbrella."
				}
				else if(json.weather[0].description == 'snow'){
					clothing +=" a warm coat."
				}
				else if(json.weather[0].description == 'mist'){
					clothing +=" a flashlight."
				}
				else {
					clothing += " a sense of caution."
				}
				clothing += "</h4>"
				$("#suggestions").html(clothing);
			}
		});

		var myurl= "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=5f8fdc8ba393650915111ef6944157f2";
		$.ajax({
			url : myurl,
			dataType : "json",
			success : function(json) {
				console.log(json);
				var results = [];
				var forcastArray= [];

				results.push('<h2> 24 hour forecast </h2>');
				results.push('<ul>')
				var entry = ""
				var h =3;
				for (var i=0; i<8; i++) {

					entry+= '<li class"forcast-item">';
					entry+=  "in " + h + " hours: ";
					entry +=  + json.list[i].main.temp + "&deg;F, ";
					entry += json.list[i].weather[0].description;
					entry += "</li>";
					h+=3;
					results.push(entry)
					entry = "";
				}

				results.push('</ul>')



				$("#weatherForcast").html(results);

			}
		});



	});






});
