import React, {Component} from 'react';
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
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
                id: 0,
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

    getContent() {
        // Change Component according to mode
        let _article = null;
        if(this.state.mode === 'read') {
            _article = <ReadContent
                title={this.state.content.title}
                desc={this.state.content.desc}
            />
        }else if(this.state.mode === 'create') {
            _article = <CreateContent
                onSubmit={function(title, desc) {
                    let toc = this.state.toc;

                    let newContent = {
                        id: (toc.length)+1,
                        title: title,
                        desc: desc
                    }
                    let addedContent = toc.concat(newContent);

                    this.setState({
                            content: newContent,
                            toc: addedContent
                        }
                    );
                    console.log(this.state.toc);
                }.bind(this)
                }
            />
        }else if(this.state.mode === 'update') {
            _article = <UpdateContent
                title={this.state.content.title}
                desc={this.state.content.desc}
                id={this.state.content.id}

                onSubmit={function(id, title, desc) {
                    const toc = Array.from(this.state.toc);
                    console.log(typeof(toc));
                    toc.forEach(function(obj) {
                        if (obj.id === id) {
                            obj.title = title;
                            obj.desc = desc;
                            return;
                        }
                    });

                    const content = Array.from(this.state.content);
                    content.id = id;
                    content.title = title;
                    content.desc = desc;

                    this.setState({
                        mode: 'read',
                        content: content,
                        toc: toc
                    });
                }.bind(this)
                }
            />
        }else if(this.state.mode === 'delete') {
            const id = this.state.content.id;
            const toc = Array.from(this.state.toc);
            toc.forEach(function(obj, i) {
                if (obj.id === id) {
                    toc.splice(i, 1);
                    return;
                }
            });

            this.setState({
                mode: 'read',
                toc: toc
            });
        }

        return _article;
    }

    render() {
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
                                        id: id,
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
                { this.getContent() }
            </div>
        );
    }
}

export default App;
