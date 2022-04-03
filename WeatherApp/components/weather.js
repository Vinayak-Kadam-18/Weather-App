import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from "react-native";
import SearchBar from "./SearchBar";
import Sunny from "../assets/Images/rocio-guillen-bmVs4mDwI3k-unsplash.jpg";
import Haze from "../assets/Images/jenna-anderson-UylXHkdG42s-unsplash.jpg";
import Rainy from "../assets/Images/valentin-muller-bWtd1ZyEy6w-unsplash.jpg";
import Snow from "../assets/Images/adriann-meyer-0l2TTKSrvtU-unsplash.jpg";
import Cloud from "../assets/Images/raychel-sanner-MnnXMvs4cQo-unsplash.jpg";
import { BlurView } from "expo-blur";

const API_KEY="3e46a639de416e3fd90e1fbb44941d6e";

export default function Weather({ WeatherData, fetchweatherData }) {
  const [bg, setbg] = useState(null);

  const[dailydata, setdailydata]=useState();
  const {
    weather,
    name,
    main: { temp, feels_like, humidity },
    wind: { speed },
    coord:{
      lat,
      lon
    }
  } = WeatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setbg(getBg(main));
    fetchdailyData(lat,lon);
    // console.log(WeatherData);
  }, [WeatherData]);

  function getBg(main) {
    if (main === "Snow") return Snow;
    if (main === "Clear") return Sunny;
    if (main === "Rain") return Rainy;
    if (main === "Haze") return Haze;
    if (main === "Clouds") return Cloud;
  }



  
  
    async function fetchdailyData(lati,long)
  {

    const APIS=`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&dt=1586468027&exclude=current,minutely,hourly&appid=${API_KEY}`;
    try{
      const response = await fetch(APIS);
  
      if(response.status==200)
      {
          const data= await response.json();
          setdailydata(data);
  
  
      }
      else
      {
        setdailydata(null);
       
      }
    
    }
    catch(error)
    {
        console.log(error);
    }
  
  }

console.log(dailydata);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={bg}
          style={styles.backgroundImg}
          resizeMode="cover"
          blurRadius={3}
        >
          <SearchBar fetchweatherData={fetchweatherData} />
          <Text style={styles.headerText}>{name}</Text>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Roboto",
              fontSize: 65,
              fontWeight: "bold",
            }}
          >
            {Math.round(temp - 273.15)}&#x2103;
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Roboto",
              fontSize: 17,
            }}
          >
            {main}
          </Text>

          <BlurView tint="dark" intensity={80} style={{marginTop:50,marginLeft:20,marginRight:20,borderRadius:10}}>
          <Text style={styles.footerText}>
              Feels Like:{Math.round(feels_like - 273.15)}&#x2103;{" "}
            </Text>
            <Text style={styles.footerText}>Wind Speed:{speed}m/s</Text>
            <Text style={styles.footerText}>Humidity:{humidity} %</Text>
          </BlurView>
          {/* <Text></Text>
            <Text style={styles.footerText}>
              Feels Like:{Math.round(feels_like - 273.15)}&#x2103;{" "}
            </Text>
            <Text style={styles.footerText}>Wind Speed:{speed}m/s</Text>
            <Text style={styles.footerText}>Humidity:{humidity} %</Text> */}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    margin: 20,
    fontSize: 31,
    fontFamily: "serif",
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    color: "white",
  },
  footerText: {

    fontSize: 21,
    fontFamily: "serif",
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    color: "white",
    padding: 10,
  },
});
