import React from 'react';
import Articles from '../components/Article';
import axios from 'axios';


class ArticleList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            articles: [],

        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/')
        .then( res => {
            this.setState({
                articles: res.data
            });
            
        })
    }

    render (){
        return(
            <Articles data={this.state.articles}/>
        );
    }
}

export default ArticleList;