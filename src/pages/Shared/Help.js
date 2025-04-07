// import React, { useState } from 'react';
// import "../pages/Help.css";

// const Help = () => {
//     // State for dispute submission form
//     const [transactionId, setTransactionId] = useState('');
//     const [description, setDescription] = useState('');

//     // Handler for form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // In a real app, submit data to your backend API here.
//         console.log('Dispute submitted:', { transactionId, description });
//         // Reset form fields after submission
//         setTransactionId('');
//         setDescription('');
//     };

//     return (
//         <div className="help-page">
//             <header className="help-header">
//                 <h1>Help &amp; Support</h1>
//                 <p>If you need assistance, please check our FAQs or submit a dispute.</p>
//             </header>

//             <main className="help-content">
//                 <section className="faq-section">
//                     <h2>Frequently Asked Questions</h2>
//                     <ul className="faq-list">
//                         <li>
//                             <strong>Q:</strong> How do I register?<br/>
//                             <strong>A:</strong> Click the "Register" button on the landing page and follow the instructions.
//                         </li>
//                         <li>
//                             <strong>Q:</strong> How do I submit a dispute?<br/>
//                             <strong>A:</strong> Use the dispute form provided below to submit your issue.
//                         </li>
//                         <li>
//                             <strong>Q:</strong> How can I contact support?<br/>
//                             <strong>A:</strong> Please refer to the contact section at the bottom of this page.
//                         </li>
//                     </ul>
//                 </section>

//                 <section className="dispute-section">
//                     <h2>Submit a Dispute</h2>
//                     <form onSubmit={handleSubmit} className="dispute-form">
//                         <div className="form-group">
//                             <label htmlFor="transactionId">Transaction ID:</label>
//                             <input
//                                 type="text"
//                                 id="transactionId"
//                                 value={transactionId}
//                                 onChange={(e) => setTransactionId(e.target.value)}
//                                 placeholder="Enter Transaction ID"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="description">Description:</label>
//                             <textarea
//                                 id="description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 placeholder="Describe the issue in detail"
//                                 required
//                             ></textarea>
//                         </div>
//                         <button type="submit" className="submit-btn">Submit Dispute</button>
//                     </form>
//                 </section>

//                 <section className="contact-section">
//                     <h2>Contact Us</h2>
//                     <p>If you need further assistance, please get in touch with our support team:</p>
//                     <ul>
//                         <li>Email: support@example.com</li>
//                         <li>Phone: +1-234-567-890</li>
//                     </ul>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Help;









import React, { useState } from 'react';
import "../Styles/Shared/Help.css";

/**
 * A single FAQ item with an accordion toggle.
 */
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item" onClick={toggleAccordion}>
      <div className="faq-question">
        {question}
        <span className="faq-toggle">{isOpen ? '–' : '+'}</span>
      </div>
      {isOpen && (
        <div className="faq-answer">
          {answer}
        </div>
      )}
    </div>
  );
};

const Help = () => {
  // Dispute submission form state
  const [transactionId, setTransactionId] = useState('');
  const [description, setDescription] = useState('');

  // Dispute form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend:
    console.log('Dispute submitted:', { transactionId, description });
    // Reset form fields
    setTransactionId('');
    setDescription('');
  };

  // Example FAQ data
  const faqs = [
    {
      question: 'How do I register?',
      answer: "Click the 'Register' button on the landing page and follow the instructions."
    },
    {
      question: 'How do I submit a dispute?',
      answer: 'Use the dispute form provided below to submit your issue.'
    },
    {
      question: 'How can I contact support?',
      answer: 'Please refer to the contact section at the bottom of this page.'
    }
  ];

  return (
    <div className="help-page">
      <header className="help-header">
        <h1>Help &amp; Support</h1>
        <p>If you need assistance, check our FAQs or submit a dispute below.</p>
      </header>

      <main className="help-content">
        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </section>

        {/* Dispute Submission Section */}
        <section className="dispute-section">
          <h2>Submit a Dispute</h2>
          <form onSubmit={handleSubmit} className="dispute-form">
            <div className="form-group">
              <label htmlFor="transactionId">Transaction ID:</label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter Transaction ID"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit Dispute</button>
          </form>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>If you need further assistance, please get in touch with our support team:</p>
          <ul>
            <li>Email: support@example.com</li>
            <li>Phone: +1-234-567-890</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Help;
