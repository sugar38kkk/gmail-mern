import React, { useContext, useEffect } from "react";
import { useHttpClient } from "../../hooks/useHttpClient";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { newPostForm } from "../../utils/formConfig";
import { appendData, renderRepeatedSkeletons } from "../../utils";
import ErrorModal from "../../components/Modal/ErrorModal";
import SkeletonElement from "../../components/Skeleton/SkeletonElement";

const NewPost = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { currentUser } = auth;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { renderFormInputs, renderFormValues, isFormValid, form } =
    useForm(newPostForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    // console.log(formValues);
    createMail();
  };

  const createMail = async () => {
    const body = {
      ...formValues,
    };

    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/mail`,
        "POST",
        JSON.stringify(body),
        {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  // useEffect(() => {
  //   // Gọi API hoặc thực hiện các tác vụ khởi tạo chỉ một lần
  //   // dependencies = []

  //   return () => {
  //     let isOk = true;
  //     // Hàm cleanup, giải phóng bộ nhớ và ngăn chặn memory leak
  //     console.log(Object.values(formValues));
  //     Object.values(formValues).forEach((value) => {
  //       if (!value) {
  //         isOk = false;
  //       }
  //     });
  //     if (isOk) {
  //       createMail();
  //     }
  //     // console.log("out", formValues)
  //   };
  // }, []);

  // window.addEventListener("beforeunload", function (event) {
  //   // Hiển thị popup thông báo

  //   event.preventDefault();
  //   const confirmationMessage = 'Bạn có chắc chắn muốn rời khỏi trang?';
  //   event.returnValue = confirmationMessage; // Thêm thông báo hiển thị cho người dùng

  //   if (!this.confirm(confirmationMessage)) {
  //     // Nếu người dùng xác nhận "Cancel", thực hiện hàm tại đây
  //    console.log('huhu');
  //   }

  // });

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        renderRepeatedSkeletons(<SkeletonElement type="text" />, 20)
      ) : (
        <div className="container-create-page">
          <form className="form form__create">
            <h2>Create a new mail</h2>
            {formInputs}
            <button
              onClick={postSubmitHandle}
              className="btn"
              disabled={!isFormValid()}
            >
              Submit <span>&rarr;</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewPost;
