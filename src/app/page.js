"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState(null);
  const [verifiedStatus, setVerifiedStatus] = useState(null);
  const [dateJoined, setDateJoined] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [followers, setFollowers] = useState();
  const [title, setTitle] = useState(null);
  const [league, setLeague] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = (username) => {

    // Clear previous data and errors
    setName("");
    setVerifiedStatus(false);
    setDateJoined("");
    setCountryName("");
    setFollowers("");
    setTitle("");
    setLeague("");
    setError(null);

    axios
      .get(`https://api.chess.com/pub/player/${username}`)
      .then((response) => {
        console.log(response);
        const { name, verified, joined, country, followers, league, title } = response.data; // Destructure joined and country

        setName(name);
        verified ? setVerifiedStatus(true) : setVerifiedStatus(false);
        setDateJoined(joined); // Update the joined date state
        setFollowers(followers); // Update follower Count 
        setTitle(title);
        setLeague(league);

        // Fetch country details
        return axios.get(country);
      })
      .then((countryResponse) => {
        const { name } = countryResponse.data; // Destructure name and flag
        setCountryName(name);
      })
      .catch((error) => {
        console.log(error);
        setError("Enter a valid username");
      });
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchProfile(inputValue);
    }
  };

  return (
    <div className="px-10 py-10">
      <h1 className=" font-bold text-xl ">chess.com Profile DashBoard</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter a username"
        className="text-black outline-none bg-green-200"
      />
      {error && <div>{error} </div>}
      {name && <div>Name: {name}{verifiedStatus && (<span>✅</span>)}</div>}
      {dateJoined && <div>Joined: {new Date(dateJoined * 1000).toUTCString()}</div>}
      {countryName && <div>Country: {countryName}</div>}
      {followers >=1 && <div>Followers: {followers} </div>}

      {title && <div>Title: {title}</div>}
      {league && <div>League: {league}</div>}

    </div>
  );
}
