import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './css/Tweets.css'

const Tweets = props => {
  const tweetData = props.tweets;

  const tweetList = tweetData.map((tweet, index) =>
    <li key={index}>
      {tweet.text}
    </li>
  );
  
  return (
<div className="col-md-3 sidebar">
   <div className="well"><img className="twitter-img" src="https://1.bp.blogspot.com/-fYzEVSAoYpo/V1BbBMPg7EI/AAAAAAAAAHw/8mUCv6Jzs2MZtFXkwpdLdBFUVrr7FFh9ACLcB/s1600/twitter%2Blogo%2Btransparent%2B234.png" alt="tweets"/>
   <br/>
   <br/>
   <div className="tweets">
      <ul>{tweetList}</ul>
    </div>
   </div>
</div>
  )
}

export default Tweets;
