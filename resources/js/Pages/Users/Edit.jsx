import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const { user } = usePage().props;

  console.log(user);

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Fill the name"),
    email: Yup.string().email("This email is invalid").required("Fill email"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setSubmitting(true);

      router.put(`/users/${user?.id}/update`, {
        name: values.name,
        email: values.email,
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
        <title>Edit User</title>
        <meta
          type="description"
          content="Edit User Information"
          head-key="description"
        />
      </Head>

      <h1 className="text-3xl">Edit User {user?.name || ""}</h1>

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
                  htmlFor="name"
                  className="block mb-2 uppercase font-bold text-xs text-gray-700"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={values.name}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 w-full"
                />
                {touched.name && errors && errors.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>
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
                  className="border border-gray-400 p-2 w-full"
                />
                {touched.email && errors && errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-400 text-white rounded p-3 hover:bg-blue-500"
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
