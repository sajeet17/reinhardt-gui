import React from 'react';
import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView';
import {Route} from 'react-router-dom';

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/:articleID" component={ArticleDetail} />
    </div>
);

export default BaseRouter;