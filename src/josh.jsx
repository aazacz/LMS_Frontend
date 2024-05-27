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
                type: String,
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
                type: String,
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