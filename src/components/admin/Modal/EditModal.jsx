import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const currencies = ["USD", "INR"];

const EditPackageModal = ({
  isOpen,
  closeModal,
  onClose,
  handleSave,
  packageData,
}) => {
  const baseURL = process.env.REACT_APP_API_URL ;
  const [packageName, setPackageName] = useState("");
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (packageData) {
      setPackageName(packageData.packageName || "");
      setFeatures(
        packageData.features || [{ description: "", isActive: true }]
      );
      setPrice(packageData.price || "");
      setCurrency(packageData.currency || "");
    }
  }, [packageData]);

  const validateAndSave = async (e) => {
    e.preventDefault();
    if (!packageName.trim()) {
      setError("Package name cannot be empty.");
      return;
    }
    if (!price.trim() || isNaN(price) || Number(price) < 0) {
      setError("Price must be a non-negative number.");
      return;
    }
    if (!currency.trim()) {
      setError("Currency cannot be empty.");
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

    // Prepare data to send
    const updatedPackage = {
      ...packageData,
      packageName,
      features,
      price,
      currency,
    };

    try {
      const response = await axios.put(
        `${baseURL}api/package/update-package/${packageData._id}`,
        updatedPackage,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Package updated successfully!");
        
        onClose(); // Close the modal
        // handleSave(updatedPackage); // Call the handleSave function
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Failed to update package"}`
        );
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handlePackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleFeatureDescriptionChange = (index, e) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].description = e.target.value;
    setFeatures(updatedFeatures);
  };

  const handleFeatureStatusChange = (index, e) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].isActive = e.target.value === "true";
    setFeatures(updatedFeatures);
  };

  const removeFeature = (index) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
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
              <div className="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <form onSubmit={validateAndSave}>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Edit Package
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
                          value={packageName}
                          onChange={handlePackageNameChange}
                          className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={price}
                          onChange={handlePriceChange}
                          min="0" // Prevent input below 0
                          className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Currency
                        </label>
                        <select
                          name="currency"
                          id="currency"
                          value={currency}
                          onChange={handleCurrencyChange}
                          className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md"
                        >
                          <option value="" disabled>
                            Select currency
                          </option>
                          {currencies.map((curr, index) => (
                            <option key={index} value={curr}>
                              {curr}
                            </option>
                          ))}
                        </select>
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
                              onChange={(e) =>
                                handleFeatureDescriptionChange(index, e)
                              }
                              className="mt-1 border-2 border-black h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm px-2 rounded-md mr-2"
                            />
                            <select
                              value={feature.isActive ? "true" : "false"}
                              onChange={(e) =>
                                handleFeatureStatusChange(index, e)
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
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default EditPackageModal;
