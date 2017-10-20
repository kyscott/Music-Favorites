import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import './css/SimilarArtists.css';
import '../../hover.css'

const SimilarArtists = props => {
  return (
<div className="col-md-9 similar-artists-container">

   <div className="card grid-content-container hvr-wobble-vertical">
   <a href={props.similarArtist01}>
      <h4>{props.similarArtist01}</h4>
      <img className='similar-artist-img' src={props.similarArtistImage01} alt={props.similarArtist01}/>
      </a>
   </div>

   <div className="card grid-content-container hvr-wobble-vertical">
   <a href={props.similarArtist02}>
      <h4>{props.similarArtist02}</h4>
      <img className='similar-artist-img' src={props.similarArtistImage02} alt={props.similarArtist02}/>
      </a>
   </div>

   <div className="card grid-content-container hvr-wobble-vertical">
   <a href={props.similarArtist03}>
      <h4>{props.similarArtist03}</h4>
      <img className='similar-artist-img' src={props.similarArtistImage03} alt={props.similarArtist03}/>
      </a>
   </div>

   <div className="card grid-content-container hvr-wobble-vertical">
   <a href={props.similarArtist04}>
      <h4>{props.similarArtist04}</h4>
      <img className='similar-artist-img' src={props.similarArtistImage04} alt={props.similarArtist04}/>
      </a>
   </div>

   <div className="card grid-content-container hvr-wobble-vertical">
   <a href={props.similarArtist05}>
      <h4>{props.similarArtist05}</h4>
      <img className='similar-artist-img' src={props.similarArtistImage05} alt={props.similarArtist05}/>
      </a>
   </div>

</div>

  )
}

export default SimilarArtists;
