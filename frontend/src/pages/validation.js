import React from "react";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import { object, string } from "yup";

const NameValidation = object().shape({
  firstName: string().required("Required"),
});

// const MySpecialField = () => {
//   const [field, meta] = useField("firstName");
//   return (
//     <div>
//       <input {...field} className="border-2" />
//       {meta.touched && meta.error && <div>{meta.error}</div>}
//     </div>
//   );
// };

function App() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="App">
      <Formik
        initialValues={{
          firstName: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={NameValidation}
      >
        {() => {
          return (
            <Form className="h-screen flex content-center flex-col justify-center">
              <div className="space-x-4 flex content-center justify-center">
                <div>
                  <Field name="firstName" className="border-2" />
                  <ErrorMessage name="firstName" component="div" />
                </div>
                {/* <MySpecialField /> */}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;