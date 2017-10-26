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
import '../App.css';

import Twitter from 'twitter';
import moment from 'moment';

const keys = require('../Keys.js')

class ArtistPage extends Component {
   state = {
      result: {},
      twitterResult: [],
      twitterUsername: '',
   };

   componentDidMount() {
      this.API.lastfm.searchArtists(this.props.match.params.artistName);
      this.API.lastfm.searchTopAlbums(this.props.match.params.artistName);
      this.API.twitter.getTweets();
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
                  result: res.data.artist,
               })
               console.log(this.state.result);
 
            }).then(artistName => {
              axios.post('/api/get-tweets', {
                searchArtist: this.state.result.name

              }).then((res) => {
                this.setState({
                  twitterResult: res.data,
                  twitterUsername: res.data[0].user.screen_name,
                  verifiedStatus: res.data[0].user.verified
                })
                console.log(this.state.twitterResult);
                console.log(this.state.verifiedStatus);
              })
               console.log(this.state.result)
               let mbid = this.state.result.mbid;
               this.API.songkick.getEvents(mbid)
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
                     albumResult: res.data.topalbums
                  })
                  console.log(this.state.albumResult)
               }).catch(err => console.log(err));
         }
      },

    twitter: {
      getTweets: () => {
        axios.get('/api/get-tweets').then((res) => {
          this.setState({
            twitterResult: res.data
          })
          console.log(this.state.twitterResult);
        }).catch(err => console.log(err));
      }
    },

    artist: {
      onClickFavorite: (event) => {
        event.preventDefault();
      }
    },

   songkick: {
      getEvents: query => {
      console.log(query);
         return axios.get("http://api.songkick.com/api/3.0/artists/mbid:" + query + "/calendar.json", {
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
           <Nav / >

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
             mbid = { this.state.result.mbid }
           />

            <EventModal 
              artistName = { this.state.result.name }
              events = { this.state.eventResult ? this.state.eventResult : '' }
            />

           <TopSongs 
             artistName = { this.state.result.name }
             albums = { this.state.albumResult ? this.state.albumResult.album : ''}

             albumName01 = { this.state.albumResult ? this.state.albumResult.album[0].name : '' }
             albumImage01 = { this.state.albumResult ? this.state.albumResult.album[0].image[3]["#text"] : '' }
             iTunesLink01 = { `http://www.itunes.com/${this.state.result.name}/${this.state.albumResult ? this.state.albumResult.album[0].name : ''}` }

             albumName02 = { this.state.albumResult ? this.state.albumResult.album[1].name : '' }
             albumImage02 = { this.state.albumResult ? this.state.albumResult.album[1].image[3]["#text"] : '' }
             iTunesLink02 = { `http://www.itunes.com/${this.state.result.name}/${this.state.albumResult ? this.state.albumResult.album[1].name : ''}` }

             albumName03 = { this.state.albumResult ? this.state.albumResult.album[2].name : '' }
             albumImage03 = { this.state.albumResult ? this.state.albumResult.album[2].image[3]["#text"] : '' }
             iTunesLink03 = { `http://www.itunes.com/${this.state.result.name}/${this.state.albumResult ? this.state.albumResult.album[2].name : ''}` }

             albumName04 = { this.state.albumResult ? this.state.albumResult.album[3].name : '' }
             albumImage04 = { this.state.albumResult ? this.state.albumResult.album[3].image[3]["#text"] : '' }
             iTunesLink04 = { `http://www.itunes.com/${this.state.result.name}/${this.state.albumResult ? this.state.albumResult.album[3].name : ''}` }

             albumName05 = { this.state.albumResult ? this.state.albumResult.album[4].name : '' }
             albumImage05 = { this.state.albumResult ? this.state.albumResult.album[4].image[3]["#text"] : '' }
             iTunesLink05 = { `http://www.itunes.com/${this.state.result.name}/${this.state.albumResult ? this.state.albumResult.album[4].name : ''}` }
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
