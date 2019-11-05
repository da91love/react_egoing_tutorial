import React, {Component} from 'react';
// import Subject from './components/Subject'
import Content from './components/Content'
import TOC from './components/TOC'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'welcome',
            subject: {
                title: 'WEB',
                sub: 'world wide web'
            },
            welcome: {
                title: 'welcome',
                desc: 'Hello, React'
            },
            toc: [
                {
                    id: 1,
                    title: 'HTML',
                    desc: 'HTML is Hyper Text Markup Language'
                },
                {
                    id: 2,
                    title: 'CSS',
                    desc: 'CSS is for design'
                },
                {
                    id: 3,
                    title: 'JAVASCRIPT',
                    desc: 'Javascript is for control'
                }
            ],
            content: {
                title: 'HTML',
                desc: 'HTML is Hyper Text Markup Language'
            },
        }
    }

    render (){
        let _title, _desc = null;
        if(this.state.mode === 'welcome') {
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
        }else {
            _title = this.state.content.title;
            _desc = this.state.content.desc;
        }

        return (
            <div>
                {/*<Subject title={this.state.subject.title} sub={this.state.subject.sub}/>*/}
                {/* Temporary subject tag */}
                <header>
                    <h1 href="/" onClick={function(e) {
                        alert('hi');
                        e.preventDefault();
                        this.setStart({
                            mode: 'welcome'
                        });
                        debugger;
                    }.bind(this)}>{this.state.subject.title}</h1>
                    {this.state.subject.sub}
                </header>
                <TOC data={this.state.toc}/>
                <Content title={_title} desc={_desc}/>
            </div>
        );
    }
}

export default App;
