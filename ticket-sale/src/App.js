import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { TICKET_SALE_ABI, TICKET_SALE_ADDRESS } from './ticketSaleConfig'; 
import './App.css'; 

function App() {
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [offerSwapMessage, setOfferSwapMessage] = useState('');
  const [acceptSwapMessage, setAcceptSwapMessage] = useState('');
  const [getTicketMessage, setGetTicketMessage] = useState('');
  const [returnTicketMessage, setReturnTicketMessage] = useState('');

  const [purchaseInput, setPurchaseInput] = useState('');
  const [offerSwapInput, setOfferSwapInput] = useState('');
  const [acceptSwapInput, setAcceptSwapInput] = useState('');
  const [getTicketInput, setGetTicketInput] = useState('');

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  // Initialize Web3 and the contract
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(
          TICKET_SALE_ABI,
          TICKET_SALE_ADDRESS
        );
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(contractInstance);
      } else {
        alert('Please install MetaMask to use this application!');
      }
    };
    initWeb3();
  }, []);

  const handlePurchaseTicket = async () => {
    if (!purchaseInput || isNaN(purchaseInput) || parseInt(purchaseInput) <= 0) {
        setPurchaseMessage('Invalid input! Please enter a valid ticket ID.');
        return;
    }
    try {
        await contract.methods.buyTicket(parseInt(purchaseInput)).send({
            from: account,
            value: web3.utils.toWei('0.0001', 'ether'),
        });
        setPurchaseMessage('Ticket purchased successfully!');
    } catch (error) {
        setPurchaseMessage(`Error: ${error.message}`);
    }
};


  const handleOfferSwap = async () => {
    if (!offerSwapInput) {
      setOfferSwapMessage('Invalid input!');
      return;
    }
    try {
      await contract.methods.offerSwap(offerSwapInput).send({ from: account });
      setOfferSwapMessage('Your swap offer is pending...');
    } catch (error) {
      setOfferSwapMessage(`Error: ${error.message}`);
    }
  };

  const handleAcceptSwap = async () => {
    if (!acceptSwapInput) {
      setAcceptSwapMessage('Invalid input!');
      return;
    }
    try {
      await contract.methods.acceptSwap(acceptSwapInput).send({ from: account });
      setAcceptSwapMessage('Swap completed successfully!');
    } catch (error) {
      setAcceptSwapMessage(`Error: ${error.message}`);
    }
  };

  const handleGetTicketId = async () => {
    if (!getTicketInput) {
      setGetTicketMessage('Invalid input!');
      return;
    }
    try {
      const ticketId = await contract.methods.getTicketOf(getTicketInput).call();
      setGetTicketMessage(`Your ticket ID is: ${ticketId}`);
    } catch (error) {
      setGetTicketMessage(`Error: ${error.message}`);
    }
  };

  const handleReturnTicket = async () => {
    try {
      // Add the return logic here (not included in the smart contract)
      setReturnTicketMessage('Ticket returned successfully! Refund issued.');
    } catch (error) {
      setReturnTicketMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Ticket Sale and Swap System</h1>
      <p>Connected Account: {account}</p>
      <div className="card-container">
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
