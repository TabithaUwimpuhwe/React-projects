import React from 'react';
import './CityCoordinates.css';
//var coordinate;
//React props are arguments passed into React components via HTML attributes
//React Props are like function arguments in JavaScript and attributes in HTML.
export default class CityCoordinates extends React.Component {
  render(props) {
    const onKlickHandler = async e => {
      e.persist();
      const eventKey = e.which ? e.which : e.keyCode;
      const city = e.target.value;

      // check if input contains only numbers after Enter was pressed
      if (eventKey === 13) {
       // if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
          e.target.classList.add('loading');
          var newcity = city; //passing on a city (replacing city name with coordinates)
          var pos = newcity.indexOf(",");
          var lat = newcity.substr(0,pos);
          var lng = newcity.substr(pos+1);
          console.log(lat);
          console.log(lng);
          console.log(newcity);
          const coordinate = "lat=" +lat + "&lon=" +lng; //concatenate the two
         // city = coordinate; eg San Diego: 32.7157,-117.1611
         window.city = coordinate;
         console.log(city);
          console.log("city");
       // if (await this.props.makeApiCall(city)) e.target.placeholder = 'Enter a City...';
       if (await this.props.makeApiCall(coordinate)) e.target.placeholder = 'Enter latitude,longitude';
       //   else e.target.placeholder = 'City was not found, try again...';
       // } else e.target.placeholder = 'Please enter a valid city name...';
        e.target.classList.remove('loading');
        e.target.value = '';
      }
    };

    const style = {
      top: this.props.city ? '-380px' : '-20px',
      width: '600px',
      display: 'inline-block',
      padding: '10px 0px 10px 30px',
      lineHeight: '120%',
      position: 'relative',
      borderRadius: '20px',
      outline: 'none',
      fontSize: '20px',
      transition: 'all 0.5s ease-out'
    };

    return (
      <input
        className='city-input'
        style={style}
        type='text'
        placeholder='Enter latitude,longitude'
        onKeyPress={onKlickHandler}
      />
	  
    );
  }
}
