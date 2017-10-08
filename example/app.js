import React from "react";
import { RCTForm, fieldHOC } from "../src/";

const formDSL = {
  formName: "creditAdd",
  sections: [
    {
      fields: [
        {
          fieldType: "selectItem",
          name: "user.customer",
          label: "选择客户",
          placeholder: "请选择客户",
          sceneName: "CustomerSelect",
          bindName: "user.username"
        },
        {
          fieldType: "inputItem",
          name: "user.username",
          label: "账号",
          placeholder: "请输入账号",
          type: "text"
        },
        {
          fieldType: "inputItem",
          name: "user.password",
          label: "密码",
          placeholder: "请输入密码",
          type: "password"
        },
        {
          fieldType: "inputItem",
          name: "user.phone",
          label: "电话",
          placeholder: "请输入电话号码",
          type: "phone"
        }
      ]
    }
  ]
};

@fieldHOC("inputItem")
class InputItemField extends React.Component {
  onChange = e => {
    const { input } = this.props;
    input.onChange(e.target.value);
  };

  render() {
    const {
      type,
      placeholder,
      editable,
      disabled,
      clear,
      maxLength,
      extra,
      label,
      labelNumber,
      updatePlaceholder,
      moneyKeyboardAlign,
      meta: { error, touched },
      input
    } = this.props;
    console.log("the value", input.value === "");
    return (
      <div>
        {label}:
        <input
          type={type}
          placeholder={placeholder}
          value={input.value ? input.value : null}
          disabled={disabled}
          maxLength={maxLength}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

@RCTForm
class MyForm extends React.Component {
  componentDidMount() {
    this.props.bindSubmit(this.props.submit);
  }
  render() {
    console.log(this.props);
    const { fieldRender, formProp } = this.props;
    // DSL resolve
    const cmps = formProp.sections.map((section, index) => (
      <div key={index}>{section.fields.map(field => fieldRender(field))}</div>
    ));
    console.log(cmps);
    return <div>{cmps}</div>;
  }
}
export default class App extends React.Component {
  handleBindSubmit = submit => {
    this.submit = submit;
  };
  handleSubmit = value => {
    console.log("提交", value);
  };
  onClick = () => {
    this.submit();
  };
  render() {
    return (
      <div>
        <h1>ok start!</h1>
        <MyForm
          formProp={formDSL}
          bindSubmit={this.handleBindSubmit}
          onSubmit={this.handleSubmit}
        />
        <input type="button" value="提交" onClick={this.onClick} />
      </div>
    );
  }
}
