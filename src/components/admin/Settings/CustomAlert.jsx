import React from "react";

const alertStyles = {
  success: "bg-green-100 border-green-500 text-green-700",
  error: "bg-red-100 border-red-500 text-red-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
};

const CustomAlert = ({ type, message, onClose, onConfirm }) => {
  return (
    <div className={`border-l-4 p-4 mb-4 ${alertStyles[type]}`} role="alert">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <div>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-4 text-lg font-bold text-gray-700"
            aria-label="Close alert"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
