import {Component} from "react";
import React from "react";

class CreateContent extends Component {
    render() {
        console.log('CreateContent');
        return(
            <article>
                <h2>Create</h2>
                <form action="/create" method="post"
                      onSubmit={function(e) {
                            e.preventDefault();
                            debugger;
                            let title = e.target.title.value;
                            let desc = e.target.desc.value;
                            this.props.onSubmit(title, desc);
                            alert('submit');
                        }.bind(this)}>

                    <p>
                        <input type="text" name="title" placeholder="title"/>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description"/>
                    </p>
                    <p>
                        <input type="submit"/>
                    </p>

                </form>
            </article>
        )
    }
}

export default CreateContent;