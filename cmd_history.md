## 1일차
- npm install -g create-react-app

- cd {application directory}

- create-react-app .

- npm run start

- npm run build

- npx serve -s build


## 2일차
### react라이브러리에서 Component 오브젝트 상속받아 사용해보기 : Component Class
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
### 클래스태그에서 파라미터 넘겨주기 : props
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

### React developer tool
1. chrome extention for react : React developer tool(https://reactjs.org/community/debugging-tools.html)
   - react 로 작성된 페이지에 대해, html태그만 으로는 파악하기 어려운 react components들을 보여준다. 대.박

## 3일차   
### Compoent파일로 분리하기
- componets라는 디렉토리를 src직하에 만든후, class 별로 구분한 각 component 객체들을 파일별로 분리한다.
- 이때 각 클래스의 export 방법은 다음과 같은 두 가지가 있다.
   1. export default {ClassName} : 디폴트로 export하는 방법으로, 각 모듈에서 하나의 모듈만 default 키워드를 사용할 수 있다.
   2. export {ClassName}

### state 개념 살펴보기
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
  
## 4일차   
### 동적으로 html component 생성하기
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

### event의 onClick
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
   
### event에서 state 변경하기
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
   따라서 bind()로 해결한다.
   - 두번째 : react는 state를 변경하기 위해 `setState`라는 함수를 가지고 있으므로, 그 함수를 사용하여야 한다.
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
   
   
   
   
   
   
   
   
   
   
   
   
   
   
