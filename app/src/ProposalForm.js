import React, { useState, useEffect } from 'react';
import axios from 'axios';
export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.name]: event.target.type === 'radio' ? event.target.value : event.target.value
      });
    }
  ];
}

export function ProposalForm(props) {
  const [fields, handleFieldChange] = useFormFields({
    client: props.client,
    mcost: props.mcost,
    onecost: props.onecost,
    status: props.status
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const url = props.edit ? `http://localhost:3000/proposals/${props.id}`:`http://localhost:3000/proposals`
     const data =props.edit? {
      "id": props.id,
      "client": fields.client,
      "monthly_cost": fields.mcost,
      "oneoff_cost": fields.onecost,
      "status": fields.status

    }:
    {"id": [props.data.length - 1].id + 1,
      "client": fields.client,
      "monthly_cost": fields.mcost,
      "oneoff_cost": fields.onecost,
      "status": fields.status

    }
    if(props.edit){
    axios.put(url, data)
      .then(function (response) {
        props.addProposal(response,props.edit);
       
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      axios.post(url, data)
      .then(function (response) {
        props.addProposal(response);
     
      })
      .catch(function (error) {
        console.log(error);
      });
    }
     
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <label>
          client:
        </label>
        <input type="text" name='client'
          onChange={handleFieldChange}
          value={fields.client} />
      </div>
      <div className='row'>
        <label>
          monthly cost:
        </label>
        <input type="text" name='mcost'
          onChange={handleFieldChange}
          value={fields.mcost} />
      </div>
      <div className='row'>
        <label>
          oneoff cost:
        </label>
        <input type="text" name='onecost'
          onChange={handleFieldChange}
          value={fields.onecost} />
      </div>
      <div className='row'>
        <label>Status</label>
        <div className='row'>
          <label>
            won:
            <input type="radio" name='status'
              onClick={handleFieldChange}
              value={'won'}
              checked={fields.status === 'won'} />
          </label>
        </div>
        <div className='row'>
          <label>
            live:
            <input type="radio" name='status'
              onClick={handleFieldChange}
              value={'live'}
              checked={fields.status === 'live'} />
          </label>
        </div>
      </div>
      <div className='row center'>
        <input type="submit" value={props.edit ? `Update` : "Create new proposal"} />
      </div>
    </form>
  );
}
export default ProposalForm;
