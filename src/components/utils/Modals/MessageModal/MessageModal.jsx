import React from "react";

const MessageModal = ({ message, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[80vh] overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          ✕
        </button>
        <h2 className="text-xl semi-bold mb-4">
          Mensaje de {message.name} {message.lastname}
        </h2>
        <div
          className="text-gray-700 whitespace-pre-wrap overflow-y-auto max-h-[60vh] p-4 rounded-md bg-gray-100"
          style={{ wordBreak: "break-word" }}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
