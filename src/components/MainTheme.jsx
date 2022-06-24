/* eslint-disable no-restricted-globals */
import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import '../styles/style.css';
import IMAGE_NOT_FOUND from "../images/not-found.png";

function MainTheme() {

  const [actorName, setActorName] = useState("");
  const [actorChoosen, setActorChoosen] = useState(false);
  const [actor, setActor] = useState({
    name: "",
    country: "",
    birthday: "",
    deathday: "",
    gender: "",
    image: "",
  });

  const searchName = () => {
    Axios.get(`https://api.tvmaze.com/search/people?q=${actorName}`).then(
      (response) => {
        setActor({
          name: response.data[0].person.name,
          country: response.data[0].person.country ? response.data[0].person.country.name : null,
          birthday: response.data[0].person.birthday,
          deathday: response.data[0].person.deathday,
          gender: response.data[0].person.gender,
          image: response.data[0].person.image ? response.data[0].person.image.medium : IMAGE_NOT_FOUND,
             });
        setActorChoosen(true);
      }
    );
  }

  const onKeyDown = ev => {
    if(ev.keyCode === 13) {
      searchName()
    }
  };
  
  return (
    <div className='main-container'>
        <h1>BOX OFFICE</h1>
        <p>Are you looking for an actor?</p>
        <h5>Home</h5>
        <input className='Input'
        onKeyDown={onKeyDown}
         placeholder='Search for something'
          type="text"
          onChange={(event) => {
            setActorName(event.target.value);
          }} />
        <br />
        <button onClick={searchName} type='button'>Search</button>

        <div className='DisplayActor'>
          {!actorChoosen ? (
          <h1>Please choose an Actor</h1>
          ) : (
          <>
           <img className='Image' src={actor.image} alt="actor" />
           <h1>
           {actor.name} {actor.gender ? `(${actor.gender})` : null}
           </h1>
           <p>{actor.country ? `Comes from ${actor.country}` : 'No country known'}</p>
            {actor.birthday ? 
            <p className='born' >Born {actor.birthday}</p> : null}
           <p className='deathday' >{actor.deathday ? `Died ${actor.deathday}` : 'Alive'}</p>
          </>
          )}
          </div>
    </div>
  )
}

export default MainTheme;
