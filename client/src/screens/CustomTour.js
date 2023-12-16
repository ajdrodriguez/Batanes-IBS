import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import { ImageList } from "@mui/material";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./Footer.css";

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
  const [selectedDays, setSelectedDays] = useState('Days');
  const [pax, setPax] = useState(1);
  const [transportation, setTransportation] = useState('Transportation');
  const [tourLocation, setTourLocation] = useState('Tour Locations');
  const [homestayOption, setHomestayOption] = useState('Homestay Options');
  const [selectedValues, setSelectedValues] = useState({
    pax: 1,
    transportation: 'Transportation',
    tourLocation: 'Tour Locations',
    homestayOption: 'Homestay Options',
    days: 'Days'
  });

  // Function to update selected values and filter rooms
  const updateSelectedValues = (key, value) => {
    setSelectedValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const calculateTotal = () => {
    const transportationCost = calculateTransportationCost();
    const homestayCost = calculateHomestayCost();
    const tourLocationCost = calculateTourLocationCost();

    // Sum the values
    const total = transportationCost + homestayCost + tourLocationCost;

    return total;
  };

  const transportationOptions = {
    'Van': { 1: 7000, 2: 3500, 3: 3000, 4: 2500, 5: 2500, 6: 1800, 7: 1800, 8: 1500, 9: 1500, 10: 1300 },
    'Cogon-Roof Tricycle': { 1: 1500, 2: 800 },
  };

  const homestayOptions = {
    'Homestay': { 1: 1500, 2: 1450, 3: 1400, 4: 1350, 5: 1300, 6: 1250, 7: 1200, 8: 1150, 9: 1100, 10: 1050 },
    'Mabuhay Accomodation': { 1: 3000, 2: 1900, 3: 1850, 4: 1800, 5: 1750, 6: 1700, 7: 1650, 8: 1600, 9: 1550, 10: 1500 },
  };

  const tourLocations = {
    'Batan North Island': { 1: 2500, 2: 2275, 3: 1600, 4: 1450, 5: 1400, 6: 1250, 7: 1200, 8: 1050, 9: 1050, 10: 1000 },
    'Batan South Island': { 1: 2525, 2: 2300, 3: 1625, 4: 1475, 5: 1500, 6: 1300, 7: 1275, 8: 1075, 9: 1075, 10: 1050 },
    'Sabtang': { 1: 2550, 2: 2350, 3: 1650, 4: 1650, 5: 1500, 6: 1400, 7: 1300, 8: 1100, 9: 1100, 10: 1000 },
  };

  // Given algorithm
  function maxVal(numbers, threshold) {
    const filteredNumbers = numbers.filter(num => num <= threshold);
    return filteredNumbers.length ? Math.max(...filteredNumbers) : null;
  }

  function minVal(numbers) {
    return numbers.length ? Math.min(...numbers) : null;
  }

  function bestAlgo(budget, numPeople) {
    const total = [];
    let finalOutput = [];
    let currentTotal = 0;
    let index = 0;
    let innerCounter = 0;

    for (const option1 in transportationOptions) {
      const transportCosts = transportationOptions[option1];
      const transportCost = transportCosts[numPeople] || 0;

      for (const option2 in homestayOptions) {
        const homestayCosts = homestayOptions[option2];
        const homestayCost = homestayCosts[numPeople] || 0;

        for (const option3 in tourLocations) {
          const tourCosts = tourLocations[option3];
          const tourCost = tourCosts[numPeople] || 0;

          currentTotal = transportCost + homestayCost + tourCost;
          total.push(currentTotal);
          currentTotal = 0;
        }
      }
    }

    console.log(minVal(total));
    let i = 0;

    while (i < total.length) {
      if (total[i] === minVal(total)) {
        index = i;
        break;
      }
      i += 1;
    }

    console.log(i);
    console.log(total);

    for (let i = 0; i < total.length; i++) {
      if (i === 0 && numPeople > 2) {
        continue;
      }

      for (const option1 in transportationOptions) {
        for (const option2 in homestayOptions) {
          for (const option3 in tourLocations) {
            innerCounter += 1;
            console.log(innerCounter);

            if (innerCounter - 1 >= index) {
              finalOutput = [option1, option2, option3];
              return finalOutput;
            }
          }
        }
      }
    }

    return finalOutput;
  }

  const calculateHomestayCost = () => {
    const selectedHomestayOption = selectedValues.homestayOption;
    const selectedPax = selectedValues.pax;
    const selectedDays = parseInt(selectedValues.days, 10); // Assuming 'days' is the key for the selected number of days

    let cost = 0;

    if (selectedHomestayOption === 'Homestay') {
      cost = homestay_options[selectedHomestayOption][selectedPax] || 0;
    } else if (selectedHomestayOption === 'Mabuhay Accomodation') {
      cost = homestay_options[selectedHomestayOption][selectedPax] || 0;
    }

    return cost * selectedDays || '';
  };

  // Function to calculate the total based on the selected tour location
  const calculateTourLocationCost = () => {
    const selectedTourLocation = selectedValues.tourLocation;
    const selectedPax = selectedValues.pax;

    if (tour_locations[selectedTourLocation]) {
      return tour_locations[selectedTourLocation][selectedPax] || '';
    }

    return '';
  };

  const calculateTransportationCost = () => {
    const selectedTransportation = selectedValues.transportation;
    const selectedPax = selectedValues.pax;

    if (transportation_options[selectedTransportation]) {
      return transportation_options[selectedTransportation][selectedPax] || '';
    }

    return '';
  };
  };

  // Run the algorithm on component mount
  useEffect(() => {
    const budget = 10000; // Set your budget
    const numPeople = 3; // Set the number of people
    const results = bestAlgo(budget, numPeople);
    setAlgorithmResults(results);
  }, []);

  const [algorithmResults, setAlgorithmResults] = useState(null);

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
          {/* Pax selection */}
          <select
            value={pax}
            onChange={(e) => {
              setPax(e.target.value);
              updateSelectedValues("pax", e.target.value);
            }}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Pax
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          {/* Days selection */}
          <select
            value={selectedDays}
            onChange={(e) => {
              const days = parseInt(e.target.value, 10);
              setSelectedDays(days);
              updateSelectedValues("days", days);
            }}
          >
            <option value="Days">Days</option>
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="4">4 Days</option>
          </select>
        </div>
        <div className="col-md-3">
          {/* Transportation selection */}
          <select
            value={transportation}
            onChange={(e) => {
              setTransportation(e.target.value);
              updateSelectedValues("transportation", e.target.value);
            }}
          >
            <option value="Transportation">Transportation</option>
            <option value="Van">Van</option>
            <option value="Cogon-Roof Tricycle">Cogon-Roof Tricycle</option>
          </select>
        </div>
        <div className="col-md-3">
          {/* Tour Location selection */}
          <select
            value={tourLocation}
            onChange={(e) => {
              setTourLocation(e.target.value);
              updateSelectedValues("tourLocation", e.target.value);
            }}
          >
            <option value="Tour Locations">Tour Locations</option>
            <option value="Batan North Island">Batan North Island</option>
            <option value="Batan South Island">Batan South Island</option>
            <option value="Sabtang">Sabtang</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            value={homestayOption}
            onChange={(e) => {
              setHomestayOption(e.target.value);
              updateSelectedValues("homestayOption", e.target.value);
            }}
          >
            <option value="Homestay Options">Homestay Options</option>
            <option value="Homestay">Homestay</option>
            <option value="Mabuhay Accomodation">Mabuhay Accomodation</option>
          </select>
        </div>
      </div>

      {/* Display selected values in a table */}
      <div className="row mt-3">
        <h4>Selected Values</h4>
        <div className="table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Parameter</th>
                <th scope="col">Selected Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedValues).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value === 'Days' || value === 'Transportation' || value === 'Tour Locations' || value === 'Homestay Options' ? '' : value}</td>
                </tr>
              ))}
              {/* Include the selected days in the table */}
              <tr>
                <td>Transportation Cost</td>
                <td>{calculateTransportationCost()}</td>
              </tr>
              <tr>
                <td>Homestay Cost</td>
                <td>{calculateHomestayCost()}</td>
              </tr>
              <tr>
                <td>Tour Location Cost</td>
                <td>{calculateTourLocationCost()}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Algorithm results */}
      <div className="row mt-3">
        <h4>Algorithm Results</h4>
        {algorithmResults ? (
          <ul>
            <li>Transportation: {algorithmResults[0]}</li>
            <li>Homestay: {algorithmResults[1]}</li>
            <li>Tour Location: {algorithmResults[2]}</li>
          </ul>
        ) : (
          <p>No results yet. Run the algorithm to see the options.</p>
        )}
      </div>

      <div className="row mt-5">
        {loading ? (
          <Loader />
        ) : (
          <ImageList sx={{ width: "auto", height: "auto" }} cols={3} gap={4}>
            {rooms.map((room) => (
              <Room
                key={room.id} // Make sure to provide a unique key
                room={room}
                pax={pax}
                transportation={transportation}
                tourLocation={tourLocation}
                homestayOption={homestayOption}
                days={selectedDays}
              >
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
