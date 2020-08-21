import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestMethod, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        
        switch (requestMethod) {
            case 'post':
                return axios.post('http://localhost:8000/api/', {
                    title: title,
                    content: content
                })
                .then( res => console.log(res))
                .catch(err => console.error(err));
            
            case 'put':
                return axios.put(`http://localhost:8000/api/${articleID}/`, {
                    title: title,
                    content: content
                })
                .then( res => console.log(res))
                .catch(err => console.error(err));
            default:
                
        }
    }

    render() {
        return (
            <>
                <Form onSubmitCapture={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestMethod,
                    this.props.articleID)}>
                    <Form.Item label="Title">
                        <Input name="title" placeholder="Place a title here" />
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input name="content" placeholder="Enter content here" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </>
        );

    }
}

export default CustomForm;