// Newsfeed
import NewsFeed from '../components/sections/NewsFeed'
import { connect } from "react-redux";
import Loader from '../components/parts/Loader';
import React, { Component } from 'react';
import ArticleFunction from '../components/cards/ArticleFunction';
import axios from 'axios'

class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articlesLoaded: false,
            timestamp: [],
            formContent: [],
            formText: [],
            formTitle: [],
            picUrl: [],
            _id: [],
            name: [],
            aggrLoaded: false,
            likes: 0,
            liked:false,
            isLoaded: false,
            aggregates: [],
            userId: [],
            socialsLoaded:false,
            userLoaded:false
        };


    }



    componentDidMount() {

        const socialId = this.props.match.params.id

        const getData = async () => {

            await fetch('/api/cards/social/' + socialId).then(res => res.json())
                .then(
                    (res) => {
                        const result = res[0]
                        const {
                            timestamp,
                            formContent,
                            formText,
                            formTitle,
                            picUrl,
                            _id,
                            name
                        } = result
                        this.setState({
                            timestamp,
                            formContent,
                            formText,
                            formTitle,
                            picUrl,
                            _id,
                            name,
                            articlesLoaded: true
                        })
                    }
                )


            await fetch('/api/socials/aggregates/' + socialId).then(res => res.json())
                .then(
                    (res) => {
                        const result = res[0]
                        const likes = result.likes
                        this.setState({
                            likes,
                            aggrLoaded: true
                        })
                    }
                )
        }


        

        getData();

       

    }

    renderArticle() {
        
        

        
        var {
            timestamp,
            formContent,
            formText,
            formTitle,
            picUrl,
            _id,
            name,
            likes,
            liked,
            userId
        } = this.state

        

        return (
            <div>
                <ArticleFunction
                userId={userId}
                date={timestamp}
                formContent={formContent}
                formText={formText}
                formTitle={formTitle}
                picUrl={picUrl}
                _id={_id}
                name={name}
                likes={likes}
                liked={liked}
                />
            </div>


        )
    }


    render() {
        var { articlesLoaded, aggrLoaded, socialsLoaded, userLoaded } = this.state

        var socials = this.props.data.socials
        const _id = this.props.match.params.id
        var profile = this.props.data.profile
        var liked

        if (socials !== null && !socialsLoaded){
            socials = socials.filter(x => x.socialId === _id)
            if (socials === null){
                liked = false
            } else {
                liked = socials[0].liked
            }

            this.setState({
                liked,
                socialsLoaded:true
            })
        }
        
        if (!userLoaded && profile !== null){
            var userId = profile._user
            this.setState({
                userId,
                userLoaded: true
            })
        }

        var isLoaded = false
        if (articlesLoaded && aggrLoaded && socialsLoaded && userLoaded) {
            isLoaded = true
        }

        switch (isLoaded) {
            case false:
                return (
                    <Loader />
                )
            case true:
                return (
                    this.renderArticle()
                )




        }

    }
}

function mapStateToProps(data) {
    return { data };
}

export default connect(mapStateToProps)(ArticlePage);

