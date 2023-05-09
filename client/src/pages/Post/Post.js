import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useParams } from "react-router-dom";
import PostReactions from "../../components/Post/PostReactions/PostReactions";
import PostContent from "../../components/Post/PostContent/PostContent";
import PostAuthor from "../../components/Post/PostAuthor/PostAuthor";
import ErrorModal from "../../components/Modal/ErrorModal";
import AuthModal from "../../components/Modal/AuthModal";
import { SkeletonPage } from "../../components/Skeleton/SkeletonPage";
import { AuthContext } from "../../context/auth";

const Post = (props) => {
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const [post, setPost] = useState({});
  const [listRepply, setListRepply] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { postId } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/mail/${postId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        );
        setPost(responseData.mail);
        // console.log(responseData);
      } catch (err) {}
    };
    const fetchRepply = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/mail/repply/${postId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        );
        // setPost(responseData.mail);
        console.log(responseData.mails);
        setListRepply(responseData.mails)
      } catch (err) {}
    };
    fetchPost();
    fetchRepply();
  }, [sendReq, postId]);

  return (
    <>
      {isLoading && <SkeletonPage />}
      <ErrorModal error={error} onClose={clearError} />
      {post.body && (
        <div className="container-layout-post">
          <AuthModal onClose={() => setShowModal(false)} show={showModal} />
          <div className="container-post">
            <PostContent post={post} listRepply={listRepply} />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
