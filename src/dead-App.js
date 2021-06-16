import "./App.css";
import { fetchURLAsync } from "./dead-api";
import { useState, useEffect } from "react";
import React from "react";
const { BrowserRouter, Route, Switch, useParams } = "react-router-dom";

const CountryPage = () => {
  const { country } = useParams();
  return <h2>Country: {country}</h2>;
}

const Routes = () => {
  <Switch>
    <Route path="/:country">
      <CountryPage />
    </Route>
  </Switch>
}

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [confirmedCases, setConfirmedCases] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("sweden");

  useEffect(() => {
    fetchURLAsync(`https://api.covid19api.com/countries`).then((data) => {
      const slugs = data.map((i) => i.Country).sort();
      setCountryData(slugs);
    });
  }, []);

  useEffect(() => {
    fetchURLAsync(
      `https://api.covid19api.com/total/country/${selectedCountry}/status/confirmed`
    ).then((data) => {
      const cases = data[data.length - 1] ? data[data.length - 1].Cases : 0;
      setConfirmedCases(cases);
    });
  }, [selectedCountry]);

  return (
    <BrowserRouter>
      <div className="app">
        <h1>Covid-19</h1>
        <Routes />
        <select onChange={(event) => setSelectedCountry(event.target.value)}>
          {countryData &&
            countryData.map((slug) => (
              <option key={slug} value={slug} selected={slug === selectedCountry}>
                {slug}
              </option>
            ))}
        </select>
        <p className="result">Confirmed Cases: {confirmedCases}</p>
      </div>
    </BrowserRouter>
  );
};

export default App;

