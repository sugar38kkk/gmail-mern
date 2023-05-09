import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Avatar from "../../Avatar/Avatar";
import { AuthContext } from "../../../context/auth";
import { formatDate } from "../../../utils";
import "./PostContent.css";
import SyntaxHighlight from "../../SyntaxHighlight/SyntaxHighlight";
import useForm from "../../../hooks/useForm";
import { repplyPostForm } from "../../../utils/formConfig";
import useHttpClient from "../../../hooks/useHttpClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PostContent = ({ post, listRepply }) => {
  const history = useHistory();

  const { sender, date, title, body, id, to } = post;
  const [isRepply, setIsRepply] = useState(false);
  const createdAt = formatDate(date);
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(repplyPostForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    // console.log(formValues);
    const body = {
      ...formValues,
      mail: id,
      to: currentUserId !== sender.id ? sender.phone : to,
    };

    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/mail/repply`,
        "POST",
        JSON.stringify(body),
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  console.log('heelo', listRepply);

  return (
    <div className="post">
      <div className="post__body">
        <div className="post__author">
          <Avatar link={`/users/${sender.id}`} src={sender.avatar} />
          <div className="author__details">
            <Link to={`/users/${sender.id}`}>
              <h4>{sender.name}</h4>
            </Link>
            <p>To: {currentUser.name}</p>
            <p>{createdAt}</p>
          </div>
        </div>
        <h1 className="post__heading">{title}</h1>
        <div className="post__text">
          <ReactMarkdown components={SyntaxHighlight}>{body}</ReactMarkdown>
        </div>

        <div className="post__auth">
          {!isRepply && currentUserId !== sender.id && (
            <button
              onClick={() => setIsRepply(true)}
              className="auth__edit"
              to={``}
            >
              Repply
            </button>
          )}
          {isRepply && (
            <button
              onClick={() => setIsRepply(false)}
              className="auth__edit"
              to={``}
            >
              Canncel
            </button>
          )}

          {/* <DeletePost authorId={author.id} /> */}
        </div>
      </div>
      {/* {post.comments && <Comments postId={id} postAuthor={author} />} */}
      {isRepply && (
        <form
          className="form form__create"
          style={{
            width: "90%",
            margin: "0 auto",
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          {formInputs}
          <button
            onClick={postSubmitHandle}
            className="btn"
            disabled={!isFormValid()}
          >
            Submit <span>&rarr;</span>
          </button>
        </form>
      )}
      {listRepply &&
        listRepply.length > 0 &&
        listRepply.map((mail, index) => {
          return (
            <>
              <div key={index} className="post__body">
                <div className="post__author">
                  <Avatar link={`/users/${mail.sender.id}`} src={mail.sender.avatar} />
                  <div className="author__details">
                    <Link to={`/users/${mail.sender.id}`}>
                      <h4>{mail.sender.name}</h4>
                    </Link>
                    <p>To: {mail.to}</p>
                    <p>{mail.createdAt}</p>
                  </div>
                </div>
                <div className="post__text">
                  <ReactMarkdown components={SyntaxHighlight}>
                    {mail.body}
                  </ReactMarkdown>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default PostContent;
