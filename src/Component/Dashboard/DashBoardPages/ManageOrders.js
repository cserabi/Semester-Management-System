import React, { useState, useEffect } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import Dashboard from '../Dashboard';

const ManageOrders = () => {


  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
      .then(data => {
        setAllOrders(data)
      })
  }, [status]);

  const modalShow = id => {
    setShow(true);
  }
  const handleDelete = id => {


    const url = `http://localhost:5000/orders/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          const remaining = allOrders.filter(order => order._id !== id);
          setAllOrders(remaining);
          setShow(false);
        }

      })
  }

  const handleUpdateStatus = id => {
    const update = {
      status: 'Shipped'
    }
    const url = `http://localhost:5000/orders/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setStatus(data);
          alert('Status updated successfully');

        }
      })
  }

  return (
    <Dashboard>
      <div style={{ paddingTop: '10px', paddingBottom: '10px', backgroundColor: 'whitesmoke' }}>
        <h1 className='text-center m-3' style={{ color: '#020f24', fontWeight: 'bold' }}> Manage All Booking </h1>
        <Table className="w-100 m-auto text-center" striped bordered hover responsive style={{ color: '#020f24' }}>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Order Id</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {
              allOrders.map((list) => (
                <tr>
                  <td>{list.name}</td>
                  <td>{list.email}</td>
                  <td>{list._id}</td>

                  <td>{list.status}</td>
                  <td>
                    <button className=" btn btn-danger" onClick={() => modalShow(list._id)}>Cancel</button>
                    <button onClick={() => handleUpdateStatus(list._id)} className="btn btn-success ms-4"> Shipped</button>
                  </td>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body>Are you sure to want to cancel this booking service ?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => handleDelete(list._id)}>
                        Confirm
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </Dashboard>
  );
};

export default ManageOrders;