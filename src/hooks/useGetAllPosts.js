import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "@/config/postSlice";
import { API_END_POINT_POST } from "@/utils/db";
const useGetAllPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(`${API_END_POINT_POST}/post/getallpost`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setPosts(res?.data?.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);
};

export default useGetAllPosts;
