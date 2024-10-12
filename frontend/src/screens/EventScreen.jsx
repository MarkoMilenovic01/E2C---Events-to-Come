import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // Import icons from react-icons
import Rating from '../components/Rating';
import { useEffect, useState } from 'react';
import axios from "axios"

const EventScreen = () => {
    const [event, setEvent] = useState({});

    const { id: eventId } = useParams();

    useEffect(() => {
        const fetchEvent = async () =>{
            const { data } = await axios.get(`/api/events/${eventId}`);
            setEvent(data);
        }

        fetchEvent();
    }, [eventId])


    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>

            <Row className="mb-4">
                <Col md={5}>
                    <Image
                        src={event.image} 
                        alt={event.name}
                        fluid
                    />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{event.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={event.rating} text={`${event.numberOfReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price:</strong> ${event.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {event.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <FaCalendarAlt className="mr-2" /> 
                                </Col>
                                <Col>
                                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <FaMapMarkerAlt className="mr-2" /> 
                                </Col>
                                <Col>
                                    <strong>Location:</strong> {event.location}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                    
                                <span>
                                    <strong>Type:</strong> {event.type}
                                </span>
                          
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${event.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>{event.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={event.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default EventScreen;
