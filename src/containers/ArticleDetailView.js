import React from 'react';
import axios from 'axios';
import {Card, Button} from 'antd';
import CustomForm from '../components/Form';

class ArticleDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            article: {},

        }
    }

    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`http://localhost:8000/api/${articleID}`)
        .then( res => {
            this.setState({
                article: res.data
            });
            
        })
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        axios.delete(`http://localhost:8000/api/${articleID}`)
        this.props.history.push('/');
        this.forceUpdate();
    }

    render (){
        return(
            <>
            <Card title={this.state.article.title}>
                <p>
                    {this.state.article.content}
                </p>

            </Card>
            <br />
            <CustomForm 
                requestMethod="put"
                articleID={this.props.match.params.articleID}
                btnText="Update"
                />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="Submit">Delete</Button>
                </form>
            </>
        );
    }
}

export default ArticleDetail;