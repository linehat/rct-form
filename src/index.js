import React from "react";
import { reduxForm, Field } from "redux-form";

const fields = {};
const setField = (type, component) => (fields[type] = component);
/**
 * 
 * @param {string} type 
 * @return {React.Component}
 */
const getField = type => fields[type];

export const rctField = type => InnerComponent => {
  class InnerWrapper extends React.Component {
    render() {
      return <Field {...this.props} component={InnerComponent} />;
    }
  }
  setField(type, InnerWrapper);
  return InnerWrapper;
};

export const rctForm = ReactComponent =>
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      const { formProp, validate } = props;
      const FormComponent = reduxForm({ form: formProp.formName, validate })(
        ReactComponent
      );
      this.temp = p => <FormComponent {...p} />;
    }

    render() {
      const { formProp } = this.props;
      if (!formProp || !formProp.formName) {
        console.warn("formName is invalid, formProp:", formProp);
        return null;
      }
      const newProps = { getField, ...this.props };
      return this.temp(newProps);
    }
  };
