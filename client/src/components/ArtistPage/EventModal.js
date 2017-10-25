import React from 'react';
import './css/EventModal.css';

import moment from 'moment';


const EventModal = props => {

const events = props.events
console.log(events);

const eventList = Object.keys(events).map((event, i) => (

    // let eventName = event.displayName;
    // let eventUrl= event.uri;
    // let eventDate = moment(event.start.date).format("MMM Do YY");
    // let eventTime = moment(event.start.time, 'HH:mm').format('hh:mm a');
    // let eventVenue = event.venue.displayName;
    // let eventVenueUrl = event.venue.uri;
    // let eventLocation = event.location.city;
 
    <tr key={i}>
       <td><a className="event-link" href={event} target="_blank">{event}</a></td>
       <td>{event}</td>
       <td>{event}</td>
       <td><a className="event-link" href={event} target="_blank">{event}</a></td>
       <td>{event}</td>
    </tr>
))

  return (
  <div className="modal fade" id="eventsModal" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Upcoming Events for {props.artistName}</h4>
        </div>
        <div className="modal-body">
          <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name: </th>
                  <th>Date:</th>
                  <th>Time:</th>
                  <th>Venue:</th>
                  <th>Location:</th>
                </tr>
              </thead>
              <tbody>

              {eventList}
{/*                <tr>
                  <td><a className="event-link" href={props.eventUrl} target="_blank">{props.eventName}</a></td>
                  <td>{props.eventDate}</td>
                  <td>{props.eventTime}</td>
                  <td><a className="event-link" href={props.venueUrl} target="_blank">{props.venue}</a></td>
                  <td>{props.location}</td>
                </tr>*/}

              </tbody>
            </table>
        </div>
        <div className="modal-footer">
          <a href="http://www.songkick.com" target="_blank" alt="songkick.com">
            <img className="songkick-logo" src="https://concertmap.azureedge.net/graphics/powered-by-songkick-pink.png" alt="Powered by Songkick"/>
          </a>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EventModal;
