import React, {Component} from 'react';
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
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
        // Change Component according to mode
        let _article = null;
        if(this.state.mode === 'read') {
            _article = <ReadContent
                title={this.state.content.title}
                desc={this.state.content.desc}
            />
        } else if(this.state.mode === 'create') {
            _article = <CreateContent
                title={this.state.content.title}
                desc={this.state.content.desc}
                onSubmit={function(title, desc) {
                    let lToc = this.state.toc;

                    let addedConent = lToc.concat(
                        {
                            id: (lToc.length)+1,
                            title: title,
                            desc: desc
                        }
                    );

                    this.setState({
                            toc: addedConent
                        }
                    );
                    console.log(this.state.toc);
                    this.forceUpdate();
                }.bind(this)
                }
            />
        }

        return(
            <div>
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                />
                <TOC
                    data={this.state.toc}
                    onChangePage={function(id) {
                        for (var key of this.state.toc) {
                            if (key.id === id) {
                                this.setState({
                                    mode: 'read',
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
                { _article }
            </div>
        );
    }
}

export default App;
