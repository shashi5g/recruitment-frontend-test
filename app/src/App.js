import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import List from './ProposalList'
import  ProposalForm from './ProposalForm'
import  UpdateProposal from './UpdateProposal'
function App() {

  const [data, setData] = useState([]);
  const [singleRow, signleRowData] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(async () => {
    const result = await axios(
      'http://localhost:3000/proposals',
    );
    setData(result.data);

  },[]);

  const addProposal = (response,isUpdate) => {
    const newData = response.data;
      if(isUpdate){
        const index =data.findIndex(item => item.id === newData.id);
        const newdataUpdata = [...data]
        newdataUpdata[index] = newData;
        setData(newdataUpdata);
      }
      else{
        const newTodos = [...data,  {...newData} ];
        setData(newTodos);
      }
   
   
  };

  const deleteData = (id) => {
    axios.delete(`http://localhost:3000/proposals/${id}`)
    .then(function (response) {
     const updataData =  data.filter((item)=> item.id!==id);
     setData(updataData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const updateData = (id) => {
    const updataData =  data.filter((item)=> item.id===id);
    setEdit(true)
    signleRowData(updataData[0])
  }

  return (
    <div className="App">
      <ProposalForm data={data} addProposal={addProposal}/>
      <List data={data} deleteData={deleteData} updateData={updateData} />
      <UpdateProposal edit={edit} {...singleRow} addProposal={addProposal}/>
    </div>
  );
}

export default App;
