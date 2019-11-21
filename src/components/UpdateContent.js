import {Component} from "react";
import React from "react";

class UpdateContent extends Component {
    render() {
        console.log('CreateContent');
        return(
            <article>
                <h2>Update</h2>
                <form action="/create" method="post"
                      onSubmit={function(e) {
                            e.preventDefault();
                            debugger;
                            let id = this.props.id;
                            let title = e.target.title.value;
                            let desc = e.target.desc.value;
                            this.props.onSubmit(id, title, desc);
                            alert('submit');
                        }.bind(this)}>

                    <p>
                        <input type="text" name="title" placeholder="title" defaultValue={this.props.title}/>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description" defaultValue={this.props.desc}/>
                    </p>
                    <p>
                        <input type="submit"/>
                    </p>

                </form>
            </article>
        )
    }
}

export default UpdateContent;