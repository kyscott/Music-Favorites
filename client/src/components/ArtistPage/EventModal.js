import React from 'react';
import './css/EventModal.css';

import moment from 'moment';


const EventModal = props => {
const events = props.events
let eventList = '';

if (events) {
  eventList = events.map((event, i) => (
 
    <tr key={i}>
       <td><a className="event-link" href={event.uri} target="_blank">{event.displayName}</a></td>
       <td>{moment(event.start.date).format("MMM Do YY")}</td>
       <td>{moment(event.start.time, 'HH:mm').format('hh:mm a')}</td>
       <td><a className="event-link" href={event.venue.uri} target="_blank">{event.venue.displayName}</a></td>
       <td>{event.location.city}</td>
    </tr>
))
}

  return (
  <div className="modal fade" id="eventsModal" role="dialog">
    <div className="modal-dialog modal-lg">
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
