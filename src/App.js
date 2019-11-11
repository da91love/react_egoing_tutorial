import React, {Component} from 'react';
import Subject from './components/Subject'
import Content from './components/Content'
import TOC from './components/TOC'
import Control from './components/Control'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'read',
            subject: {
                title: 'WEB',
                sub: 'world wide web'
            },
            content: {
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
            ]
        }
    }

    render (){
        console.log('App');
        return (
            <div>
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                />
                <TOC
                    data={this.state.toc}
                    onChangePage={function(id) {
                        debugger;
                        for (var key of this.state.toc) {
                            debugger;
                            if (key.id === id) {
                                this.setState({
                                    content: {
                                        title: key.title,
                                        desc: key.desc
                                    }
                                });
                                break;
                            }

                        }
                    }.bind(this)}
                />
                <Control
                    onChangeMode={function(mode){
                        this.setState({
                           mode: mode
                        });
                    }.bind(this)}
                />
                <Content
                    title={this.state.content.title}
                    desc={this.state.content.desc}
                />
            </div>
        );
    }
}

export default App;
