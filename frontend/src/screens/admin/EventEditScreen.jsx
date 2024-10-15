import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from "react-bootstrap"
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateEventMutation, useGetEventDetailsQuery, useUploadEventImageMutation } from '../../slices/eventsApiSlice';

const EventEditScreen = () => {
    const{id: eventId} = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {data: event, isLoading, error} = useGetEventDetailsQuery(eventId);

    const [updateEvent, {isLoading: loadingUpdate}] = useUpdateEventMutation();

    const [uploadEventImage, { isLoading: loadingUpload }] = useUploadEventImageMutation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(event){
            setName(event.name);
            setPrice(event.price);
            setImage(event.image);
            setLocation(event.location);
            setDate(event.date);
            setType(event.type);
            setCountInStock(event.countInStock);
            setDescription(event.description);
        }
    }, [event])

    console.log(event);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
          const res = await uploadEventImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const updatedEvent = {
            _id: eventId,
            name,
            price,
            image,
            countInStock,
            location,
            date,
            type,
            description
        }

        const result = await updateEvent(updatedEvent);
        if(result.error){
            toast.error(result.error);
        }else {
            toast.success("Event updated");
            navigate("/admin/eventlist");
        }
    }

  return <>
        <Link to="/admin/eventlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1> Edit Events</h1>
            {loadingUpdate && <Loader />}

            {isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Form onSubmit={onSubmitHandler}>
                   <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Edit name" value={name} onChange={(e) =>setName(e.target.value)}></Form.Control>
                    </Form.Group> 
                    <Form.Group controlId="price">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Enter price" placeholder="Edit price" value={price} onChange={(e) =>setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.Control
                            label='Choose File'
                            onChange={uploadFileHandler}
                            type='file'
                        ></Form.Control>
                        {loadingUpload && <Loader />}
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter countInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='location'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='date'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Enter date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                >
                
                                </Form.Control>
                        </Form.Group>
            <Form.Group controlId='type'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter type'
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
                    </Form>
            )}
        </FormContainer>
    </>
  
}

export default EventEditScreen