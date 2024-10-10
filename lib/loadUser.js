"use client"
import { setCredentials } from "@/redux/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LoadUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Ensure this runs only on the client side
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            if (user) {
                try {
                    dispatch(setCredentials(JSON.parse(user)));
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            }
        }
    }, [dispatch]);
    return null
};

export default LoadUser;
