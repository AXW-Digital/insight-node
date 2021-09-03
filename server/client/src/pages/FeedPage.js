// Newsfeed
import NewsFeed from '../components/sections/NewsFeed'
import { connect } from "react-redux";
import Loader from '../components/parts/Loader';

import React, { Component } from 'react';

class FeedPage extends Component {
    render() {
        const socials = this.props.data.socials

        switch (socials) {
            case null:
                return (
                    <Loader />
                )
            default:
                return (
                    <div>
                        <NewsFeed socials={socials}/>
                    </div>
                )
        }

    }
}

function mapStateToProps(data) {
    return { data };
}

export default connect(mapStateToProps)(FeedPage);
