import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import Loader from '../Loader';
import Error from '../Error';

function AddRoom() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [name, setName] = useState('')
    const [rentPerDay, setRentPerDay] = useState()
    const [maxCount, setMaxCount] = useState()
    const [description, setDescription] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [type, setType] = useState()
    const [imageURL1, setImageURL1] = useState()
    const [imageURL2, setImageURL2] = useState()
    const [imageURL3, setImageURL3] = useState()

    async function addRoom() {
        const newRoom = {
            name,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            type,
            imageURLs: [imageURL1,
                imageURL2,
                imageURL3]
        }
        try {
            setLoading(true);
            const result = await axios.post("/api/rooms/addroom", newRoom);
            console.log(result.data)
            setLoading(false)
            Swal.fire('Room Added Successfully', "The new room has been added to the database successfully.", "success").then(result => {
                window.location.href = '/home'
            })

        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Room Addition Failed', "Something went wrong.", "error")
        }
    }

    return (
        <div className='row'>
            {loading && <Loader />}
            <div className='col-md-5'>
                <input type="text" className="form-control" placeholder='Room Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Rent per Day' value={rentPerDay} onChange={(e) => { setRentPerDay(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Max Count' value={maxCount} onChange={(e) => { setMaxCount(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Phone Number' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
            </div>
            <div className='col-md-5'>
                <input type="text" className="form-control" placeholder='Type' value={type} onChange={(e) => { setType(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Image URL 1' value={imageURL1} onChange={(e) => { setImageURL1(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Image URL 2' value={imageURL2} onChange={(e) => { setImageURL2(e.target.value) }} />
                <input type="text" className="form-control" placeholder='Image URL 3' value={imageURL3} onChange={(e) => { setImageURL3(e.target.value) }} />

                <div style={{ float: 'right' }}>
                    <button className='btn btn-primary mt-2' onClick={addRoom}> Add Room</button>
                </div>
            </div>
        </div>
    )
}

export default AddRoom