import React from 'react'
// import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import Event from '../components/Event'
// import axios from 'axios'
import { useGetEventsQuery } from '../slices/eventsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
const HomeScreen = () => {

    const {data: events, isLoading, error} = useGetEventsQuery();

    // const [events, setEvents] = useState([]);


    // useEffect(() => {
    //     const fetchEvents = async () =>{
    //         const { data } = await axios.get("/api/events");
    //         setEvents(data);
    //     }

    //     fetchEvents();
    // }, [])

  return (
    <>
        {isLoading? (<Loader />) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (
            <>
             <h1>Latest Events</h1>
        <Row>
            {events.map((event) => (
                <Col  sm={12} md={6} lg={4} xl={3}>
                    <Event key={event._id} event={event} />
                </Col>
            ) )}
        </Row></>)}
       
    
    </>
  )
}

export default HomeScreen