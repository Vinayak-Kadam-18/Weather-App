import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/weather';
const API_KEY="3e46a639de416e3fd90e1fbb44941d6e";

export default function App() {
  const [weatherData, setWeatherData] = useState();
  const [hourData, setHourData] = useState();

  const [loaded,setLoaded] = useState(true);

useEffect(()=>
{
  fetchweatherData('Thane');
  //console.log(weatherData);
},[])

  async function fetchweatherData(cityName)
{
  setLoaded(false);
  const API=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  try{
    const response = await fetch(API);

    if(response.status==200)
    {
        const data= await response.json();
        setWeatherData(data);


    }
    else
    {
      setWeatherData(null);
     
    }
    setLoaded(true);
  }
  catch(error)
  {
      console.log(error);
  }

}

if(!loaded)
{
  return (
  <View style={styles.container} >
    <ActivityIndicator color='gray' size='large'/>
  </View>
  )
}
else if(weatherData==null)
{
  return(
    <View> 
        <SearchBar fetchweatherData={fetchweatherData}/>
    </View>
  )
}



  return (
    <View style={styles.container}>
      
      <Weather WeatherData={weatherData} fetchweatherData={fetchweatherData} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
