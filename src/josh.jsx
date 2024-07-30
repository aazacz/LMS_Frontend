import React from "react";
import Nav from "../Repeatable/Nav";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";
import "./Directories.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalTemplate from "../Repeatable/ModalTemplate";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Repeatable/Loader";

const Directories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiURL = process.env.REACT_APP_API_URL;
    const token = useSelector((state) => state.token);
    const role = useSelector((state) => state.role);
    const [name, setName] = useState("");
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [errorData, setErrorData] = useState("");

    const getData = async () => {
        try {
            const response = await axios.get(${ apiURL } / api / directory / get, {
                headers: {
                    authorization: Bearer ${ token },
        },
    });
    console.log(response.data);
    return response.data; // Return the data here
} catch (error) {
    setErrorData(error.response.data.error);
    if (error?.response?.data?.action === "logout") {
        setTimeout(() => {
            dispatch({ type: "logout" });
        }, 2000);
    }
}
  };

const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["directories"],
    queryFn: getData,
    staleTime: 1000,
    refetchInterval: 600000,
});

const createDirectory = async () => {
    if (name.length < 5) {
        toast.warning("Directory name must be at least 5 characters");
        return;
    }
    setLoading(true);
    await axios
        .post(
            ${ apiURL } / api / directory / create,
            {
                name,
            },
            {
                headers: {
                    authorization: Bearer ${ token },
          },
        }
      )
      .then((res) => {
                        setLoading(false);
                        setName("");
                        toast.success(res.data.message);
                        refetch();
                    })
    .catch((error) => {
        setLoading(false);
        if (error?.response?.data?.action === "logout") {
            toast.error("Session Expired !!");
            setTimeout(() => {
                dispatch({ type: "logout" });
            }, 2000);
        } else {
            toast.error(error.response.data.error);
        }
    });
  };

const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDirectory(null);
    refetch();
};

const formatDate = (date) => {
    const options = {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    const formattedDate = new Date(date).toLocaleString("en-IN", options);
    return formattedDate;
};
return (
    <>
    </>
)


{{loading ? loader : "data"}: "no data t show"}





REACT_APP_KEY = rzp_test_X7wyTequWbZztC
REACT_APP_KEY_SECRET= iSuJOcWj21RnQVUIBFeVoF1w



const handlePayment = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
      toast.warning("Please Enter Name");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address");
      return;
    }
    if (additionalPhone !== "" && additionalPhone.length !== 10) {
      toast.warning("Additional Phone number is invalid");
      return;
    }
    if (savedAddress.length === 0) {
      if (address.length < 10) {
        toast.warning("Address must have atleast 10 characters");
        return;
      }
      if (city.value === "") {
        toast.warning("Please select City");
        return;
      }
      if (pincode.value === "") {
        toast.warning("Please Select Pincode");
        return;
      }
    }

    if (date.value === "") {
      toast.warning("Please select booking date");
      return;
    }
    if (time.value === "") {
      toast.warning("Please select booking time");
      return;
    }
    const tempAddress =
      savedAddress.length === 0
        ? ${address} ${city.value} ${pincode.value}
        : ${savedAddress[addressIndex]};
    const bookingPrice = parseInt(data?.service?.price);
    console.log(Booking Price ${bookingPrice});
    var options = {
      key: key,
      key_secret: key_secret,
      amount: bookingPrice * 100,
      currency: "INR",
      name: "AIDOCITY",
      description: "AIDOCITY PAYMENT",
      handler: async function (response) {
        setSmallLoading(true);
        axios
          .post(
            ${apiURL}/api/booking/create/${user},
            {
              userDetails: {
                name,
                email,
                phone: user,
                addPhone: additionalPhone,
                address: tempAddress,
              },
              serviceDetails: {
                name: `${
                  !selectedVariant
                    ? ${data?.service?.name}
                    : `${data?.service?.name} - ${
                        data?.service?.subServices[selectedVariant - 1]
                          .subServiceName
                      }`
                }`,
                options: selectedOptions,
                price: total,
              },
              preBookingPayment: {
                price: parseInt(data?.service?.price),
                status: "Success",
                paymentID: response.razorpay_payment_id,
              },
              finalBookingPayment: {
                price: parseInt(total),
                status: "Pending",
              },
              slotDetails: {
                date: date.value,
                time: time.value,
              },
            },
            {
              headers: {
                authorization: Bearer ${token},
              },
            }
          )
          .then((res) => {
            setSmallLoading(false);
            navigate("/thank-you");
          })
          .catch((error) => {
            setSmallLoading(false);
            if (
              error.response &&
              [400, 401, 403].includes(error.response.status)
            ) {
              dispatch({ type: "logout" });
              toast.warning(error.response.data.error);
              navigate("/login");
            } else {
              toast.warning(error.response.data.error);
            }
          });
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };







const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    number: {                   
        type: String,
        trim: true,
    },
    tutorAddress: {
        
        state: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        zipcode: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
    },
    experience: {
        type: String,
        trim: true,
    },
    cv: {
        type: String,            //file
    },
    id: {
        type: String,
    },
    tutorImg: {
        type: String,
    },
    educations: [
        {
            name: {
                type: String,
                trim: true,
            },
            file: {
                type: String,//file
            },
        },
    ],
    skills: [
        {
            type: String,    
            trim: true,
        },
    ],
    projects: [
        {
            type: String,
            trim: true,     
        },
    ],
    awards: [
        {
            title: {
                type: String,
                trim: true,
            },
            file: {
                type: String,//file
            },
        },
    ],
    status: {
        type: String,
        enum: ["active", "blocked", "deleted"],
        default: "active",
        trim: true,
    },
});

const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor;




// Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

// Given a balanced string s, split it into some number of substrings such that:

// Each substring is balanced.
// Return the maximum number of balanced strings you can obtain.

 

// Example 1:

// Input: s = "RLRRLLRLRL"
// Output: 4
// Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
// Example 2:
const count = 0
for (i=0;i<=s.length;s++){
    s[i]==="L"? count++ : count--
}
// Input: s = "RLRRRLLRLL"
// Output: 2
// Explanation: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.
// Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.
// Example 3:

// Input: s = "LLLLRRRR"
// Output: 1
// Explanation: s can be split into "LLLLRRRR".
 

// Constraints:

// 2 <= s.length <= 1000
// s[i] is either 'L' or 'R'.
// s is a balanced string.
