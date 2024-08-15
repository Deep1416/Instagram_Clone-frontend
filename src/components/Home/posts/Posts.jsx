import React from "react";
import { useSelector } from "react-redux";
import Post from "./post/Post";

const Posts = () => {
  const { posts } = useSelector((store) => store?.posts);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
