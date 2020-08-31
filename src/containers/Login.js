import React from 'react';

import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const LoginForm = (props) => {
  const onFinish = values => {
    props.onAuth(values.username, values.password);
    props.history.push('/');
  }
  let errorMessage = null;
  if (props.error) {
      errorMessage = (
          <p>{props.error}</p>
      );
  }
  return (
    <div>
        {errorMessage}
        {
        props.loading ?
        <Spin indicator={antIcon} />
        :
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
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
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Login
            </Button> Or
            <NavLink style={{marginRight: '10px'}} to='/signup/'> Signup
            </NavLink>
            
        </Form.Item>
        </Form>
        }

    </div>
    
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);