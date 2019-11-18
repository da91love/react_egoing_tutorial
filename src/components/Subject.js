import {Component} from "react";
import React from "react";

class Subject extends Component {
    render (){
        console.log('Subject');
        return (
            <header>
                <h1 href="/">{this.props.title}</h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;