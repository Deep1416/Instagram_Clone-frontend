import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "@/config/postSlice";
import { API_END_POINT_USER } from "@/utils/db";
import { setSuggestedUsers } from "@/config/userSlice";
const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(`${API_END_POINT_USER}/users/suggested`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          //   console.log(res.data);

          dispatch(setSuggestedUsers(res?.data?.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);
};

export default useGetSuggestedUsers;
