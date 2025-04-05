import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { registerUser } from "../store/slices/auth-slice";
import { motion } from "framer-motion";
import { registrationSchema } from "../validation/registrationSchema";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    name: "",
    email: "",
    password: "", // Not stored but validated
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: any
  ) => {
    const { name, email } = values;

    const resultAction = await dispatch(registerUser({ name, email }));

    if (registerUser.fulfilled.match(resultAction)) {
      resetForm();
      navigate("/");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900 text-slate-100">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-96 border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Create an Account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register"}
              </motion.button>

              <p className="text-sm text-center text-slate-400 mt-4">
                Already registered?{" "}
                <Link to="/login" className="text-indigo-400 hover:underline">
                  Login here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
