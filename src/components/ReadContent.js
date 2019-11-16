import {Component} from "react";
import React from "react";

class ReadContent extends Component {
    render() {
        console.log('ReadContent');
        return(
            <article>
                <h2>{this.props.title}</h2>
                {this.props.desc}
            </article>
        )
    }
}

export default ReadContent;