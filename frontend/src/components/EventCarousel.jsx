import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopEventsQuery } from '../slices/eventsApiSlice';

const EventCarousel = () => {
  const { data: events, isLoading, error } = useGetTopEventsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {events.map((event) => (
        <Carousel.Item key={event._id}>
          <Link to={`/event/${event._id}`}>
            <Image src={event.image} alt={event.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {event.name} (€{event.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousel;