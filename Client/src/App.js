import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./app.css";
import {
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState();

  let user = document.cookie;
  Axios.defaults.withCredentials = true;

  const getCurrentUser = async () => {
    try {
      await Axios.get(
        `${process.env.REACT_APP_API_ROUTE_URL}/users/current`
      ).then((response) => {
        console.log(response.data.email);
        setLoggedUser(response.data.email);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    let item = { email, password };
    try {
      let result = await Axios.post(
        `${process.env.REACT_APP_API_ROUTE_URL}/auth/login`,
        item
      );
      localStorage.setItem("user-info", JSON.stringify(result.data));
      console.log(result, "total result do login");
      console.log("user has logged in");
      setPassword("");
      setEmail("");
      getCurrentUser();
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    let item = { email, password };
    try {
      if (email.length <= 0 || password.length < 8) {
        console.log("please enter something( email or password is missing) ");
      } else {
        let result = await Axios.post(
          `${process.env.REACT_APP_API_ROUTE_URL}/auth/register`,
          item
        );
        localStorage.setItem("user-info", JSON.stringify(result.data));

        setPassword("");
        setEmail("");
        getCurrentUser();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (e) => {
    try {
      await Axios.get(`${process.env.REACT_APP_API_ROUTE_URL}/auth/logout/`);
      localStorage.clear();
      setPassword("");
      setEmail("");
      setLoggedUser(null);
      console.log("user has logged out");
    } catch (err) {
      console.log(err);
    }
  };

  const Movies = () => {
    return (
      <div>
        <h1>this are your movies</h1>
      </div>
    );
  };

  const Allmovies = () => {
    return (
      <div>
        <h1>this are all the movies</h1>
      </div>
    );
  };
  const [movieTitle, setMovietitle] = useState("");
  const [movieScore, setMovieScore] = useState("");

  const AddMovie = () => {
    return (
      <div>
        <form>
          <label htmlFor="movie-name">title of the movie:</label>
          <br />
          <input
            type="text"
            name="movie-name"
            placeholder="Movie Title"
            onChange={(e) => setMovietitle(e.target.value)}
            value={movieTitle}
          />
          <br />
          <label htmlFor="movie-score">title of the movie:</label>
          <br />
          <input
            type="text"
            name="movie-score"
            placeholder="Movie Score"
            onChange={(e) => setMovieScore(e.target.value)}
            value={movieScore}
          />
        </form>
      </div>
    );
  };

  useEffect(() => {
    setPassword("");
    setEmail("");
    getCurrentUser();
  }, [loggedUser]);

  return (
    <div>
      <h1>hello world</h1>
      <form className="sign-up-form">
        <h2>Email Sign-up</h2>

        <div>
          <label htmlFor="username">Email Address</label>
          <br />
          <input
            className="sign-up-input"
            type="email"
            name="username"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="sign-up-input"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login} type="button" className="btn-register">
          login
        </button>
        <button onClick={register} type="button" className="btn-register">
          register
        </button>
        <button onClick={logout} type="button" className="btn-register">
          logout
        </button>
      </form>
      <br />
      {loggedUser ? <AddMovie /> : null}
      <ul>
        <li>logged in as :{loggedUser} </li>

        <li>
          <Link to="/movies">your movies</Link>
        </li>
        <li>
          <Link to="/allmovies">all movies</Link>
        </li>
      </ul>

      <Routes>
        <Route path="movies" element={<Movies />} />
        <Route path="allmovies" element={<Allmovies />} />
      </Routes>
    </div>
  );
}

export default App;
