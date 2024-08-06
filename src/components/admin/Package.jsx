import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import PackageModal from "./Modal/PackageModal";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";
import { toast } from "react-toastify";
import EditPackageModal from "./Modal/EditModal";

const Package = () => {
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000/";
  const [packages, setPackages] = useState([]);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [editPackageValue, setEditPackageValue] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [newPackageName, setNewPackageName] = useState("");

  ///////////////////////////////
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const openEditModal = (packageData) => {
    setEditingPackage(packageData);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingPackageId(null);
    setIsEditModalOpen(false);
    setEditingPackage(null);
  };

  const closeModal = () => {
    // setEditingPackageId(null);
    setShowModal(false);
    setNewPackageName("");
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${baseURL}api/package/get-all-package?page=1&pageSize=10&search=`
        );
        setPackages(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPackages();
  }, [baseURL, deleteSuccess]);

  const handleEdit = (id, initialPackageName) => {
    setEditingPackageId(id);
    setEditPackageValue(initialPackageName);
  };

  // const handleSave = async (id) => {
  //   try {
  //     const packageId = id;
  //     const updatedPackageData = {
  //       packageName: editPackageValue,
  //     };

  //     const response = await axios.put(
  //       `${baseURL}api/package/update-package/${packageId}`,
  //       updatedPackageData
  //     );

  //     const updatedPackages = packages.map((pkg) =>
  //       pkg._id === packageId ? { ...pkg, packageName: editPackageValue } : pkg
  //     );
  //     setPackages(updatedPackages);

  //     setEditingPackageId(null);
  //     setEditPackageValue("");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const handleSave = async (e, packageName, features, price, currency) => {
    e.preventDefault();
    try {
      console.log("dfghjk");
      console.log(features);

      // Ensure features is an array and format it if needed
      const formattedFeatures = features.map((feature) => ({
        description: feature.description.trim(),
        isActive: feature.isActive,
      }));
      console.log(formattedFeatures);
      console.log(packageName);

      // Validate price and currency
      if (typeof price !== "number" || price <= 0) {
        throw new Error("Price must be a positive number");
      }
      if (typeof currency !== "string" || !currency.trim()) {
        throw new Error("Currency must be a non-empty string");
      }

      // Make an API call to save the data
      const response = await AdminAxiosInstance.post(`api/package/create`, {
        packageName: packageName.trim(),
        features: formattedFeatures,
        price: price, // Add price to the request
        currency: currency.trim(), // Add currency to the request
      });

      if (response.data.message === "Package Created Successfully") {
        toast.success("Package Created Successfully");
      }

      // Handle the response, e.g., update state or show a success message
      console.log("Package saved successfully", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error saving package:", error.message);
      toast.error(error.message); // Show an error message if validation fails
    }
  };

  const handleCancelEdit = () => {
    setEditingPackageId(null);
    setEditPackageValue("");
  };

  const handleDelete = async (id) => {
    try {
      const packageId = id;

      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (isConfirmed) {
        await axios.delete(`${baseURL}api/package/delete-package/${packageId}`);

        setDeleteSuccess(true);

        setTimeout(() => {
          setDeleteSuccess(false);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleView = async (id) => {
    console.log("Hello This is View");

    try {
      const packageId = id;
      const response = await axios.get(
        `${baseURL}api/package/get-package-by-id/${packageId}`
      );
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleModalSave = async () => {
    try {
      const response = await axios.post(`${baseURL}api/package/create`, {
        packageName: newPackageName,
      });

      setPackages([...packages, response.data]);
      setAddSuccess(true);

      setTimeout(() => {
        setAddSuccess(false);
      }, 3000);

      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModalInputChange = (e) => {
    setNewPackageName(e.target.value);
  };

  return (
    <div className="font-poppins w-full flex flex-col p-6 col">
      <div className=" pr-2 flex justify-between">
        <h1 className="text-2xl font-semibold">Package</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2  font-poppins text-sm"
        >
          <FaCirclePlus className="text-slate-600 " />
          Add package
        </button>
      </div>

      <div className="w-full h-2 border-b border-gray-200"></div>

      {deleteSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          Package deleted successfully!
        </div>
      )}

      {addSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          Package added successfully!
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-base w-[65%] bg-[#E0EDFB] border-none">
              Package Name
            </th>
            <th className="text-left text-base bg-[#E0EDFB] border-none">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {packages.map((data, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-[#E0EDFB]"}
            >
              <td className="text-left border-none">
                {editingPackageId === data._id ? (
                  <input
                    type="text"
                    value={editPackageValue}
                    onChange={(e) => setEditPackageValue(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  data.packageName
                )}
              </td>
              <td className="text-left border-none flex gap-6 flex-wrap">
                {editingPackageId === data._id ? (
                  <>
                    <button
                      className="px-4 py-2 bg-green-500 text-white font-medium rounded-md"
                      onClick={() => handleSave(data._id)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-400 text-white font-medium rounded-md"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-md"
                    onClick={() =>
                      handleEdit(data._id, data.packageName, data.features)
                    }
                  >
                    Edit / View
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-md"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
                {/* <button
                  onClick={() =>
                    handleView(data._id, data.packageName, data.features)
                  }
                  className="px-4 py-2 bg-gray-400 text-white font-medium rounded-md"
                >
                  View
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PackageModal
        handleSave={handleSave}
        isOpen={showModal}
        closeModal={closeModal}
        onSave={handleModalSave}
        value={newPackageName}
        onChange={handleModalInputChange}
      />

      <EditPackageModal
        // handleSave={}
        isOpen={!!editingPackageId}
        onClose={closeEditModal}
        value={newPackageName}
        packageData={packages.find((pkg) => pkg._id === editingPackageId)}
      />
    </div>
  );
};

export default Package;
