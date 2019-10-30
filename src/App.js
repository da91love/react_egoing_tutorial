import React, {Component} from 'react';
import Subject from './components/Subject'
import Content from './components/Content'
import TOC from './components/TOC'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: {
                title: 'WEB',
                sub: 'world wide web'
            },
            content: {
                title: 'HTML',
                desc: 'HTML is Hyper Text Markup Language'
            }
        }
    }

    render (){
        return (
            <div>
                <Subject title={this.state.subject.title} sub={this.state.subject.sub}/>
                <TOC/>
                <Content title={this.state.content.title} desc={this.state.content.desc}/>
            </div>
        );
    }
}

export default App;
