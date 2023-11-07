import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Swal from "sweetalert2";
import { Tag } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const items = [
    {
      key: "1",
      label: "Profile",
      children: (
        <div>
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Admin Privileges? : {user.isAdmin ? "Yes" : "No"}</h1>
          {user.isAdmin && (
            <h1>
              <Link to="/admin">Manage Inventory</Link>
            </h1>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Bookings",
      children: <MyBookings />,
    },
  ];

  return (
    <div className="m-5 mt-3">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default ProfileScreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getbookingsbyuserid", {
          userID: user._id,
        });
        const rooms = response.data;
        console.log(rooms);
        setBookings(rooms);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, []);

  async function CancelBooking(bookingID, roomID) {
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingID,
        roomID,
      }).data;
      console.log(result);
      setLoading(false);
      Swal.fire(
        "Reservation Cancelled",
        "Your booking has been cancelled.",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Cancellation failed", "Something went wrong.", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6"></div>
        {loading && <Loader />}
        {bookings &&
          bookings.map((booking) => {
            return (
              <div className="bs">
                <h1>{booking.room}</h1>
                <p>
                  <b>Booking ID</b>: {booking._id}
                </p>
                <p>
                  <b>Check-in Date</b>: {booking.fromDate}
                </p>
                <p>
                  <b>Check-out Date</b>: {booking.toDate}
                </p>
                <p>
                  <b>Amount</b>: ₱{booking.totalAmount}.00
                </p>
                <p>
                  <b>Status</b>:{" "}
                  {booking.status === "Cancelled" ? (
                    <Tag color="red">Cancelled</Tag>
                  ) : (
                    <Tag color="green">Confirmed</Tag>
                  )}
                </p>
                {booking.status !== "Cancelled" && (
                  <div style={{ float: "right" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        CancelBooking(booking._id, booking.roomID);
                      }}
                    >
                      {" "}
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
