"use client";

import axios from "axios";
import {useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState();
  const [dateJoined, setDateJoined] = useState("");
  const [countryName, setCountryName] = useState();
  const [followers, setFollowers] = useState();
  const [title, setTitle] = useState();
  const [league, setLeague] = useState();

  const fetchProfile = (username) => {
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
        console.error(error);
      });
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchProfile(inputValue);
    }
  };

  return (
    <div className="px-10 py-10">
      <h1>chess.com</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter username"
        className="text-black outline-none bg-green-200"
      />
      {name && <div>Name: {name}{verifiedStatus && (<span>✅</span>)}</div>}
      {dateJoined && <div>Joined: {new Date(dateJoined * 1000).toUTCString()}</div>}
      {countryName && <div>country: {countryName}</div>}
      {followers && <div>followers: {followers} </div>}
      {title && <div>Title: {title}</div>}
      {league && <div>League: {league}</div>}
    </div>
  );
}
