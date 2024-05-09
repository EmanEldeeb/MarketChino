import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useUser } from "../../context/Usercontext";

function ResetPassword() {
  const { setIsLogged } = useUser();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is required"),
    newPassword: Yup.string()
      .trim()
      .matches(/^\w{6,}$/, "password must be more than 6 char")
      .required("password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "Put",
        body: JSON.stringify(formik.values),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data.token);
    if (data.token) {
      localStorage.setItem("_token", data.token);
      setIsLogged(true);
      console.log("login");
      navigate("/");

      console.log("login");
    } else {
      formik.setErrors({ servererror: data.message });
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">useremail</label>
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

      <div>
        <label htmlFor="password">newPassword</label>
        <input
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-red-200"
          type="password"
          name="newPassword"
          id="newPassword"
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div>{formik.errors.newPassword}</div>
        )}
      </div>

      {formik.errors?.servererror && <div>{formik.errors.servererror}</div>}
      <button type="submit" className="btn">
        {formik.isSubmitting ? (
          <i className="fa-solid fa-m fa-flip"></i>
        ) : (
          "login"
        )}
      </button>
    </form>
  );
}

export default ResetPassword;
