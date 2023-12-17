import React, { useState } from "react";
import { ImageList } from "@mui/material";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "./CustomTour.css";

const Transportation_options = {
  "Cogon-Roof Tricycle": { 1: 1500, 2: 800 },
  Van: {
    1: 7000,
    2: 3500,
    3: 3000,
    4: 2500,
    5: 2500,
    6: 1800,
    7: 1800,
    8: 1500,
    9: 1500,
    10: 1300,
  },
};
const homestay_options = {
  Homestay: {
    1: 1500,
    2: 1450,
    3: 1400,
    4: 1350,
    5: 1300,
    6: 1250,
    7: 1200,
    8: 1150,
    9: 1100,
    10: 1050,
  },
  "Mabuhay Accomodation": {
    1: 3000,
    2: 1900,
    3: 1850,
    4: 1800,
    5: 1750,
    6: 1700,
    7: 1650,
    8: 1600,
    9: 1550,
    10: 1500,
  },
};

const tour_locations = {
  "Batan North Island": {
    1: 2500,
    2: 2275,
    3: 1600,
    4: 1450,
    5: 1400,
    6: 1250,
    7: 1200,
    8: 1050,
    9: 1050,
    10: 1000,
  },
  "Batan South Island": {
    1: 2525,
    2: 2300,
    3: 1625,
    4: 1475,
    5: 1500,
    6: 1300,
    7: 1275,
    8: 1075,
    9: 1075,
    10: 1050,
  },
  Sabtang: {
    1: 2550,
    2: 2350,
    3: 1650,
    4: 1650,
    5: 1500,
    6: 1400,
    7: 1300,
    8: 1100,
    9: 1100,
    10: 1000,
  },
};

function HomeScreen() {
  const [rooms] = useState([]);
  const [loading] = useState();
  const [selectedDays, setSelectedDays] = useState("Days");
  const [Pax, setPax] = useState(1);
  const [Transportation, setTransportation] = useState("Transportation");
  const [TourLocation, setTourLocation] = useState("Tour Locations");
  const [HomestayOption, setHomestayOption] = useState("Homestay Options");
  const [Budget, setBudget] = useState("Enter Budget");
  const [selectedValues, setSelectedValues] = useState({
    Pax: 1,
    Transportation: "Transportation",
    TourLocation: "Tour Locations",
    HomestayOption: "Homestay Options",
    Days: "Days",
  });

  // Function to update selected values and filter rooms
  const maxval = (numbers, threshold) => {
    const filteredNumbers = numbers.filter((num) => num <= threshold);
    return filteredNumbers.length > 0 ? Math.max(...filteredNumbers) : null;
  };

  const minval = (numbers) =>
    numbers.length > 0 ? Math.min(...numbers) : null;

  const bestAlgo = (budget, numPeople) => {
    const total = [];
    let index = 0;
    let innerCounter = 0;

    for (const [option1, transportCosts] of Object.entries(
      Transportation_options
    )) {
      const transportCost = transportCosts[numPeople] || 0;

      for (const [option2, homestayCosts] of Object.entries(homestay_options)) {
        const homestayCost = homestayCosts[numPeople] || 0;

        for (const [option3, tourCosts] of Object.entries(tour_locations)) {
          const tourCost = tourCosts[numPeople] || 0;
          const currentTotal = transportCost + homestayCost + tourCost;
          total.push(currentTotal);
        }
      }
    }

    const minValue = minval(total);
    const i = total.indexOf(minValue);

    if (numPeople > 2) {
      // Skip the first option
      index = i + 1;
    } else {
      index = i;
    }

    const finalOutput = [];

    for (const [i, option1] of Object.keys(Transportation_options).entries()) {
      if (i === 0 && numPeople > 2) {
        continue;
      }

      for (const option2 of Object.keys(homestay_options)) {
        for (const option3 of Object.keys(tour_locations)) {
          innerCounter += 1;

          if (innerCounter - 1 >= index) {
            finalOutput.push(option1, option2, option3);
            return finalOutput;
          }
        }
      }
    }

    return finalOutput;
  };

  const updateSelectedValues = (key, value) => {
    setSelectedValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const calculateHomestayCost = () => {
    const selectedHomestayOption = selectedValues.HomestayOption;
    const selectedPax = selectedValues.Pax;
    const selectedDays = parseInt(selectedValues.Days, 10);

    let cost = 0;

    if (selectedHomestayOption === "Homestay") {
      cost = homestay_options[selectedHomestayOption][selectedPax] || 0;
    } else if (selectedHomestayOption === "Mabuhay Accomodation") {
      cost = homestay_options[selectedHomestayOption][selectedPax] || 0;
    }

    return cost * selectedDays || "";
  };

  const calculateTourLocationCost = () => {
    const selectedTourLocation = selectedValues.TourLocation;
    const selectedPax = selectedValues.Pax;

    if (tour_locations[selectedTourLocation]) {
      return tour_locations[selectedTourLocation][selectedPax] || "";
    }

    return "";
  };

  const calculateTransportationCost = () => {
    const selectedTransportation = selectedValues.Transportation;
    const selectedPax = selectedValues.Pax;

    if (Transportation_options[selectedTransportation]) {
      return Transportation_options[selectedTransportation][selectedPax] || "";
    }

    return "";
  };

  const calculateTotal = () => {
    const TransportationCost = calculateTransportationCost();
    const homestayCost = calculateHomestayCost();
    const TourLocationCost = calculateTourLocationCost();

    // Check if all costs are available before calculating total
    if (
      TransportationCost !== "" &&
      homestayCost !== "" &&
      TourLocationCost !== ""
    ) {
      const total = TransportationCost + homestayCost + TourLocationCost;
      return total;
    } else {
      return "Incomplete";
    }
  };

  const handleBudgetChange = (e) => {
    const budgetValue = parseInt(e.target.value, 10);

    // Check if the parsed value is a valid number
    if (!isNaN(budgetValue)) {
      setBudget(budgetValue);
    } else {
      setBudget(0); // Setting a default value (you can adjust as needed)
    }
  };

  const handleRecommendation = () => {
    const result = bestAlgo(Budget, Pax);

    // Update selected values based on the algorithm result
    if (result.length === 3) {
      setTransportation(result[0]);
      setHomestayOption(result[1]);
      setTourLocation(result[2]);

      // Update selected values state
      setSelectedValues({
        Pax: Pax,
        Transportation: result[0],
        TourLocation: result[2],
        HomestayOption: result[1],
        Days: selectedDays,
      });

      // Show alert with the recommended package
      alert(`Recommended Package: ${result.join(", ")}`);
    } else {
      alert("No recommended package found."); // Handle the case where no package is recommended
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          {/* Budget input */}
          <input
            type="text"
            className="form-control"
            placeholder="Enter Budget"
            value={Budget}
            onChange={handleBudgetChange} // Listen to user input
          />
        </div>

        <div className="col-md-3">
          {/* Num People based on Pax selection */}
          <p>Number of People: {Pax}</p>
        </div>
        <div className="col-md-3">
          {/* Pax selection */}
          <select
            value={Pax}
            onChange={(e) => {
              setPax(e.target.value);
              updateSelectedValues("Pax", e.target.value);
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
              const Days = parseInt(e.target.value, 10);
              setSelectedDays(Days);
              updateSelectedValues("Days", Days);
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
            value={Transportation}
            onChange={(e) => {
              setTransportation(e.target.value);
              updateSelectedValues("Transportation", e.target.value);
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
            value={TourLocation}
            onChange={(e) => {
              setTourLocation(e.target.value);
              updateSelectedValues("TourLocation", e.target.value);
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
            value={HomestayOption}
            onChange={(e) => {
              setHomestayOption(e.target.value);
              updateSelectedValues("HomestayOption", e.target.value);
            }}
          >
            <option value="Homestay Options">Homestay Options</option>
            <option value="Homestay">Homestay</option>
            <option value="Mabuhay Accomodation">Mabuhay Accomodation</option>
          </select>
          <div className="right-align">
            <button
              className="btn btn-primary form-select custom-btn"
              onClick={handleRecommendation}
            >
              Recommend a Package For {Pax} People
            </button>
          </div>
        </div>
      </div>

      {/* Display selected values in a table */}
      {/* Display selected values in a table */}
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
                  <td>
                    {value === "Days" ||
                    value === "Transportation" ||
                    value === "Tour Locations" ||
                    value === "Homestay Options"
                      ? ""
                      : value}
                  </td>
                </tr>
              ))}
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

      <div className="row mt-3">
        <button
          className="btn btn-success"
          onClick={() => {
            // Implement logic for booking now
            alert("Book now");
          }}
        >
          Book now
        </button>
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
                Pax={Pax}
                Transportation={Transportation}
                TourLocation={TourLocation}
                HomestayOption={HomestayOption}
                Days={selectedDays}
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
