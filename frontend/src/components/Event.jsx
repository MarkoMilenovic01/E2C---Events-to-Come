import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Rating from './Rating';


const Event = ({ event }) => {
    console.log(event.image);
  return (
    <Card className="my-3 p-3 rounded h-70">
      <Link to={`/event/${event._id}`}>
        <Card.Img 
          src={event.image} 
          variant="top" 
          className="card-image" 
        />
      </Link>
      <Card.Body className="px-2">
        <Link to={`/event/${event._id}`}>
          <Card.Title as="div" className="event-title">
            <strong>{event.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
            <Rating value={event.rating} text={`${event.numberOfReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3" className="my-1">€{event.price}</Card.Text>

        <Card.Text as="p" className="description">
          {event.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Event
