// import React from "react";

// const PackageModal = ({ isOpen, onClose, onSave, value, onChange }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>

//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 sm:text-left">
//                     <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Package</h3>
//                     <div className=" mb-4">
//                       <label htmlFor="packageName" className="block text-sm font-medium text-gray-700">
//                         Package Name
//                       </label>
//                       <input
//                         type="text"
//                         name="packageName"
//                         id="packageName"
//                         value={value}
//                         onChange={onChange}
//                         className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   onClick={onSave}
//                   type="button"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={onClose}
//                   type="button"
//                   className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PackageModal;

import React, { useState, useEffect } from "react";

const PackageModal = ({ isOpen, onClose, handleSave, closeModal }) => {
  const [packages, setPackages] = useState("");
  const [features, setFeatures] = useState([
    { description: "", isActive: true },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(packages);
  }, [packages]);

  // Function to validate inputs
  const validateAndSave = (e) => {
    e.preventDefault();
    if (!packages.trim()) {
      setError("Package name cannot be empty.");
      return;
    }
    const emptyFeature = features.some(
      (feature) => !feature.description.trim()
    );
    if (emptyFeature) {
      setError("All feature descriptions must be filled.");
      return;
    }
    setError(""); // Clear error message if validation passes
    handleSave(e, packages, features);
  };

  // Function to handle changes in feature inputs
  const handleFeatureChange = (index, field, newValue) => {
    const newFeatures = [...features];
    newFeatures[index][field] = newValue;
    setFeatures(newFeatures);
  };

  // Function to add a new feature input field
  const addFeature = () => {
    if (features.length < 7) {
      setFeatures([...features, { description: "", isActive: true }]);
    }
  };

  // Function to remove a feature input field
  const removeFeature = (index) => {
    if (features.length > 1) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={validateAndSave}>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Add Package
                      </h3>
                      {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                      )}
                      <div className="mb-4">
                        <label
                          htmlFor="packageName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Package Name
                        </label>
                        <input
                          type="text"
                          name="packageName"
                          id="packageName"
                          value={packages}
                          required
                          onChange={(e) => setPackages(e.target.value)}
                          className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700">
                          Features
                        </h4>
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center mt-2">
                            <input
                              type="text"
                              placeholder="Description"
                              value={feature.description}
                              required
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md mr-2"
                            />
                            <select
                              value={feature.isActive}
                              required
                              onChange={(e) =>
                                handleFeatureChange(
                                  index,
                                  "isActive",
                                  e.target.value === "true"
                                )
                              }
                              className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm px-2 rounded-md mr-2"
                            >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="mt-1 bg-red-600 text-white rounded-md px-2 py-1 text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              -
                            </button>
                          </div>
                        ))}
                        {features.length < 7 && (
                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={addFeature}
                              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Add Feature
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageModal;
