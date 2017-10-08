import React from "react";
import { reduxForm, Field } from "redux-form";

const fields = {};
const setField = (type, component) => (fields[type] = component);
const getField = type => fields[type];
const fieldRender = field => {
  const CMP = getField(field.fieldType);
  if (CMP) {
    return <CMP {...field} key={field.name} />;
  } else {
    return null;
  }
};

export const fieldHOC = type => InnerComponent => {
  class InnerWrapper extends React.Component {
    render() {
      return <Field {...this.props} component={InnerComponent} />;
    }
  }
  setField(type, InnerWrapper);
  return InnerWrapper;
};

export const RCTForm = ReactComponent =>
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
      const newProps = { fieldRender, ...this.props };
      return this.temp(newProps);
    }
  };
