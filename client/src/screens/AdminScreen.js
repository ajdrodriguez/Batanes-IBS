import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import Bookings from '../components/admin/BookingsTable';
import Rooms from '../components/admin/RoomsTable';
import Users from '../components/admin/UsersTable';
import AddRoom from '../components/admin/AddRoom';


function AdminScreen() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/home'
        }
    }, [])

    const items = [
        {
            key: '1',
            label: 'Bookings',
            children: <Bookings />
        },
        {
            key: '2',
            label: 'Rooms',
            children: <Rooms />
        },
        {
            key: '3',
            label: 'Add Room',
            children: <AddRoom />
        },
        {
            key: '4',
            label: 'Users',
            children: <Users />
        },
    ];
    return (
        <div className='m-5 mt-3'>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default AdminScreen;

