import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import useAuth from '../../Hook/useAuth';



const AddReview = () => {

  const nameRef = useRef();
  const ratingRef = useRef();
  const commentRef = useRef();
  const { user } = useAuth();


  const handleAddUser = e => {

    const name = nameRef.current.value;
    const review = ratingRef.current.value;
    const comment = commentRef.current.value;




    const newreview = { name, review, comment, user }
    // const newreview.user = user;

    fetch('http://localhost:5000/reviews', {

      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },

      body: JSON.stringify(newreview)
    })

      .then(res => res.json())
      .then(data => {
        if (data.insertedId > 0) {
          alert('successfully added new user');
          e.target.reset();
        }
      })
    e.preventDefault();
  }
  return (



    <div className="container">
      <h4 className="text-center">Share your experience with us</h4>
      <div className="row">

        <div className="col-md-3"></div>
        <div className="col-md-6 shadow">
          <Form onSubmit={handleAddUser}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="Text"
                placeholder="name@example.com"
                ref={nameRef}
              />
              <label htmlFor="floatingInputCustom">Write your Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="Password"
                ref={ratingRef}


              />



              <label htmlFor="floatingPasswordCustom">Share your experience feedback (0 - 5) </label>
            </Form.Floating>

            <Form.Floating className="mb-3">

              <Form.Control
                id="floatingPasswordCustom"
                type="text"
                placeholder="text"
                ref={commentRef}
              />
              <label htmlFor="floatingPasswordCustom">Write your comment about work experience </label>
            </Form.Floating>

            <input to='/add/review' type="submit" value="Submit" className="btn btn-primary btn-organization p-3 w-100 mb-3" />
          </Form>

        </div>
        <div className="col-md-3"></div>
      </div>
    </div>

  );

};

export default AddReview;