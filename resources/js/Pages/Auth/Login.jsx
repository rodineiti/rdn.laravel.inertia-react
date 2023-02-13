import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const { errors: formErrors } = usePage().props;

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("This email is invalid").required("Fill email"),
    password: Yup.string().required("Fill password"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setSubmitting(true);

      router.post("/login", {
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta
          type="description"
          content="Login User Information"
          head-key="description"
        />
      </Head>

      <main className="grid place-items-center min-h-screen">
        <div className="bg-white p-8 rounded max-w-md mx-auto border">
          <h1 className="text-3xl mb-6">Login</h1>

          {formErrors.email && (
            <div className="text-red-500 text-xs mt-1">{formErrors.email}</div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => {
              return (
                <Form className="p-4 space-y-6">
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 uppercase font-bold text-xs text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={values.email}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />
                    {touched.email && errors && errors.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 uppercase font-bold text-xs text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />
                    {touched.password && errors && errors.password && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-400 text-white rounded p-3 hover:bg-blue-500"
                    >
                      {isSubmitting ? "Processing..." : "Login"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </main>
    </>
  );
}

Login.layout = null;
