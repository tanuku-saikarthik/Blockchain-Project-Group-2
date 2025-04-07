import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { addLand } from "../api.js"; // Adjust the import path as needed
//import Web3 from 'web3';
//import YourSmartContract from '../artifacts/YourSmartContract.json';
import "./SellerAddLand.css";

const AddLand = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    size: "",
    price: "",
    isForSale: false,
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? [...files] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.documents.length === 0) {
      alert("Please upload a document before submitting.");
      return;
    }

    console.log("Submitted:", formData);

    try {
      const { location, size, price, isForSale, documents } = formData;

      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append("location", location);
      formDataToSend.append("size", size);
      formDataToSend.append("price", price);
      formDataToSend.append("isForSale", isForSale);

      documents.forEach((file, index) => {
        formDataToSend.append(`documents[${index}]`, file);
      });

      // Use the addLand function from API.js
      const response = await addLand(formDataToSend);

      if (response.status === 201) {  
        alert("Land data successfully saved to Supabase!");
        console.log("Response from Backend:", response.data);

        // Smart Contract Interaction (commented out)
        /*
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();

          const networkId = await web3.eth.net.getId();
          const contractAddress = YourSmartContract.networks[networkId].address;
          const contract = new web3.eth.Contract(YourSmartContract.abi, contractAddress);

          const documentHash = "sampleDocumentHash";  // Replace this with your document hash generation logic

          await contract.methods.listProperty(location, size, price, documentHash)
            .send({ from: accounts[0] });

          alert("Land data successfully stored on the blockchain!");
        } else {
          alert("Please install MetaMask to interact with the blockchain.");
        }
        */
      } else {
        alert("Failed to save data to Supabase.");
      }
    } catch (error) {
      console.error("Error while saving data to Backend / Blockchain:", error);
      alert("An error occurred while saving data.");
    }
  };

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li className="active"><Link to="/add-land">Add a Land</Link></li>
          <li><Link to="/view-land">View Your Lands</Link></li>
          <li><Link to="/pending-verifications">Pending Verifications</Link></li>
          <li><Link to="/buyer-offers">Buyer Offers</Link></li>
          <li><Link to="/transaction-history">Transaction History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <div className="form-container">
          <h2>Add a Land</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="size"
              placeholder="Size (in sq. meters)"
              value={formData.size}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (Optional)"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="file"
              name="documents"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={handleChange}
            />
            <label className="checkbox">
              <input
                type="checkbox"
                name="isForSale"
                checked={formData.isForSale}
                onChange={handleChange}
              />
              Mark as For Sale
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLand;



