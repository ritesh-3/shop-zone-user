import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DynamicForm.css'
import * as Yup from "yup";

const DynamicForm = ({
  fields,
  initialValues,
  validationSchema,
  submitBtnName,
  onSubmit,
  showPassword,
}) => {
  const generateInitialValues = () => {
    const initialVals = {};
    fields.forEach((field) => {
      initialVals[field.name] = field.initialValue || "";
    });
    return initialVals;
  };

  const generateValidationSchema = () => {
    const schema = {};
    fields.forEach((field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
    });
    return Yup.object().shape(schema);
  };

  const handleFormSubmit = (values, actions) => {
    onSubmit(values, actions);
    // if (resetAfterSubmit) actions.resetForm();
  };

  const renderFields = (values, setFieldValue) => {
    return fields.map((field, index) => {
      switch (field.type) {
        case "text":
          return (
            <div key={field.name} className="form-group">
              <Field
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                className="input-field"
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          );
        case "textbox":
          return (
            <div key={field.name} className="form-group">
              <Field
                as="textarea"
                name={field.name}
                placeholder={field.placeholder}
                className="textbox-field"
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          );
        case "password":
          return (
            <div key={field.name} className="form-group">
              <Field
                type={showPassword ? "text" : "password"}
                name={field.name}
                placeholder={field.placeholder}
                className="input-field"
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          );
        case "option":
          return (
            <div key={field.name} className="form-group">
              <Field as="select" name={field.name} className="select-field">
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          );
        case "checkbox":
          return (
            <div key={field.name} className="form-group">
              <label>
                <Field
                  type="checkbox"
                  name={field.name}
                  className="checkbox-field"
                />
                {field.placeholder}
              </label>
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          );
        case "datetime":
          return (
            <div key={field.name} className="form-group">
              <DatePicker
                name={field.name}
                placeholderText={field.placeholder}
                className="input-field"
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy-MM-dd HH:mm"
                selected={values[field.name]}
                onChange={(date) => setFieldValue(field.name, date)}
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="dynamic-form-container">
      <Formik
        initialValues={initialValues || generateInitialValues()}
        validationSchema={validationSchema || generateValidationSchema()}
        onSubmit={handleFormSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="dynamic-form">
            {renderFields(values, setFieldValue)}
            <button type="submit">{submitBtnName ?? "Submit"}</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
