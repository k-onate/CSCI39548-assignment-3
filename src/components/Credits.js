/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, {useState} from 'react'

const Credits = ({credits, setCredits, accountBalance, setAccountBalance}) => {

  //hooks to use for setCredits and setDescription
  const [description, setDescription] = useState(''); 
  const [amount, setAmount] = useState(''); 

  //handles event when user clicks on add credit
  const addCredit = (e) => 
  { 
    e.preventDefault();

    //initialize credit object
    const newCredit = { 
      id: credits.length + 1, 
      description: description, 
      amount: parseFloat(amount).toFixed(2), 
      date: new Date().toISOString().split('T')[0]
      }; 

    
    //adding a new credit item to the end of the list
    setCredits([...credits, newCredit]); 
    //updates balance to reflect the new item being added
    setAccountBalance((parseFloat(accountBalance) + parseFloat(newCredit.amount)).toFixed(2)); 

    //resets to blank
    setDescription(''); 
    setAmount(''); 
  };

  //displays credits in a list
  let creditsView = () => 
    {
      return credits.map((credit) => {
        let date = credit.date.slice(0,10);
        return (
          <li key = {credit.id}>
            <div>
              <strong>Description: </strong> {credit.description}
            </div>
            <div>
              <strong>Amount: </strong> ${parseFloat(credit.amount).toFixed(2)}
            </div>
            <div>
              <strong>Date: </strong> {date}
            </div>
            <hr/>
          </li>
        );
      });
    };

  //contains form for user to add a new credit item to the list displayed (at the bottom)
  return (
    <div>
      <h1>Credits</h1>
      <h2>Account Balance: ${accountBalance}</h2>

      <form onSubmit = {addCredit}>
        <div>
          <label>Description:</label>
          <input
            type='text'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Add Credit</button>
      </form>

      <ul>{creditsView()}</ul>

      <br/>
      <Link to="/">Return to Home</Link> 
    </div>
  );  
}

export default Credits;