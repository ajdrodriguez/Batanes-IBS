import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/Loader';
import Error from '../components/Error';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'

/*import Paymongo from "paymongo"; //to be integrated later on

const paymongo = new Paymongo(process.env.sk_test_2dVN1YAZ1myHZq9fvbHN3qqQ);*/


function BookingScreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [totalAmount, setTotalAmount] = useState();

  const firstdate = moment(fromDate, 'MM-DD-YYYY')
  const lastdate = moment(toDate, 'MM-DD-YYYY')
  const totalDays = moment.duration(lastdate.diff(firstdate)).asDays() + 1


  useEffect(() => {

    if(!localStorage.getItem('currentUser')){
      window.location.reload='/login'
    }
    const fetchData = async () => {

      try {
        setLoading(true)
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        const data = response.data;

        setTotalAmount(data.rentPerDay * totalDays)
        setRoom(data)
        setLoading(false)
      } catch (error) {

        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      room,
      userID: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromDate,
      toDate,
      totalDays,
      totalAmount,
      token
    }

    try {
      setLoading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setLoading(false)
      Swal.fire('Congratulations', ' Your reservation is booked successfully.', 'success').then(result => {
        window.location.href = '/bookings'
      })
    } catch (error) {
      setLoading(false)
      Swal.fire('Payment failed', ' Something went wrong.', 'error')
    }
  }

  return (
    <div className='m-5'>
      {loading ? (<Loader />) : room ? (<div>

        <div className='row justify-content-center mt-5 bs'>
          <div className='col-md-6'>
            <h1>{room.name}</h1>
            <img src={room.imageURLs[0]} className='bigimg'></img>
          </div>
          <div className='col-md-6' >
            <div style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                <p>From Date : {fromDate}</p>
                <p>To Date : {toDate}</p>
                <p>Max Count : {room.maxCount}</p>
              </b>
            </div>
            <div style={{ textAlign: 'right' }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days : {totalDays}</p>
                <p>Rent per Day : ₱ {room.rentPerDay}.00 </p>
                <p>Total Amount : ₱ {totalAmount}.00 </p>
              </b>
            </div>

            <div style={{ float: 'right' }}>
              <StripeCheckout
                amount={totalAmount * 100}
                token={onToken}
                stripeKey="pk_test_51O7sXhHWjCPgSPZmHzFGU4hkiLQ0TPteC97aSucePbrEazslTn0j7n2vQCjoz3NHcIuXdyaB04c1FeFEbXsalRLS00IK6l2sng"
                currency='PHP'>
                <button className='btn btn-primary'>Pay Now</button>
              </StripeCheckout>
            </div>

          </div>
        </div>
      </div>) : (<Error />)}
    </div>
  );
}

export default BookingScreen;
