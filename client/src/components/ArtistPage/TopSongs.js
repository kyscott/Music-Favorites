import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './css/TopSongs.css';

const TopSongs = props => {
  return (
<div className="col-md-9 top-songs-container">

	<div className="card grid-content-container hvr-grow">
	<a className="stream-link" href={props.albumLink01} target="_blank">
	   <h4>{props.albumName01}</h4>
	   <img className='top-song-img' src={props.albumImage01} alt={props.albumName01}/>
	   <i className="fa fa-music listen"></i></a>
	</div>

	<div className="card grid-content-container hvr-grow">
	<a className="stream-link" href={props.albumLink02} target="_blank">
   <h4>{props.albumName02}</h4>
   <img className='top-song-img' src={props.albumImage02} alt={props.albumName02}/>
   <i className="fa fa-music listen"></i></a>
</div>

	<div className="card grid-content-container hvr-grow">
	<a className="stream-link" href={props.albumLink03} target="_blank">
	   <h4>{props.albumName03}</h4>
	   <img className='top-song-img' src={props.albumImage03} alt={props.albumName03}/>
	   <i className="fa fa-music listen"></i></a>
	</div>

	<div className="card grid-content-container hvr-grow">
	<a className="stream-link" href={props.albumLink04} target="_blank">
	   <h4>{props.albumName04}</h4>
	   <img className='top-song-img' src={props.albumImage04} alt={props.albumName04}/>
	   <i className="fa fa-music listen"></i></a>
	</div>

	<div className="card grid-content-container hvr-grow">
	<a className="stream-link" href={props.albumLink05} target="_blank">
	   <h4>{props.albumName05}</h4>
	   <img className='top-song-img' src={props.albumImage05} alt={props.albumName05}/>
	   <i className="fa fa-music listen"></i></a>
	</div>
	
</div>
  )
}

export default TopSongs;
