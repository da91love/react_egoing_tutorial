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
  
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
