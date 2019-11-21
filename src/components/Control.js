import {Component} from "react";
import React from "react";

class Control extends Component {


    render (){
        console.log('Control');
        // 함수내의 this는 전역 windows를 가르키기 때문에 Control 클래스의 this로 바인드해주어야함
        const onClick = function(e, mode){
                e.preventDefault();
                this.props.onChangeMode(mode)
            }.bind(this);

        return (
            <div>
                <button href="/create" id="create" onClick={function(e){onClick(e, 'create')}}>create</button>
                <button href="/update" id="update" onClick={function(e){onClick(e, 'update')}}>update</button>
                <button href="/delete" id="delete" onClick={function(e){onClick(e, 'delete')}}>delete</button>
            </div>
        );
    }
}

export default Control;