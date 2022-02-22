import React, { useState, useEffect } from 'react';
import  ProposalForm from './ProposalForm'

function UpdateProposal(props) {
  return (
    <div className='edit-form'>
    {props.edit && <ProposalForm addProposal={props.addProposal} edit={props.edit} id={props.id} client={props.client} mcost={props.monthly_cost} onecost={props.oneoff_cost} status={props.status}/>}
  </div>
  )

}

export default UpdateProposal;