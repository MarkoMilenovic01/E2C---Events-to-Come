import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetEventsQuery } from '../slices/eventsApiSlice';
import { Link } from 'react-router-dom';
import Event from '../components/Event';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import EventCarousel from '../components/EventCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetEventsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <EventCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Events</h1>
          <Row>
            {data.events.map((event) => (
              <Col key={event._id} sm={12} md={6} lg={4} xl={3}>
                <Event event={event} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;