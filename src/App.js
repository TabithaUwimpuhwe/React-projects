import React from 'react';
import './App.css';
import MainWeather from './components/MainWeather';
import CityCoordinates from './components/CityCoordinates';
import WeatherBox from './components/Forecast';

//App.js is a layout container. It is what being rendered in the browser
//It can pass customer props (arguments passed into components), coexist 
//with Javascript, and uses ‘camelCase’ for attributes and event-listeners
class App extends React.Component {
//The state, the React component built-in Object is where you store 
//property values that belongs to the component.
//When the state object changes, the component re-renders.
  state = {
    city: undefined,

    // days contains objects with the following 4 properties:
    // date, weather_desc, icon, temp
    days: new Array(5)
  };
  
  // creates the day objects and updates the state
  updateState = data => {
    const city = data.city.name;
    console.log(city);
    console.log(data.city.name);
    console.log("coordinate");
	  const days = [];
    const dayIndices = this.getDayIndices(data);
// 5-day forecast
    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp
      });
    }
    this.setState({
      city: city,
      days: days
    });
    console.log(city);
  
    
console.log("coordinate-here");
console.log(city);
  };
  // tries to make an API call with the given city name and triggers state update
  makeApiCall = async city => {
    const api_data = await fetch(
    //  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=9dda0ebeedc4f04f80ca87bd036bce03`
      `https://api.openweathermap.org/data/2.5/forecast?${city}&APPID=9dda0ebeedc4f04f80ca87bd036bce03`
 // `https://api.openweathermap.org/data/2.5/forecast? &lat=${uriEncodedLatitude}&lon=${uriEncodedLongitude}`
      //
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      return true;
    } else return false;
  };

  // returns array with Indices of the next five days in the list
  // from the API data (every day at 12:00 pm)
  getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);
    ////API call to open weather gives th below JSON response of which we slice parts of it.
    //https://api.openweathermap.org/data/2.5/forecast?lat=34.7&lon=-111.07&APPID=9dda0ebeedc4f04f80ca87bd036bce03
    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };
  //The purpose of render() is to display the specified code inside the specified HTML element.
  // the result of this functions is rendered in the return <div> element
  // It renders the days of the week after lat and long is entered
  render() {
    const Forecast = () => {
      const Forecast = this.state.days.slice(1).map(day => (
        <li>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{Forecast}</ul>;
    };



    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeather data={this.state.days[0]} city={this.state.city}>
            <CityCoordinates city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <Forecast />
          </MainWeather>
        </header>
        <main>
        {/* add map to get coordinates */ }
        </main>
        <footer>
       <h3>Page created by Tabitha Uwimpuhwe</h3> 
        </footer>
      </div>
    );
  }
}

export default App;
