import {Component} from "react";
import React from "react";

class TOC extends Component {
    render() {
        console.log('TOC');
        const data = this.props.data;

        const list = [];
        data.forEach((obj) => {
            list.push(
                <li key={obj.id}
                    onClick={function(e) { // Event Listener
                        debugger;
                        e.preventDefault();
                        this.props.onChangePage(obj.id);
                    }.bind(this)}>
                    <a href={`/content/${obj.id}`}>{obj.title}</a>
                </li>
            )
        });

        return (
            <nav>
                <ul>
                    {list}
                </ul>
            </nav>
        );
    }
}

// export {TOC};
export default TOC;