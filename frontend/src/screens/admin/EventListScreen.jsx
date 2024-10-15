import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetEventsQuery,
  useDeleteEventMutation,
  useCreateEventMutation,
} from '../../slices/eventsApiSlice';
import { toast } from 'react-toastify';

const EventListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetEventsQuery({
    pageNumber,
  });

  const [deleteEvent, { isLoading: loadingDelete }] =
    useDeleteEventMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteEvent(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createEvent, { isLoading: loadingCreate }] =
    useCreateEventMutation();

  const createEventHandler = async () => {
    if (window.confirm('Are you sure you want to create a new event?')) {
      try {
        await createEvent();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const events = data?.events || []; // Default to an empty array if data.events is undefined
  const page = data?.page || 1; // Get current page
  const pages = data?.pages || 1;
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Event</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createEventHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event._id}</td>
                  <td>{event.name}</td>
                  <td>€{event.price}</td>
                  <td>{event.type}</td>
                  <td>{event.location}</td>
                  <td>{event.date}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/event/${event._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(event._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}

    </>
  );
};

export default EventListScreen;