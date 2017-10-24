import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import './css/MainArtistHeader.css';

const MainArtistHeader = props => {
  return (
    <div className="col-md-9 main-artist-container">
      <a href={props.artistUrl} target="_blank">
      <h1 className="artist-header">{props.artistName}</h1>
        <img className="main-artist-image" src={props.artistImage} alt={props.artistName}/>
      </a>

      <div className='bio'>
        <p className='bio-align'>{props.bio}...</p>
      </div>

        <br/>
        <br/>

      <div className='buttons'>
        <button onClickFavorite={this.onClickFavorite} className='fav-btn favs'><i className="fa fa-heart fa-1x" aria-hidden="true"></i> Favorite</button>
        <button className='unfav-btn favs'><i className="fa fa-times fa-1x" aria-hidden="true"></i> Unfavorite</button>
        <button type="button" className='tour-btn favs' data-toggle='modal' data-target='#eventsModal'><i className="fa fa-calendar fa-1x" aria-hidden="true"></i> Tour Dates</button>
      </div>
    </div>
  )
}

export default MainArtistHeader;
