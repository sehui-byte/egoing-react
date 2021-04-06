import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css';


class App extends Component{
  constructor(props){
    super(props);
    //ui에 영향 주지 않는 값이므로
    //불필요한 rendering이 발생하지 않도록 state밖으로 뺐다.
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id : 2,
      welcome: {title: 'Welcome', desc:'Hello, React!'},
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      contents: [
        {id:1, title:'html', desc:'Html is HyperText...'},
        {id:2, title:'css', desc:'css is for design...'},
        {id:3, title:'JavaScript', desc: 'Javascript is for interactive...'}
      ]
    }
  }

  getReadContent(){
    var i= 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
          break;
        }
        i = i+1;
      }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        //add content to this.state.contents
        this.max_content_id = this.max_content_id +1;
        
        //1.push사용시 원본을 바꾼다
        // this.state.contents.push({
        //   id:this.max_content_id, title:_title, desc:_desc
        // })

        //2. concat사용
        // var _contents = this.state.contents.concat(
        //   { id:this.max_content_id, title:_title, desc:_desc}
        // )


        //3.배열 복제
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: newContents,
          mode:'read',
          selected_content_id: this.max_content_id 
        });
      }.bind(this)}>
      </CreateContent>
    }else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id,_title,_desc){
          //immutable
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i<_contents.length){
            if(_contents[i].id === _id){
              _contents[i]  = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i+1;
          }
          this.setState({
            contents:_contents
            
          });
        }.bind(this)}>
      </UpdateContent>
    }
    return _article;
  }

  render(){
    console.log('App render');
  
    return (
      <div className="App">

        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={
            function(){
            this.setState({mode:'welcome'});
            }.bind(this)}
        ></Subject>
        
        <TOC 
          onChangePage={
            function(id){
                this.setState({
                mode:'read',
                selected_content_id: Number(id)
              });
          }.bind(this)}

          data={this.state.contents}>
        </TOC>

       <Control onChangeMode={
         function(_mode){
            this.setState({mode: _mode});
          }.bind(this)}>
        </Control>

        {/* <Content title={_title} desc={_desc}></Content> */}
       
        {this.getContent()}
      </div>
    );
  }
}


export default App;
