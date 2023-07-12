import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {useEffect, useState} from 'react';

import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Nav from "./Nav";
import Companies from "./Companies";
import JobListings from "./JobListings";
import Jobs from "./Jobs";
import './App.css';


// const { JoblyApi } = require("./api");
import { JoblyApi } from './api';

function App() {


  //login method from api helper
  async function login (username, password){
    const user = await JoblyApi.login(username, password);
    console.log("user: ", user);
    setUser(user);
  }


  async function register(username, password, first, last, email){
      const user = await JoblyApi.register(username, password, first, last, email);
      console.log("user: ", user);
      setUser(user);
  }

  function updateProfile(username, password){
    //fill in code
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("user"));

  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setUser={setUser}/>
        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/signup" element={<SignUp doSignUp={register} />} />
            <Route path="/login" element={<Login doLogin={login}/>} />
            <Route path="/profile" element={<Profile doProfile={updateProfile}/>} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:handle" element={<JobListings />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}


export default App;
