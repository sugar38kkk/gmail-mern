import React, { useState, useEffect, useContext } from "react";
import ErrorModal from "../../components/Modal/ErrorModal";
import useHttpClient from "../../hooks/useHttpClient";
import PostList from "../PostList/PostList";
import { AuthContext } from "../../context/auth";
const Posts = ({ cover, type = 'inbox' }) => {
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/mail/${type}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${localStorage.getItem('token') || currentUser.token}`,
          }
        );
        console.log(responseData);
        setLoadedPosts(responseData.mails);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq]);

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      {loadedPosts && (
        <PostList type={type} isLoading={isLoading} items={loadedPosts} cover={cover} />
      )}
    </>
  );
};

export default Posts;
