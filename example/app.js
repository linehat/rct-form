import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { rctForm, rctField } from "../src/";

const formDSL = {
  formName: "creditAdd",
  sections: [
    {
      fields: [
        {
          fieldType: "selectItem",
          name: "user.customer",
          label: "选择客户",
          placeholder: "请选择客户"
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
          type: "phone",
          dependencies: [
            {
              type: "and",
              rules: [
                {
                  fieldName: "user.username",
                  type: "regular",
                  value: "admin"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

@rctField("inputItem")
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
    return (
      <div>
        {label}:
        <input
          type={type}
          placeholder={placeholder}
          value={input.value ? input.value : ""}
          disabled={disabled}
          maxLength={maxLength}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

@connect(state => {
  return { state };
})
@rctForm
class MyForm extends React.Component {
  componentDidMount() {
    this.props.bindSubmit(this.props.submit);
  }
  isNeed(formName, field) {
    const dependencies = field.dependencies;
    let need = true;
    if (
      dependencies &&
      Array.isArray(dependencies) &&
      dependencies.length > 0
    ) {
      //遍历所有dependence,最外层为【且】，只要有一个不满足，则不显示
      for (const dependence of dependencies) {
        if (!this.validateDependence(dependence, formName)) {
          need = false;
          break;
        }
      }
    }
    return need;
  }

  validateDependence = ({ type, rules }, formName) => {
    let result = false;
    if (rules && Array.isArray(rules) && rules.length > 0) {
      for (const rule of rules) {
        switch (rule.type) {
          case "regular":
            const selector = formValueSelector(formName);
            const formValue = selector(this.props.state, rule.fieldName);
            const regex = new RegExp(rule.value);
            result = regex.test(String(formValue));
            break;
          default:
            break;
        }
        if (type === "or" && result) {
          break;
        }
      }
    }
    return result;
  };
  render() {
    const { getField, formProp } = this.props;
    // DSL resolve
    const cmps = formProp.sections.map((section, index) => (
      <div key={index}>
        {section.fields.map(field => {
          const CMP = getField(field.fieldType);
          if (CMP) {
            if (this.isNeed(formProp.formName, field)) {
              return <CMP {...field} key={field.name} />;
            } else {
              return null;
            }
          } else {
            return null;
          }
        })}
      </div>
    ));
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
