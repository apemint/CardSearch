import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";


function App() {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

    if (loading) {
      return <p>Loading...</p>
    }


    return (
      <div>
        <h1>Countries List</h1>

        <input
          type="text"
          placeholder="Search"
          onChange={e => setSearch(e.target.value)}
        />

        {filteredCountries.map((country, idx) => (
          <CountryDetail key={idx} {...country} />
        ))}
      </div>
    );
  }

const CountryDetail = (props) => {
    const { name, flag } = props;

    return (
      <>
        <p>
          <img src={flag} alt={name} style={{ width: "30px", height: "30px", }} />
        </p>
        <p>{name}</p>
      </>
    );
  };

  export default App;
