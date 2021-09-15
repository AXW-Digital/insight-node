import ArticleSection from "../sections/ArticleSection";
import React, { Component } from 'react';

class ArticleFunction extends Component {
    render() {
        return (
            <div>
                <ArticleSection
                socialId={this.props._id}
                name={this.props.name}
                picUrl={this.props.picUrl}
                formTitle={this.props.formTitle}
                formText={this.props.formText}
                date={this.props.date}
                content={this.props.formContent}
                totalLikes={this.props.likes}
                liked={this.props.liked}
                userId={this.props.userId}
                feedType={this.props.feedType}
            />
            </div>
        );
    }
}

export default ArticleFunction;
