import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [isreseted, setisreseted] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "Post",
        body: JSON.stringify(formik.values),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.statusMsg === "success") {
      setisreseted(true);
    } else {
      formik.setErrors({ servererror: data.message });
    }
  }
  //   reset
  const validationSchemaReset = Yup.object({
    resetCode: Yup.string().required("Reset code is required"),
  });
  const formikreset = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchemaReset,
    onSubmit: handlereset,
  });

  async function handlereset() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "Post",
        body: JSON.stringify(formikreset.values),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status === "Success") {
      console.log("su");
      navigate("/resetpass");
    } else {
      formik.setErrors({ servererror: data.message });
    }
  }

  return (
    <>
      {!isreseted && (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-7">
            <label htmlFor="email">enter your mail ro reset</label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-red-100"
              type="email"
              name="email"
              id="email"
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}

          {formik.errors?.servererror && <div>{formik.errors.servererror}</div>}
          <button type="submit" className="btn">
            {formik.isSubmitting ? (
              <i className="fa-solid fa-m fa-flip"></i>
            ) : (
              "Reset"
            )}
          </button>
        </form>
      )}
      {/* reset */}
      {isreseted && (
        <form onSubmit={formikreset.handleSubmit}>
          <div>
            <label htmlFor="resetCode">reset code</label>
            <input
              value={formikreset.values.resetCode}
              onChange={formikreset.handleChange}
              onBlur={formikreset.handleBlur}
              className="bg-red-100"
              type="text"
              name="resetCode"
              id="resetCode"
            />
          </div>
          {formikreset.errors.resetCode && formikreset.touched.resetCode && (
            <div>{formikreset.errors.resetCode}</div>
          )}

          {formikreset.errors?.servererror && (
            <div>{formikreset.errors.servererror}</div>
          )}
          <button type="submit" className="btn">
            {formikreset.isSubmitting ? (
              <i className="fa-solid fa-m fa-flip"></i>
            ) : (
              "Reset"
            )}
          </button>
        </form>
      )}
    </>
  );
}

export default ForgotPassword;
