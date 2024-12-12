/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, {useState} from 'react'

const Credits = ({credits, accountBalance, setCredits, setAccountBalance}) => {

  const [description, setDescription] = useState(''); 
  const [amount, setAmount] = useState(''); 
  const addCredit = () => { 
    const newCredit = { 
      id: credits.length + 1, 
      description: description, 
      amount: parseFloat(amount).toFixed(2), 
      date: new Date().toISOString().split('T')[0] // Format as yyyy-mm-dd 
      }; 
      // Update credits list and account balance 
    setCredits([...credits, newCredit]); 
    setAccountBalance((parseFloat(accountBalance) + parseFloat(newCredit.amount)).toFixed(2)); 
     // Reset form fields 
    setDescription(''); 
    setAmount(''); 
};


  //part 1 was just this (part 2 is everything above, uh oh, part 1 const credits only had credits in its parameters)
  return (
    <div>
      <h1>Credits</h1>
      <h2> Account Balance: ${accountBalance}</h2>

      <form onSubmit={ (e) => {e.preventDefault(); addCredit(); }}>
        <div>
          <label>Description: </label>
          <input
            type = 'text'
            value = {description}
            onChange = {(e) =>setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label> Amount: </label>
          <input
            type = "number"
            step = "0.01"
            value = {amount}
            onChange = {(e) => setAmount (e.target.value)}
            required
          />
        </div>
        <button type = "submit">Add Credit</button>
      </form>
      <ul>
        {credits.map((credit) => (
          <li key = {credit.id}>
            <div>
              <strong> Description: </strong> {credit.description}
            </div>
            <div>
              <strong>Amount: </strong> ${credit.amount}
            </div>
            <div>
              <strong>Date: </strong> {new Date(credit.date).toLocaleString()}
            </div>
            <hr/>
          </li>
        ))}
      </ul>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;











/*


  let creditsView = () => {
    const { credits } = props;
    console.log(credits);

    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key = {credit.id}> {credit.amount} {credit.description} {date} </li>   
    });
  }

  addCredit = () => {
    console.log("BUTTON");
    const {credit} = props;
  }

  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit = {props.addCredit}>
        <input type="text" name="description"/>
        <input type="number" name="amount"/>
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;

*/