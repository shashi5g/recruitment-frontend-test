import React, { useState, useEffect } from 'react';
function List(props) {
  
  return (
    <>
    <h3>Proposal List</h3>
    <ul>
      {props.data.map(item => (
        <li key={item.id} className='row'>
          <div>{item.client}</div>
          <div>{item.monthly_cost}</div>
          <div>{item.oneoff_cost}</div>
          <div>{item.status}</div>
          <div><button type="button" className="btn btn-info"  onClick={() => props.deleteData(item.id)}>Delete</button></div>
          <div><button type="button" className="btn btn-info" onClick={() => props.updateData(item.id)}>Update</button></div>
        </li>
      ))}
    </ul>
    </>
  );
}

export default List;