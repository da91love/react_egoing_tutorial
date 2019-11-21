## React 주요 커맨드 알아보기

```javascript
$> npm install -g create-react-app

$> cd {application directory}

$> create-react-app .

$> npm run start

$> npm run build

$> npx serve -s build

```

- 디펜던시 관리, 디플로이, jslint등 모든 것을 알아서 해준다는게 참 편하다.
- 스크립트는 `package.json`에 기재되어 있다.

## react라이브러리에서 Component 오브젝트 상속받아 사용해보기 : Component Class
   - component 상속한 후, render함수를 override 한다.
   ``` javascript
   import React, {Component} from 'react';
   import './App.css';

   class Subject extends Component {
       render (){
           return (
               <header>
                   <h1>WEB</h1>
                   world wide web!
               </header>
           );
       }
   }

   class App extends Component {
       render (){
           return (
               <Subject></Subject>
           );
       }
   }

   export default App;
   ```
   - Component를 상속한 클래스를 태그 <> 안에 넣고 객체처럼 사용할 수 있다
   - react문법을 jsx문법이라고 부른다.
   - 계속해서 **html**을 Component를 이용해 **객체화**해보자.
   ```javascript
   import React, {Component} from 'react';
   import './App.css';

   class Subject extends Component {
       render (){
           return (
               <header>
                   <h1>WEB</h1>
                   world wide web!
               </header>
           );
       }
   }

   class TOC extends Component {
       render() {
           return (
               <nav>
                   <ul>
                       <li><a href="1.html">HTML</a></li>
                       <li><a href="2.html">CSS</a></li>
                       <li><a href="3.html">JS</a></li>
                   </ul>
               </nav>
           );
       }
   }

   class Content extends Component {
       render() {
           return(
               <article>
                   <h2>HTML</h2>
                   HTML is Hyper Text Markup Language
               </article>
           )
       }
   }

   class App extends Component {
       render (){
           return (
               <div>
                   <Subject/>
                   <TOC/>
                   <Content/>
               </div>
           );
       }
   }

   export default App;
   ``` 
   - 각 태그들이 class에 의해 객체화 된 것을 볼 수 있다.
   
## 상위 Component에서 하위 Compoment로 값 넘겨주기 : props
위의 연습코드에서 App 클래스는 Subject클래스를 태그로 받았다.   
  
이때 <Subject> 태그에 파라미터를 입력하고, Subject클래스에서 받을수는 없을까? 그렇게 할수만 잇다면 파라미터에 의해 내용이 변하는 재사용성이 높은 오브젝트를 만들 수 잇을 텐데말이다.
  
물론 가능하다. 아래 수정 전후의 소스코드를 눈여거 보길 바란다.
  
[참고: react doc- Components and Props](https://reactjs.org/docs/components-and-props.html)

`수정전`
```javascript
...

class Subject extends Component {
    render (){
        return (
            <header>
                <h1>WEB</h1>
                world wide web!
            </header>
        );
    }
}

class App extends Component {
    render (){
        return (
            <div>
                <Subject/>
                <TOC/>
                <Content/>
            </div>
        );
    }
}
```

`수정후`
```javascript
class Subject extends Component {
    render (){
        return (
            <header>
                <h1>{this.props.title}</h1>
                {this.props.sub}
            </header>
        );
    }
}

class App extends Component {
    render (){
        return (
            <div>
                <Subject title="WEB" sub="world wide web"/>
                <TOC/>
                <Content/>
            </div>
        );
    }
}

```

## React developer tool
1. chrome extention for react : React developer tool(https://reactjs.org/community/debugging-tools.html)
   - react 로 작성된 페이지에 대해, html태그만 으로는 파악하기 어려운 react components들을 보여준다. 대.박

## Compoent파일로 분리하기
- componets라는 디렉토리를 src직하에 만든후, class 별로 구분한 각 component 객체들을 파일별로 분리한다.
- 이때 각 클래스의 export 방법은 다음과 같은 두 가지가 있다.
   1. export default {ClassName} : 디폴트로 export하는 방법으로, 각 모듈에서 하나의 모듈만 default 키워드를 사용할 수 있다.
   2. export {ClassName}

## state 개념 살펴보기
- Component를 다룰 때, 외부적으로는 Props를 사용한다는 것을 위에서 배웠다.
  state란 Component를 움직이게해주는 내부논리이다.
- 코드상 state는 그저 초기화함수(constructor)에 포함된 프로퍼티로 보일 것이다. 하지만 내부적으로, state라는 이름의 프로퍼티는 특별하게 사용된다. 예를 들어, 생성자 바깥에서 setState과 같은 함수로 state의 내용을 바꿀 수 있다.
`수정전`
```javascript
class App extends Component {
    render (){
        return (
            <div>
                <Subject title="WEB" sub="world wide web"/>
                <TOC/>
                <Content/>
            </div>
        );
    }
}
``` 

`수정후`
```javascript
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

```
- render에 하드코딩 된 부분을 state 인스턴트 프로퍼티를 이용해 은닉화했다.
- jsx문법 내부에 자바스크립트를 사용하기 위해서는 {}중괄호를 사용하면 된다.
   - <Subject title={this.state.subject.title} sub={this.state.subject.sub}/> 
  
## 동적으로 html component 생성하기
`App.js`
```javascript
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
        return (
            <div>
                <Subject title={this.state.subject.title} sub={this.state.subject.sub}/>
                <TOC data={this.state.toc}/>
                <Content title={this.state.content.title} desc={this.state.content.desc}/>
            </div>
        );
    }
}

export default App;
```   

`TOC.js`
```javascript
import {Component} from "react";
import React from "react";

class TOC extends Component {
    render() {
        const data = this.props.data;

        const list = [];
        data.forEach((obj) => {
            list.push(
                <li><a href={`/content/${obj.id}`}>{obj.title}</a></li>
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
```


- 여러개의 list를 자동으로 생성할때는 아래와 같은 오류가 발생한다.
```text
Each child in a list should have a unique "key" prop.
``` 
- 이때 각 리스트가 다른 리스트와 구별될 수 있는 식별자를 attribute로 주면 해결 된다.
`TOC.js`
```javascript
import {Component} from "react";
import React from "react";

class TOC extends Component {
    render() {
        const data = this.props.data;

        const list = [];
        data.forEach((obj) => {
            list.push(
                <li key={obj.id}><a href={`/content/${obj.id}`}>{obj.title}</a></li>
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
```

## event의 onClick 구현하기
- 먼저 이벤트의 이해를 쉽게하기 위해, 기존 Subject 클래스의 Component지정을 멈추고, tag를 하드 코딩하여 보도록하자.
`app.js`
```javascript
...
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
                    <h1 href="/" onClick={(e) => {
                        alert('hi');
                        e.preventDefault();
                        debugger;
                    }}>{this.state.subject.title}</h1>
                    {this.state.subject.sub}
                </header>
                <TOC data={this.state.toc}/>
                <Content title={_title} desc={_desc}/>
            </div>
        );
    }
...

```
- jsx코드 내부에 `debugger`라는 함수를 넣으면 개발자도구에서 멈춘다.
- `onClick` attribute를 활용해 클릭 이벤트를 넣을 수 있다.
- e는 이벤트가 사용할 수 있는 다양한 프로퍼티를 갖는다.
   - `e.preventDefault()`는 태그가 갖는 기본적인 움직임을 막는 역할은 한다. 위의 코드에서는 href를 무력화하여 페이지 이동을 막는다.
   
## event에서 state 변경하기
- 클릭 이벤트에 의해 mode값이 변경되는 코드를 짜보도록하자.
`app.js`
```javascript
...
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
                        debugger;
                    }}>{this.state.subject.title}</h1>
                    {this.state.subject.sub}
                </header>
                <TOC data={this.state.toc}/>
                <Content title={_title} desc={_desc}/>
            </div>
        );
    }
...

```
- 위의 코드는 두 가지의 문제점을 가지고 있다.
   - 첫번째 : `this.state.mode = 'welcome';`에서 this는 클래스의 인스턴스가 아닌 아무것도 아닌 것이다.
      - -> bind()로 해결한다.
   - 두번째 : react는 `state`를 변경하기 위해 `setState`라는 함수를 가지고 있으므로, 그 함수를 사용하여야 한다.
      - 이때 포인트는 생성자에 들어있는 state프로퍼티가 단순한 프로퍼티가 아니라는 점이다. 
           react내에서 `state`프로퍼티는 특별한 취급을 받는다. `setState`를 하면 단순히 
           생성자의 값을 바꾸는 것이 아니라 `setState`가 호출된 후 `render`들을 다시 호출하여 
           새로운 `state`로 화면을 구성한다. 예에서는, App -> TOC -> Content 의 `render`함수를 
           새로 호출하여 변경된 값으로 새로운 화면을 구성한다. 
      
```javascript
...
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
...

```   

## event에서 bind함수 이해하기
- 아래의 Component를 상속받은 App클래스 내에서 this는 무엇을 가르킬까

`App.js`
```javascript
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...
        }    
    }

    render (){
        console.log('what is this?', this);
    
        ...

        return (

            ...
        );
    }
}

```
- react에서 Component를 상속받을 경우 this는 App클래스를 가르키고 있다는 것을 알 수 있다.
- (참고)일반적으로 this는 세가지의 다른 상황에 의해서 바인드 된다. 
[this가 바인드되는 세 가지의 경우](https://valuefactory.tistory.com/674)
   1. 객체 내부의 메서드에 바인딩 되는 경우
   2. 메서드 내부에서 바인딩 되는 경우
   3. 생성자 new로 생성해 그 인스턴스에 바인딩 되는 경우
   
     
- 이때 onClick 내부에 this는 아무것도 가르키지 않는다.
```javascript
   <h1 href="/" onClick={function(e) {
        alert('hi');
        e.preventDefault();
        this.setState({
            mode: 'welcome'
        });
        debugger;
    }.bind(this)}>{this.state.subject.title}</h1>

```   
- 따라서 상위 블록에 존재하는 this를 가져와 bind를 해줄 수 있다.  
   
## event에서 setState함수 이해하기

- 동적으로 state값을 변경할 경우 `this.setState`를 사용하여야 한다.
- 포인트는 생성자에 들어있는 state프로퍼티가 단순한 프로퍼티가 아니라는 점이다. 
react내에서 `state`프로퍼티는 특별한 취급을 받는다. `setState`를 하면 단순히 
생성자의 값을 바꾸는 것이 아니라 `setState`가 호출된 후 `render`들을 다시 호출하여 
새로운 `state`로 화면을 구성한다. 예에서는, App -> TOC -> Content 의 `render`함수를 
새로 호출하여 변경된 값으로 새로운 화면을 구성한다.   
   
   
## component 이벤트 만들기

- 소스보고 알아서하기 별로 어렵지 않음

`App.js`
```javascript
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'read',
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
        console.log('what is this?', this);
        return (

            <div>
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    onChangePage={function() {
                        if(this.state.mode === 'welcome') {
                            this.setState({
                                mode: 'read'
                            })
                        } else {
                            this.setState({
                                mode: 'welcome'
                            })
                        }

                    }.bind(this)}
                />
                <TOC data={this.state.toc}/>
                <Content title={_title} desc={_desc}/>
            </div>
        );
    }
}

```

`Subject.js`
```javascript
import {Component} from "react";
import React from "react";

class Subject extends Component {
    render (){
        return (
            <header>
                <h1 href="/" onClick={function(e) {
                    e.preventDefault();
                    this.props.onChangePage();
                }.bind(this)}>{this.props.title}</h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;
```

## html의 어트리뷰트 값을 받아 서버에서 처리하기 : 클라이언트에서 값을 받아 서버로 전달하기

`App.js`
```javascript
import React, {Component} from 'react';
import Subject from './components/Subject'
import Content from './components/Content'
import TOC from './components/TOC'
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
                <Content
                    title={this.state.content.title}
                    desc={this.state.content.desc}
                />
            </div>
        );
    }
}

export default App;
```

`TOC.js`
```javascript
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
``` 

## 이벤트 setState함수 이해하기
- 상위 컴퍼넌트 (APP)가 하위 컴퍼턴트(TOC, Subject, Content)를 조작할 때는 props 사용
- 컴퍼넌트가 자기 자신의 상태를 바꿀 때는 state
- 하위 컴퍼턴트(TOC, Subject, Content)가 상위 컴퍼넌트 (APP)를 조작할 때는 event 사용
- (props vs state 이미지)

##  create 구현, 소개 : 각 버튼 클릭시 mode 변경하기
`App.js`
```javascript
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

```

`Control.js` : 새로 생성된 파일
```javascript
import {Component} from "react";
import React from "react";

class Control extends Component {


    render (){
        // 함수내의 this는 전역 windows를 가르키기 때문에 Control 클래스의 this로 바인드해주어야함
        const onClick = function(e, mode){
                e.preventDefault();
                this.props.onChangeMode(mode)
            }.bind(this);

        return (
            <div>
                <button href="/create" id="create" onClick={function(e){onClick(e, 'create')}}>create</button>
                <button href="/update" id="update" onClick={function(e){onClick(e, 'update')}}>update</button>
                <button id="delete" onClick={function(e){onClick(e, 'delete')}}>delete</button>
            </div>
        );
    }
}

export default Control;

```

##  동적으로 컴포넌트 바꿔넣기
`App.js`
```javascript
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
            />
        }

        return (

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
```
- _article변수에 mode에 따라 Component객체가 바뀔 수 있도록 설정해줍니다.
   - 위의 코드에서는 mode에따라 ReadContent, CreateContent가 동적으로 _article에 담깁니다.
- TOC component 내부에 `mode: 'read'`를 추가하여 list를 클릭했을 때 mode가 read로 바뀌도록 합니다.
- 재밌는건 { _article } 부분인데, 변수에 Component객체를 넣고 그 변수를 사용할 수 있다는 점입니다.

## input의 값을 추출해 서버로 가져오기
`CreateContents.js`
```javascript
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
```
- html의 값들은 `e`를 경유해서 받을 수 있다. 크롬 개발자 모드에서 e를 탐색해 보면
많은 값들이 들어있는데, form값은 target 변수 안에 들어있다.
- 이때 중요한 것은 e는 각 태그의 `name` attribute 값을 보고 있는 것이다.
- 첫번째 input 태그의 `name`은 title 이였기 때문에 `e.target.title.value`으로 그 값을 추출할 수 있다.


`App.js`
```javascript
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

        return
        (
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

```
- 여기서 `this.setState`의 또다른 특징을 알 수 있다.
   ```javascript
   this.setState({
           toc: addedConent
       }
   );
   ```
   - `setState`로 toc에 새로운 값을 넣어줬음에도 불구하고, `console.log(this.state.toc);`은
   변화되기 전의 toc 값을 나타내고 있다. 이는 state가 불변성을 유지하기 때문이다.
   - 따라서 toc값을 변화시킬때, push와 같은 본 객체의 불변성을 훼손시키는 값으로 객체를 변화시키는 것보다
   새로운 독립된 객체를 만들어서 `setState`로 값을 전달하는 것을 추천한다.


## shouldComponentUpdate 함수
- `shouldComponentUpdate`함수의 특징
   1. `render` 이전에 `shouldComponentUpdate`함수가 실행된다.
   2. `shouldComponentUpdate`함수의 return값이 true이면 render가 호출되고,
false이면 render는 호출되지 않는다.
   3. `shouldComponentUpdate`의 인수를 통해, 
새롭게 업데이트된 props의 값과 초기props의 값에 접근할 수 있다.

`TOC.js`
```javascript
import {Component} from "react";
import React from "react";

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log('shouldComponentUpdate');
        if(newProps.data == this.props.data) {
            return false;
        }else {
            return true;
        }
    }

    render() {
        console.log('TOC');
        const data = this.props.data;

        const list = [];
        data.forEach((obj) => {
            list.push(
                <li key={obj.id}
                    onClick={function(e) { // Event Listener
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
```
- 앞에서 본바에 의하면 setState로 인해 state값에 변화가 인지될시
모든 render값이 재호출 되게 된다. 하지만 이것은 값이 변화하지 않은 Component에 대해서도
 render을 호출하기 때문에 매우 비효율적이다.
   - `shouldComponentUpdate`의 3번의 특징을 이용해 값이 변화하지 않은 Component값에
   대해서는 render가 시행되지 않도록 하게 컨트롤할 수 있다.
- `state`값의 원본을 초기값을 유지하지 않으면 위와같은 컨트롤이 불가능하므로
`state`값은 초기값을 불변값으로써 유지하는 것이 중요하다.

## immutable 불변성
- 불변성을 유지할 수 있도록 값을 복사해주는 함수들
   - 배열 : `Array.from(a)`
   ```javascript
   const a = [1,2,3,4];
   const b = Array.from(a);
   console.log(b, a===b)
   // Array from은 배열값을 복사하지만 단순히 a를 참조하는 참조값이 아닌 deepCopy이다.
   ```
   
   - 객체 : `Object.assign({}, a)`
   ```javascript
   const a = {a:1, b:2};
   const b = Object.assign({}, a)
   console.log(b, a===b)
   //  Object.assign는 객체값을 복사하지만 단순히 a를 참조하는 참조값이 아닌 deepCopy이다.
   ```
   
## update기능 추가하기

`app.js`
```javascript
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

```
- update후에는 바뀐 내용을 content에 덮어씌우고 setState로 re-rendering한다.

`UpdateContent.js`
```javascript
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
```