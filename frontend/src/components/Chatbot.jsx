import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-1 right-1 z-10">
      <button
        onClick={toggleExpansion}
        className="bg-blue-500 text-white p-3 rounded-full shadow-md focus:outline-none"
      >
        {isExpanded ? <FaTimes size={20} /> : <FaRobot size={20} />}
      </button>

      {isExpanded && (
        <div className="mt-2 bg-white rounded-lg shadow-lg">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/skvxT41WhTZr3YQMULUdr"
            width="100%"
            style={{ height: "70%", minHeight: "500px", width: "350px" }}
            frameBorder="0"
            title="Chatbot"
            className="rounded-b-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
