import {Component} from "react";
import React from "react";

class DeleteContent extends Component {
    render() {
        console.log('DeleteContent');
        return(
            <article>
                <h2>{this.props.title}</h2>
                {this.props.desc}
            </article>
        )
    }
}

export default DeleteContent;