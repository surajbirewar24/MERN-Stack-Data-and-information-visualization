// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [data, setData] = useState([]);
  const[sortOrder,setSortOrder] = useState('None');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/task');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = async (value) =>{
    if (value === 'None') {
      setSortOrder('None');
      await fetchData();
      return; 
    }
    const sortedData = [...data].sort((a,b)=>{
      if(sortOrder === 'asc'){
        return b.vibration - a.vibration;
      }else{
        return a.vibration - b.vibration;
      }
    });
    setData(sortedData);
    setSortOrder(value);
  }

  return (
    <div className="App">
      <h1>Data from JSON File</h1>
      <div className="table-controls">
        <div className="sort-dropdown">
          <label htmlFor="sort-select">Sort by Vibration:</label>
          <select id="sort-select" value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
            <option value="None">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Timestamp</th>
              <th>Machine Status</th>
              <th>Vibration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.ts}</td>
                <td>{item.machine_status}</td>
                <td>{item.vibration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;