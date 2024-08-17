import React from 'react';

const TableModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-2/3 p-4">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-semibold">All Training Sessions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
        </div>
        <div className="overflow-auto max-h-96">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Module Name</th>
                <th className="p-2">Session Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Date & Time</th>
                <th className="p-2">Location</th>
                {/* <th className="p-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.moduleName}</td>
                  <td className="p-2">{item.sessionName}</td>
                  <td className="p-2">{item.sessionDescription}</td>
                  <td className="p-2">{item.sessionDateTime ? new Date(item.sessionDateTime).toLocaleString() : 'N/A'}</td>
                  <td className="p-2">{item.sessionLink ? <a href={item.sessionLink} target="_blank" rel="noopener noreferrer">Join Session</a> : 'N/A'}</td>
                  {/* <td className="p-2">
                    <button className="bg-blue-600 text-white px-2 py-1 rounded-sm text-xs">Schedule</button>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded-sm text-xs ml-2">Start Class</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableModal;
