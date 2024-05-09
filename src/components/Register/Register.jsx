import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name must be more than 3 char")
      .max(10, "name must be less than 10 char")
      .required("name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("email is required"),
    password: Yup.string()
      .trim()
      .matches(/^\w{6,}$/, "password must be more than 6 char")
      .required("password is required"),
    rePassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password")], "confirm password doesn't match password")
      .required("confirm password is reguired"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyption phone number")
      .required("phone is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "Post",
        body: JSON.stringify(formik.values),
        headers: { "Content-Type": "application/json" },
      }
    );
    const { message } = await res.json();
    if (message === "success") {
      console.log("reg");
      navigate("/login");
    } else {
      formik.setErrors({ servererror: message });
      console.log("e");
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">userName</label>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          className="bg-red-200"
          name="name"
          id="name"
        />
        {formik.errors.name && formik.touched.name && (
          <div>{formik.errors.name}</div>
        )}
      </div>
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
        <label htmlFor="password">password</label>
        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-red-200"
          type="password"
          name="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password && (
          <div>{formik.errors.password}</div>
        )}
      </div>
      <div>
        <label htmlFor="repassword">confirm password</label>
        <input
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-red-300"
          type="password"
          name="rePassword"
          id="repassword"
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div>{formik.errors.rePassword}</div>
        )}
      </div>
      <div>
        <label htmlFor="phone">phone</label>
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-red-400"
          type="tel"
          name="phone"
          id="phone"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div>{formik.errors.phone}</div>
        )}
      </div>
      {formik.errors?.servererror && <div>{formik.errors.servererror}</div>}
      <button type="submit" className="btn">
        {formik.isSubmitting ? (
          <i className="fa-solid fa-m fa-flip"></i>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
}

export default Register;
