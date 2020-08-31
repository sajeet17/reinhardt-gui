import React from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import {
  Form,
  Input,
  Button,
} from 'antd';

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    props.onAuth(values.username, values.email, values.password1, values.password2);
    this.history.pushState('/');
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
      </Form.Item>

      <Form.Item
        name="password1"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"/>
      </Form.Item>

      <Form.Item
        name="password2"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"/>
      </Form.Item>

      <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Signup
            </Button> Or
            <NavLink style={{marginRight: '10px'}} to='/login/'> Login
            </NavLink>
            
        </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);