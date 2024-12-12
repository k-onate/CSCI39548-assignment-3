/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, {useState} from 'react';

const Debits = ( { debits, setDebits, accountBalance, setAccountBalance} ) => {

  //hooks to use for setDebits and setDescriptions
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  //handles event when user clicked on add debit
  const addDebit = (e) =>
  {
    e.preventDefault();

    const newDebit = {
      id: debits.length + 1,
      description: description,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toISOString().split('T')[0]
      };
    
    //adding a new debit item to the end of the list
    setDebits([...debits, newDebit]);
    //updates balance to reflect the new item being added
    setAccountBalance((parseFloat(accountBalance) - parseFloat(newDebit.amount)).toFixed(2));

    //resets to blank
    setDescription('');
    setAmount('');
  };

  let debitsView = () => 
  {
    return debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return (
        <li key = {debit.id}>
          <div>
            <strong>Description: </strong> {debit.description}
          </div>
          <div>
            <strong>Amount: </strong> ${parseFloat(debit.amount).toFixed(2)}
          </div>
          <div>
            <strong>Date: </strong> {date}
          </div>
          <hr/>
        </li>
      );
    });
  };

  //displays list of debits with a form for user to add a new debit
  return (
    <div>
      <h1>Debits</h1>
      <h2>Account Balance: ${accountBalance}</h2>

      <form onSubmit = {addDebit}>
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
        <button type='submit'>Add Debit</button>
      </form>

      <ul>{debitsView()}</ul>

      <br/>
      <Link to="/">Return to Home</Link> 
    </div>
  );
};

export default Debits;

