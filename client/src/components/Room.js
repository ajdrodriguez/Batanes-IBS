import React, { useState } from "react";
import { Modal, Row, Col, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import "./Room.css";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="image-container d-flex justify-content-center">
      <ImageListItem key={room.imageURLs[0]}>
        <img
          srcSet={room.imageURLs[0]}
          src={room.imageURLs[0]}
          alt={room.name}
          onClick={handleShow}
        />
        <ImageListItemBar
          title={room.name}
          subtitle={<span>{room.type}</span>}
          position="below"
        />
        <div class="overlay">
          <p>{room.name}</p>
          <p>{room.type}</p>
        </div>
      </ImageListItem>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={7}>
              <Carousel>
                {room.imageURLs.map((url) => {
                  return (
                    <Carousel.Item>
                      <img className="d-block bigimg" src={url} />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Col>
            <Col md={5}>
              <h1>{room.name}</h1>
              <b>
                <p> Max Count : {room.maxCount}</p>
                <p> Phone Number : 0{room.phoneNumber}</p>
                <p> Type : {room.type}</p>
              </b>

              <div style={{ float: "right" }}></div>
              <p>Description: {room.description}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <buttton className="btn btn-primary m-2">Book Now</buttton>
            </Link>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
