import { useEffect, useState } from 'react';
import Datapicker from 'react-datepicker';
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@mui/material';
function Sessions() {
    const [selectedDate, setSelectedDate] = useState(new Date('2023-06-02'));
    const [availableTimes, setAvailableTimes] = useState([]);
    const [children, setChildren] = useState([]);
    const [status, setStatus] = useState([]);
    const [toggle, setToggle] = useState(true);
    //Created colums to display content in each column of table
    const columns = [
        {
            name: 'CHILD INFO',
            selector: row => `${row.name}`,
            sortable: true
        },
        {
            name: 'TIMINGS ',
            selector: row => `${row.start_time} to ${row.end_time}`,
            sortable: true,
        },
        {
            name: 'PRESENCE',
            cell: (row) => <button value='Hello' onClick={(e) => handleStatus(e)} >{{toggle}?`${row.presence}`:{status}}</button>,
            sortable: true
        },
        {
            name: 'GROUP',
            selector: row => row.group.name,
            sortable: true,
        }
    ];
    useEffect(() => {
        // Fetch available times for the selected date from API
        fetch(`http://localhost:3001/sessions?day=${selectedDate && selectedDate.toISOString().split('T')[0]}`)
            .then(response => response.json())
            .then(data => setAvailableTimes(data));
        fetch('http://localhost:3001/children/')
            .then(response => response.json())
            .then(data => setChildren(data));
    }, [selectedDate]);

    //Merging both objects available time and childrens information
    const childrenDetails = (availableTimes, children) => {
        return availableTimes.map((item, i) => {
            if (item.child_id === children[i].id) {
                //merging two objects
                return Object.assign({}, item, children[i])
            }
        })
    }

    //filter method is used to filter groupname from given data
    const handleFilter = (event) => {
        console.log(event.target.value === '')
        const data = childrenDetails(availableTimes, children);
        const filteredData = data.filter((x) => x.group.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
        setAvailableTimes(filteredData)
    }

    const handleStatus = (e) => {
        setToggle(false);
        console.log()
        const text = e.target.textContent;
        setStatus((text === 'unknown') ? 'present' : text === 'present' ? 'picked up' : 'unknown');
        }
        //method used to get next day from the user selection
    const handleDecrement = (selectedDate) => {
        const prevDate = new Date(selectedDate.toISOString().split('T')[0]);
        prevDate.setDate(selectedDate.getDate() - 1).toString();
        setSelectedDate(prevDate)
    }
//method used to get next day from the user selection
    const handleIncrement = (selectedDate) => {
        const prevDate = new Date(selectedDate.toISOString().split('T')[0]);
        prevDate.setDate(selectedDate.getDate() + 1).toString();
        setSelectedDate(prevDate);
    }
    return (
        <>
            <div style={{textAlign:'center'}}><label>Select Date:</label>
            <Datapicker
                showIcon
                label="Controlled picker"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat={'yyyy-MM-dd'}
                minDate={new Date()} />
               <br /><br />
            <Button style={{marginRight:100}}variant="contained" onClick={() => { handleDecrement(selectedDate) }}>Previous Day</Button>
            <Button variant="contained" onClick={() => { handleIncrement(selectedDate) }}>Next Day</Button><br /><br /><br />
             </div><input type='text' placeholder='Search By Group Name...' onChange={handleFilter} />
            <DataTable
                filterDisplay="menu"
                globalFilterFields={['group.name']}
                emptyMessage="No group name found."
                tableStyle={{ minWidth: '50rem' }}
                columns={columns}
                data={availableTimes}
                highlightOnHover
            />

        </>
    )
}

export default Sessions
