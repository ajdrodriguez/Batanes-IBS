import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import { ImageList } from "@mui/material";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState();
  const [searchKey, setSearchKey] = useState();
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    if (dates) {
      setFromDate(dates[0].format("MM-DD-YYYY"));
      setToDate(dates[1].format("MM-DD-YYYY"));

      //tempRooms
      var tempRooms = [];

      for (const room of duplicateRooms) {
        var availability = false;

        if (room.currentBookings.length > 0) {
          for (const booking of room.currentBookings) {
            if (
              !moment(moment(dates[0]).format("MM-DD-YYYY")).isBetween(
                booking.fromDate,
                booking.toDate
              ) &&
              !moment(moment(dates[1]).format("MM-DD-YYYY")).isBetween(
                booking.fromDate,
                booking.toDate
              )
            ) {
              if (
                dates[0].format("MM-DD-YYYY") !== booking.fromDate &&
                dates[0].format("MM-DD-YYYY") !== booking.toDate &&
                dates[1].format("MM-DD-YYYY") !== booking.fromDate &&
                dates[1].format("MM-DD-YYYY") !== booking.toDate
              ) {
                availability = true;
              }
            }
          }
        } else {
          availability = true;
        }

        if (availability === true) {
          tempRooms.push(room);
        }
      }

      setRooms(tempRooms);
    } else {
      setFromDate(null);
      setToDate(null);
    }
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) => {
      const roomName = room.name.toLowerCase();
      return searchKey ? roomName.includes(searchKey.toLowerCase()) : true;
    });

    setRooms(tempRooms);
  }

  function filterByType(e) {
    setType(e);
    if (e !== "all") {
      const tempRooms = duplicateRooms.filter(
        (room) =>
          e.toLowerCase() === "all" ||
          room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="MM-DD-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Room name"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          ></input>
        </div>
        <div className="col-md-3">
          <select
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="Batan Tour">Batan Tour</option>
            <option value="Compressed Tour">Compressed Tour</option>
            <option value="4 Days, 3 Nights">4 Days, 3 Nights</option>
          </select>
        </div>
      </div>

      <div className="row mt-5">
        {loading ? (
          <Loader />
        ) : (
          <ImageList sx={{ width: "auto", height: "auto" }} cols={3} gap={4}>
            {rooms.map((room) => (
              <Room room={room} fromDate={fromDate} toDate={toDate}>
                {" "}
              </Room>
            ))}
          </ImageList>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
