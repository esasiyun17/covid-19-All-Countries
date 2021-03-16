import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) => {
    return item.country.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b927e5c4d7msh05ee8c5fc379ee9p1e330ejsnbe342d959e70",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setIsLoaded(true);
        setItems(res.response);
        console.log(res.response);
      });
  }, []);

  function updateSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <div className="container">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              <h2>COVINFO</h2>
            </a>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            aria-label="Search"
            value={search}
            onChange={updateSearch}
            placeholder="Enter your country name"
          />
          <button class="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>

        {
          <div>
            {filteredItems.map((i) => (
              <div>
                <p>
                  <a className="btn btn-primary" href="/">
                    {i.country}
                  </a>
                </p>
                <div className="row">
                  <div className="col">
                    <div className="card card-body">
                      {
                        <div>
                          <p className="countries col-md-3">
                            <label className="countriesDetails">
                              Contient : {i.continent}
                            </label>
                          </p>
                          <p className="countries">
                            <label className="countriesDetails">
                              Population : {i.population}
                            </label>
                          </p>
                          <p className="countries">
                            <label className="countriesDetails">
                              Cases : {i.cases.total}
                            </label>
                          </p>
                          <p className="countries">
                            <label className="countriesDetails">
                              Deaths : {i.deaths.total}
                            </label>
                          </p>
                          <p className="countries">
                            <label className="countriesDetails">
                              Tests : {i.tests.total}
                            </label>
                          </p>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
