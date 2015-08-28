// Geolocation Logic //


function getLocation(){
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location){
        	getData(location.coords.latitude, location.coords.longitude);
        }, function(error){manualLocation();});
    } else {
    	alert("Geolocation is not supported by this browser.");
   	}
}
function getData(lat, lon){
	var baseurl = "api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon;
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon,
		method: "GET",
		dataType: "jsonp",
		success: function(data){
			processData(data);
		}
	})
}
function manualLocation(){
	React.render(<LocationInput />, document.getElementById('content'));
}

function processData(data){
	console.log(data);

	React.render(<LocationView data={data} />, document.getElementById('content'));
}

// Page Rendering //
var LocationView = React.createClass({
	renderWeather: function(){
		console.log(this.props.data.sys.sunset)
		if(Math.floor(Date.now() / 1000)>this.props.data.sys.sunset)
			var daynight="night";
		else if(Math.floor(Date.now() / 1000)>this.props.data.sys.sunrise)
			var daynight="day";
		else
			var daynight="night"
		var weathercond=this.props.data.weather[0].main.toLowerCase();
		var classes = "wi "+"wi-"+daynight+"-"+weathercond;
		console.log(classes);
		return <i className={classes}></i>;
	},
	renderName: function(){
		return (<div className="location">
			<p id="citytext">{this.props.data.name}</p>
			<p id="windspeed">Wind: {this.props.data.wind.speed} at {this.props.data.wind.deg} degrees</p>
			<hr></hr>
			<p id="countrytext">{this.props.data.sys.country}</p>
		</div>)
	},
	render: function(){
		var date = new Date();
		var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return (<div className="weatherbanner">
			<p id="time">{date.getHours()}:{date.getMinutes()}</p>
			<p id="date">{month[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
			{this.renderWeather()}
			{this.renderName()}
			<p id="temp">Temp: {Math.round(this.props.data.main.temp - 272)}&deg; Celsius</p>
			</div>)
	}
});


var LocationInput = React.createClass({
	render: function(){
		return <div className="inputlocation"> </div>
	}
})

var weathertypes = {
	''

}




// API //
var apikey = "12380fdf0e73c6002197e501856a1894";



// Start it off //
getLocation();