


//full URL of API : https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=6c48fcb5e73890feed9c9c5f8499873a
//Splitting the API : https://api.openweathermap.org/data/2.5/weather?   q=delhi   &appid=6c48fcb5e73890feed9c9c5f8499873a
//Now in apiurl we are storing only this part 👉 https://api.openweathermap.org/data/2.5/weather?
//apikey is only that part of the URL 👉 6c48fcb5e73890feed9c9c5f8499873a


const apikey = "6c48fcb5e73890feed9c9c5f8499873a";
var apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    //DRY RUN Of This Line ☝️

    // apiurl + city + `&appid=${apikey}` means 👇
    // https://api.openweathermap.org/data/2.5/weather?  +  cityName(got from input box)  +  &appid=6c48fcb5e73890feed9c9c5f8499873a

    if(response.status == 404){

    //if any error come it will show the text written into the '.error' div
    document.querySelector(".error").style.display = "block";

    //At the first time before typing, the 'weather' div will not display
    //And if we write wrong city name then it will not display the 'weather' div
    document.querySelector(".weather").style.display = "none";

    }
    else{
    var data = await response.json(); //This is the variable containing the 'JSON response' received from the 'API call'.

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"; //Math.round(...) -->  for example the value will like this   --> 5.5 = 6 ,  5.05 = 5
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
    console.log(data.weather[0].main)//we are getting the weather condition in console(that is for my  understanding)

    if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "clouds.png";
    }else if(data.weather[0].main == "Clear")
    {
    weatherIcon.src = "clear.png";
    }
    else if(data.weather[0].main == "Haze")
    {
    weatherIcon.src = "haze.png";
    }else if(data.weather[0].main == "Mist")
    {
    weatherIcon.src = "mist.png";
    }else if(data.weather[0].main == "Rain")
    {
    weatherIcon.src = "rain.png";
    }else if(data.weather[0].main == "Snow")
    {
    weatherIcon.src = "snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
    }
}
    

searchbtn.addEventListener("click", ()=>{
    checkWeather(searchbox.value);
})