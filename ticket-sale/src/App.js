import React, { useState } from 'react';
import './App.css'; // Ensure this imports your updated CSS file

function App() {
  // State to handle notifications for each action
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [offerSwapMessage, setOfferSwapMessage] = useState('');
  const [acceptSwapMessage, setAcceptSwapMessage] = useState('');
  const [getTicketMessage, setGetTicketMessage] = useState('');
  const [returnTicketMessage, setReturnTicketMessage] = useState('');
  
  // State to handle the input for each action
  const [purchaseInput, setPurchaseInput] = useState('');
  const [offerSwapInput, setOfferSwapInput] = useState('');
  const [acceptSwapInput, setAcceptSwapInput] = useState('');
  const [getTicketInput, setGetTicketInput] = useState('');

  // Handle purchase ticket logic
  const handlePurchaseTicket = () => {
    if (!purchaseInput) {
      setPurchaseMessage('Invalid input!');
      return;
    }
    // Placeholder for purchase logic
    setPurchaseMessage('Ticket purchased successfully!');
  };

  // Handle offer swap logic
  const handleOfferSwap = () => {
    if (!offerSwapInput) {
      setOfferSwapMessage('Invalid input!');
      return;
    }
    // Placeholder for offer swap logic
    setOfferSwapMessage('Your swap offer is pending...');
  };

  // Handle accept swap logic
  const handleAcceptSwap = () => {
    if (!acceptSwapInput) {
      setAcceptSwapMessage('Invalid input!');
      return;
    }
    // Placeholder for accept swap logic
    setAcceptSwapMessage('Swap completed successfully!');
  };

  // Handle get ticket ID logic
  const handleGetTicketId = () => {
    if (!getTicketInput) {
      setGetTicketMessage('Invalid input!');
      return;
    }
    // Placeholder for ticket ID retrieval logic
    setGetTicketMessage('Your ticket ID is: 12345');
  };

  // Handle return ticket logic
  const handleReturnTicket = () => {
    // Placeholder for return ticket logic
    setReturnTicketMessage('Ticket returned successfully! Refund issued.');
  };

  return (
    <div className="app-container">
      <h1 className="title">Ticket Sale and Swap System</h1>
      <div className="card-container">
        {/* Purchase Ticket */}
        <div className="card">
          <h2>Purchase Ticket</h2>
          <input 
            type="text" 
            placeholder="Enter ticket number" 
            value={purchaseInput}
            onChange={(e) => setPurchaseInput(e.target.value)} 
          />
          <button onClick={handlePurchaseTicket}>Purchase</button>
          {purchaseMessage && <p className="notification-box">{purchaseMessage}</p>}
        </div>

        {/* Offer Swap */}
        <div className="card">
          <h2>Offer Swap</h2>
          <input 
            type="text" 
            placeholder="Enter ticket number or address" 
            value={offerSwapInput}
            onChange={(e) => setOfferSwapInput(e.target.value)} 
          />
          <button onClick={handleOfferSwap}>Offer Swap</button>
          {offerSwapMessage && <p className="notification-box">{offerSwapMessage}</p>}
        </div>
      </div>

      <div className="card-container">
        {/* Accept Offer */}
        <div className="card">
          <h2>Accept Offer</h2>
          <input 
            type="text" 
            placeholder="Enter ticket number or address" 
            value={acceptSwapInput}
            onChange={(e) => setAcceptSwapInput(e.target.value)} 
          />
          <button onClick={handleAcceptSwap}>Accept Swap</button>
          {acceptSwapMessage && <p className="notification-box">{acceptSwapMessage}</p>}
        </div>

        {/* Get Ticket Number */}
        <div className="card">
          <h2>Get Ticket Number</h2>
          <input 
            type="text" 
            placeholder="Enter wallet address" 
            value={getTicketInput}
            onChange={(e) => setGetTicketInput(e.target.value)} 
          />
          <button onClick={handleGetTicketId}>Get Ticket ID</button>
          {getTicketMessage && <p className="notification-box">{getTicketMessage}</p>}
        </div>
      </div>

      <div className="card-container">
        {/* Return Ticket */}
        <div className="card">
          <h2>Return Ticket</h2>
          <button onClick={handleReturnTicket}>Return Ticket</button>
          {returnTicketMessage && <p className="notification-box">{returnTicketMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
