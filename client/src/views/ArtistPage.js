import React, { Component } from 'react';
import Nav from '../components/Homepage/Nav';
import MainArtistHeader from '../components/ArtistPage/MainArtistHeader';
import TopSongs from '../components/ArtistPage/TopSongs';
import SimilarArtists from '../components/ArtistPage/SimilarArtists';
import EventModal from '../components/ArtistPage/EventModal';
import GridContainer from '../components/ArtistPage/GridContainer';
import Tweets from '../components/ArtistPage/Tweets';
import Loader from '../components/ArtistPage/Loader';

import axios from 'axios';
import Twitter from 'twitter';
import moment from 'moment';

const keys = require('../Keys.js')

class ArtistPage extends Component {
   state = {
      artistResult: {},
      twitterResult: [],
      search: ''

   };

   handleInputChange = event => {
      const value = event.target.value;
      const name = event.target.name;
      this.setState({
         search: value
      });
   };

   handleFormSubmit = event => {
      event.preventDefault();
   };

   componentDidMount() {
      this.API.lastfm.searchArtists(this.props.match.params.artistName);
      this.API.lastfm.searchTopAlbums(this.props.match.params.artistName);
   };

   API = {
      lastfm: {
         searchArtists: query => {
            return axios.get('http://ws.audioscrobbler.com/2.0/', {
               params: {
                  method: 'artist.getinfo',
                  api_key: keys.lastfm_api_key,
                  artist: query,
                  format: 'json',
                  autocorrect: '1'
               }
            }).then(res => {
               this.setState({
                  artistResult: res.data.artist,
               })        
               console.log(this.state.artistResult)
               this.API.songkick.getEvents(this.state.artistResult.mbid)
            }).then(artistName => {
               axios.post('/api/get-tweets', {
                  searchArtist: this.state.artistResult.name
               }).then((res) => {
                  this.setState({
                     twitterResult: res.data
                  })
                  console.log(this.state.twitterResult);
               })
            }).catch(err => console.log(err));
         },

         searchTopAlbums: query => {
            axios.get('http://ws.audioscrobbler.com/2.0/', {
               params: {
                  method: 'artist.getTopAlbums',
                  api_key: keys.lastfm_api_key,
                  artist: query,
                  format: 'json',
                  autocorrect: '1'
               }
            }).then(res => {
               this.setState({
                  albumResult: res.data.topalbums,
               })
               console.log(this.state.albumResult)
            }).catch(err => console.log(err));
         }
      },

      songkick: {
         getEvents: query => {
            return axios.get("http://api.songkick.com/api/3.0/artists/mbid:" + query + "/calendar.json", {
               params: {
                  apikey: keys.songkick_api_key
               }
            })
            .then(res => {
               this.setState({
                  eventResult: res.data.resultsPage.results.event,
               })
               console.log(this.state.eventResult)
            })
            .catch(err => console.log(err));
         }
      }
   }

   render() {
      return (
         <div >
         <Nav 
         value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          / >

         {/*<Loader>*/}

         <Tweets 
         tweets = { this.state.twitterResult }
         />

         <MainArtistHeader 
         artistName = { this.state.artistResult.name }
         artistUrl = { this.state.artistResult.url }
         artistImage = { this.state.artistResult.image ? this.state.artistResult.image[3]["#text"] : '' }
         bio = { this.state.artistResult.bio ? this.state.artistResult.bio.content.toString().substring(0, 500) : '' }
         />

       <EventModal 
         artistName = { this.state.artistResult.name }
         events = { this.state.eventResult }

         eventName = { this.state.eventResult ? this.state.eventResult[0].displayName : '' }
         eventUrl = { this.state.eventResult ? this.state.eventResult[0].uri : '' }
         eventDate = { this.state.eventResult ? moment(this.state.eventResult[0].start.date).format("MMM Do YY") : '' }
         eventTime = { this.state.eventResult ? moment(this.state.eventResult[0].start.time, 'HH:mm').format('hh:mm a') : '' }
         venue = { this.state.eventResult ? this.state.eventResult[0].venue.displayName : '' }
         venueUrl = { this.state.eventResult ? this.state.eventResult[0].venue.uri : '' }
         location = { this.state.eventResult ? this.state.eventResult[0].location.city : '' }
         />

         <TopSongs 
         artistName = { this.state.artistResult.name }
         albums = { this.state.albumResult ? this.state.albumResult.album : ''}

         albumName01 = { this.state.albumResult ? this.state.albumResult.album[0].name : '' }
         albumImage01 = { this.state.albumResult ? this.state.albumResult.album[0].image[3]["#text"] : '' }
         albumLink01 = { `http://www.itunes.com/${this.state.artistResult.name}/${this.state.albumResult ? this.state.albumResult.album[0].name : ''}` }
         url01 = {this.state.albumResult ? this.state.albumResult.album[0].url : ''}

         albumName02 = { this.state.albumResult ? this.state.albumResult.album[1].name : '' }
         albumImage02 = { this.state.albumResult ? this.state.albumResult.album[1].image[3]["#text"] : '' }
         albumLink02 = { `http://www.itunes.com/${this.state.artistResult.name}/${this.state.albumResult ? this.state.albumResult.album[1].name : ''}` }
         url02 = {this.state.albumResult ? this.state.albumResult.album[1].url : ''}


         albumName03 = { this.state.albumResult ? this.state.albumResult.album[2].name : '' }
         albumImage03 = { this.state.albumResult ? this.state.albumResult.album[2].image[3]["#text"] : '' }
         albumLink03 = { `http://www.itunes.com/${this.state.artistResult.name}/${this.state.albumResult ? this.state.albumResult.album[2].name : ''}` }
         url03 = {this.state.albumResult ? this.state.albumResult.album[2].url : ''}


         albumName04 = { this.state.albumResult ? this.state.albumResult.album[3].name : '' }
         albumImage04 = { this.state.albumResult ? this.state.albumResult.album[3].image[3]["#text"] : '' }
         albumLink04 = { `http://www.itunes.com/${this.state.artistResult.name}/${this.state.albumResult ? this.state.albumResult.album[3].name : ''}` }
         url04 = {this.state.albumResult ? this.state.albumResult.album[3].url : ''}


         albumName05 = { this.state.albumResult ? this.state.albumResult.album[4].name : '' }
         albumImage05 = { this.state.albumResult ? this.state.albumResult.album[4].image[3]["#text"] : '' }
         albumLink05 = { `http://www.itunes.com/${this.state.artistResult.name}/${this.state.albumResult ? this.state.albumResult.album[4].name : ''}` }
         url05 = {this.state.albumResult ? this.state.albumResult.album[4].url : ''}
         />


         <SimilarArtists
         simArtists = { this.state.artistResult.similar ? this.state.artistResult.similar.artist : '' }

         similarArtist01 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[0].name : '' }
         similarArtistImage01 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[0].image[3]["#text"] : '' }

         similarArtist02 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[1].name : '' }
         similarArtistImage02 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[1].image[3]["#text"] : '' }

         similarArtist03 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[2].name : '' }
         similarArtistImage03 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[2].image[3]["#text"] : '' }

         similarArtist04 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[3].name : '' }
         similarArtistImage04 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[3].image[3]["#text"] : '' }

         similarArtist05 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[4].name : '' }
         similarArtistImage05 = { this.state.artistResult.similar ? this.state.artistResult.similar.artist[4].image[3]["#text"] : '' }
         />

         {/*</Loader>*/}

         </div>
      );
   }
};

export default ArtistPage;
