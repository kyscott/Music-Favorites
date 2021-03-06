import React, { Component } from 'react';
import MainArtistHeader from '../components/ArtistPage/MainArtistHeader/MainArtistHeader';
import TopAlbums from '../components/ArtistPage/TopAlbums/TopAlbums';
import SimilarArtists from '../components/ArtistPage/SimilarArtists/SimilarArtists';
import EventModal from '../components/ArtistPage/EventModal/EventModal';
import Tweets from '../components/ArtistPage/Tweets/Tweets';
import Loader from '../components/ArtistPage/Loader/Loader';
import AlertModal from '../components/ArtistPage/AlertModal/AlertModal';
import UnfavAlertModal from '../components/ArtistPage/UnfavAlertModal/UnfavAlertModal';
import axios from 'axios';
import '../App.css';

const keys = require('../Keys.js')

class ArtistPage extends Component {
   state = {
      result: {},
      twitterResult: [],
      twitterUsername: '',
      currentArtistName: ''
   };

   componentDidMount() {
      this.setState({
         currentArtistName: this.props.match.params.artistName
      });
      this.API.lastfm.searchArtists(this.props.match.params.artistName)
         .then(res => {
            this.setState({
               result: res.data.artist,
            })
         }).then(artistName => {
            axios.post('/api/get-tweets', {
               searchArtist: this.state.result.name
            }).then((res) => {
               this.setState({
                  twitterResult: res.data,
                  twitterUsername: res.data[0].user.screen_name,
                  verifiedStatus: res.data[0].user.verified
               })
            })
            this.API.songkick.getEvents(this.state.result.mbid)
         }).catch(err => console.log(err));

      this.API.lastfm.searchTopAlbums(this.props.match.params.artistName);
      this.API.twitter.getTweets();
   }

   componentWillReceiveProps() {
      let newArtist = window.location.pathname;
      newArtist = newArtist.replace('/artist/', '');
      newArtist = newArtist.replace('%20', ' ');
      if (newArtist !== this.state.currentArtistName) {
         this.setState({
            currentArtistName: newArtist
         });
         this.API.lastfm.searchArtists(newArtist)
            .then(res => {
               this.setState({
                  result: res.data.artist,
               })
            }).then(artistName => {
               axios.post('/api/get-tweets', {
                  searchArtist: newArtist
               }).then((res) => {
                  this.setState({
                     twitterResult: res.data,
                     twitterUsername: res.data[0].user.screen_name,
                     verifiedStatus: res.data[0].user.verified
                  })
                  console.log(this.state.verifiedStatus);
               })
               this.API.songkick.getEvents(this.state.result.mbid)
            }).catch(err => console.log(err));
         this.API.lastfm.searchTopAlbums(newArtist);
         this.API.twitter.getTweets();
      }
   }

   API = {
      lastfm: {
         searchArtists: query => {
            return axios.get('https://ws.audioscrobbler.com/2.0/', {
               params: {
                  method: 'artist.getinfo',
                  api_key: keys.lastfm_api_key,
                  artist: query,
                  format: 'json',
                  autocorrect: '1'
               }
            })
         },

         searchTopAlbums: query => {
            axios.get('https://ws.audioscrobbler.com/2.0/', {
               params: {
                  method: 'artist.getTopAlbums',
                  api_key: keys.lastfm_api_key,
                  artist: query,
                  format: 'json',
                  autocorrect: '1'
               }
            }).then(res => {
               this.setState({
                  albumResult: res.data.topalbums
               })
            }).catch(err => console.log(err));
         }
      },

      twitter: {
         getTweets: () => {
            axios.get('/api/get-tweets').then((res) => {
               this.setState({
                  twitterResult: res.data
               })
            }).catch(err => console.log(err));
         }
      },

      songkick: {
         getEvents: query => {
            return axios.get("https://api.songkick.com/api/3.0/artists/mbid:" + query + "/calendar.json", {
               params: {
                  apikey: keys.songkick_api_key
               }
            }).then(res => {
               this.setState({
                  eventResult: res.data.resultsPage.results.event
               })
            }).catch(err => console.log(err));
         }
      }
   }


   render() {
      return (
         <div className='artistPageContainer'>

           {/*<Loader>*/}

           <Tweets
              tweets={ this.state.twitterResult }
              username={ this.state.twitterUsername }
              verified={ this.state.verifiedStatus }
            />

           <MainArtistHeader 
             artistUrl = { this.state.result.url }
             artistName = { this.state.result.name }
             artistImage = { this.state.result.image ? this.state.result.image[3]["#text"] : '' }
             bio = { this.state.result.bio ? this.state.result.bio.content.toString().substring(0, 500) : '' }
           />

           <EventModal 
             artistName = { this.state.result.name }
             events = { this.state.eventResult ? this.state.eventResult : '' }
           />

           <AlertModal
             artistName = { this.state.result.name }
          />

           <UnfavAlertModal
             artistName = { this.state.result.name }
          />

           <TopAlbums 
             artistName = { this.state.result.name }
             albums = { this.state.albumResult ? this.state.albumResult.album : '' }
          />

           <SimilarArtists
             simArtists = { this.state.result.similar ? this.state.result.similar.artist : '' }
           />

           {/*</Loader>*/}

         </div>
      );
   }
};

export default ArtistPage;
