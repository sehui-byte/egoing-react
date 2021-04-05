import React, { Component } from "react";

class TOC extends Component{
  render(){
    var data = this.props.data;
    var i = 0;
    var lists = [];
    while(i < data.length){
      //여러개의 element를 자동으로 생성할 경우 
      //각각 key라는 props를 갖고 있어야 한다
      lists.push(
        <li key={data[i].id}>
          <a href={"/content/" + data[i].id}
            data-id = {data[i].id}
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}
            >{data[i].title}
          </a>
        </li>);
      i += 1;
    }
    return(
      lists
    );
  }
}

export default TOC;