 import axios from 'axios';
 const keys = require('../Keys.js')

 const API = {
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
            })
            .then(res => {
               this.setState({
                  artistResult: res.data.artist,
               })        
               console.log(this.state.artistResult)
               let mbid = this.state.artistResult.mbid;
               this.API.songkick.getEvents(mbid)
            })
            .then(artistName => {
               axios.post('/api/get-tweets', {
                  searchArtist: this.state.artistResult.name
               })
               .then((res) => {
                  this.setState({
                     twitterResult: res.data
                  })
                  console.log(this.state.twitterResult);
               })
            })
            .catch(err => console.log(err));
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
            })
            .then(res => {
               this.setState({
                  albumResult: res.data.topalbums,
               })
               console.log(this.state.albumResult)
            })
            .catch(err => console.log(err));
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

   export default API