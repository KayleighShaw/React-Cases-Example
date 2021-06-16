import "./App.css";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCountries, fetchConfirmedCases } from "./deadapi2";

const CountryPage = () => {
  const { country } = useParams();
  return <h2>Country: {country} </h2>;
};

const Routes = () => (
  <Switch>
    <Route path="/:country">
      <CountryPage />
    </Route>
  </Switch>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [confirmedCases, setConfirmedCases] = useState([]);

  useEffect(() => {
    fetchCountries().then((countries) => {
      setCountries(countries);
      handleSelectCountry(countries[0]);
    });
  }, []);

  const handleSelectCountry = async (country) => {
    const cases = await fetchConfirmedCases(country);
    setConfirmedCases(cases);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <h1>Covid-19</h1>
        <Routes />
        <select onChange={(event) => handleSelectCountry(event.target.value)}>
          {countries.map((slug) => (
            <option key={slug} value={slug}>
              {slug.toUpperCase()}
            </option>
          ))}
        </select>
        <p className="result">Confirmed Cases: {confirmedCases}</p>
      </div>
    </BrowserRouter>
  );
};

export default App;
