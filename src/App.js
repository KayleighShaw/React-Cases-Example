import "./App.css";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import CovidCountry from "./CovidCountry";

const CountryPage = () => {
  const { country } = useParams();
  return (
    <>
      <h2>Country: {country} </h2>
      <CovidCountry country={country}/>
    </>
  );
};

const Routes = () => (
  <Switch>
    <Route path="/:country">
      <CountryPage />
    </Route>
  </Switch>
);

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
