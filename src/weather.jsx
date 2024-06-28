
import { useState, useEffect } from "react";

function WeatherApp() {

    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState(false);
    const [city,setCity]=useState("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000);
        return (
            () => {
                clearInterval(intervalId)
            }
        )
    }, [])

    function padZero(number) {
        return (number < 10 ? "0" : " ") + number;
    }
    function set() {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }


    async function api(city) {

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
            const weather = await fetch(url);
            const response = await weather.json();
            console.log(response);

            setWeather({
                humidity: response.main.humidity,
                temp: response.main.temp,
                location: response.name,
                icon: response.weather[0].icon,
                description: response.weather[0].description,
                windspeed:response.wind.deg,
                feelsLike:response.main.feels_like,
            })
            
        }
        catch (error) {
        }

    }
    useEffect(() => {
        api("Baddi");
    }, []);

    return (
        <>
            <span>
                <input onChange={(e)=>setCity(e.target.value)} type="text" name="" id="yes" placeholder="Search for city or location" className="searchbar" />
                <svg  onClick={()=>api(city)} className="svg"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px" ><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>

            </span>


            <div>

                <header>
                    <p className="tl">{set()} IST ,{weather.location}</p>
                </header>
                <main >


                </main>
                <footer>
                    <p className="temp" >{Math.floor(weather.temp - 273)} &deg;C</p>
                    <p className="additionals">Humidity: {weather.humidity}%</p>
                    <p className="additionals">Windspeed: {weather.windspeed} &deg; </p>
                    <p className="additionals">Feels Like: {Math.floor(weather.feelsLike-273)} &deg;C</p>

                </footer>

            </div>

            <div className="icon" style={{
                backgroundImage: `url(https://openweathermap.org/img/wn/${weather.icon}@2x.png)`,
                backgroundSize: "cover",
                width: "150px",
                height: "150px",
            }}>
                 <p className="description">{weather.description}</p>

               
            </div>
           
        </>
    );
}

export default WeatherApp;