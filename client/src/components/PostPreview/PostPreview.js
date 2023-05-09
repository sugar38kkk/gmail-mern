import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { formatDate } from "../../utils";
import { LikeIcon, MailIcon, MailReadIcon, TrashIcon } from "../Icons/Icons";
import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import useHttpClient from "../../hooks/useHttpClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PostPreview = (props) => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const { title, id, sender, body, date, isRead, type } = props;
  const createdAt = formatDate(date);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const [read, setRead] = useState(isRead)
  const [deleted, setDeleted] = useState(false)
  const markAsReadSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    setRead(true)
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/mail/read/${id}`,
        "PATCH",
        null,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      );
      
    } catch (err) {}
  };

  const markAsUnReadSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    setRead(false)
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/mail/unread/${id}`,
        "PATCH",
        null,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      );
      
    } catch (err) {}
  };

  const moveToTrash = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    setDeleted(true)
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/mail/moveToTrash/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      );
      
    } catch (err) {}
  };

  if(deleted) return <></>

  return (
    <div className="preview flow-content">
      <div className="preview__author"></div>
      <div className="preview__details flow-content">
        <Link to={`/posts/${id}`} className="title-link">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            className={`${!read ? "bold" : ""}`}
          >
            <p
              style={{
                width: 200,
              }}
              className="truncate"
            >
              {sender.name}
            </p>
            <span>
              <p
                style={{ maxWidth: 300, display: "inline-block" }}
                className="truncate"
              >
                {title}
              </p>
              <p
                style={{
                  marginLeft: 20,
                  display: "inline-block",
                  maxWidth: 400,
                }}
                className="truncate"
              >
                {" "}
                - {body}
              </p>
            </span>
          </div>
        </Link>
      </div>
      <div className="preview__reactions">
        <div className="preview__reactions--left">
          {
            !read && <div
            onClick={(e) => markAsReadSubmitHandle(e)}
            className="reactions__total"
          >
            <i>
              <MailReadIcon size="2rem" />
            </i>
            <span>
              <span className="reactions__text">Mark as read</span>
            </span>
          </div>
          }
          {
            read && <div
            onClick={(e) => markAsUnReadSubmitHandle(e)}
            className="reactions__total"
          >
            <i>
              <MailIcon size="2rem" />
            </i>
            <span>
              <span className="reactions__text">Mark as unread</span>
            </span>
          </div>
          }
          <div
            onClick={(e) => moveToTrash(e)}
            className="reactions__total"
          >
            <i>
              <TrashIcon size="2rem" />
            </i>
            <span>
              <span className="reactions__text">Delete</span>
            </span>
          </div>
        </div>
        
        </div>
      </div>
  );
};

export default PostPreview;
