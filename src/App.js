import React, { Component } from 'react';
import TodoList from './TodoList.js';
import './App.css';
import _ from 'lodash';
 

//http://zetcode.com/javascript/lodash/ metodos
//https://herelodin.com/como-crear-listas-todo-list-en-react/


class App extends Component {
 
 


  render() {
    return (

      


      <div className="app">
          


        <TodoList/>
        
      </div>
    );
  }
}
 
export default App;