import React, { Component } from 'react';
import Item from './ToDo.js';
import _ from 'lodash';
import firebase from 'firebase';
 
/*
npm i g lodash
npm install g firebase */

//muchos tutoriales usados
//http://zetcode.com/javascript/lodash/ metodos
//https://herelodin.com/como-crear-listas-todo-list-en-react/
//https://www.youtube.com/watch?v=pcvOGaPUozo
//https://www.youtube.com/watch?v=qPV-pKUmAv4


var firebaseConfig = {
    apiKey: "AIzaSyDHPxpw6dleZMAvinburVTu8-5abzR9_38",
    authDomain: "tarea6ldaw.firebaseapp.com",
    databaseURL: "https://tarea6ldaw.firebaseio.com",
    projectId: "tarea6ldaw",
    storageBucket: "tarea6ldaw.appspot.com",
    messagingSenderId: "584220697607",
    appId: "1:584220697607:web:7b9b61489bf6aa189e76a2",
    measurementId: "G-KX05PFP3XL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class TodoList extends Component {
 


    //se definen props para usarlos como states y los this
  constructor(props){
    super(props);
    this.state = {
      term: '',
      data : [{name:"example", status: "Pending..."}],
      test: 'Axel'
    }
  }

  //correr al iniciar la pagina ANTES Y AL INCIO  DEL RENDER
  componentDidMount(){
    // guardara jsons de la bd
    var jsonDB = "";
    //datos dummy para inicializar bd y app
    let dataDummy = [{ name  : "ejemplo", status: "Pending", id:0}];
    var ref = firebase.database().ref("Object/");

      //definir data al state local de la app
    let { data } = this.state;
    this.setState({data: dataDummy});
  
//una call read all json de firebase
        const nameRef2 = firebase.database().ref().child('Object');
//la call fetch like
  nameRef2.on('value', (snapshot) => {
    //regresa algo lo que sea que sera?
    jsonDB = JSON.stringify(snapshot.val());
  
  //  console.log(snapshot.val()+"-> snapshot.val()");
  //  console.log(jsonDB+"-> sanpshotStringificado");


    //si es nulo el snapshto es false SI ENTRA SI HAY ALGO
    if(snapshot.val()){
      this.setState({ data : snapshot.val() });
   //   console.log("nope");
   //   console.log(jsonDB);
      ref.set(snapshot.val());
    }else{
      //si esta vacio hacemos uno de dummy para inciializar la bd
      this.setState({ data : dataDummy });
      ref.set(dataDummy);
   //   console.log("yep");
    }
    } )

  
  }
 
  //metodo lodash parte del tutorial pero reemplazable con el de update o anadir
  _remove(position){
    let { data } = this.state;
 //reajustar los index de data
    let newData = [
      ...data.slice(0, position),
      ...data.slice(position + 1),
    ]
    console.log(data);
    console.log(newData);
    var ref = firebase.database().ref("Object/"+position);
    ref.remove();

    //refrescar la base de datos y sus ids
     ref = firebase.database().ref("Object/");
    ref.set(newData);
    this.setState({ data : newData });
  //  console.log("Removed");
  }




// recibe un event any para ahcer ajax
//anadir(){
anadir(e){
    e.preventDefault();
    let randID =  parseInt((Math.random() * 100), 10);
    let { data } = this.state;
    let newData = [ ...data,{ name  : this.state.term, status: "Pending...", id:randID}]

var ref = firebase.database().ref("Object/");
ref.set(newData);
//alert(newData);

    //newData = [ ...data,{ name  : "cheese"}]
    this.setState({ data : newData });
   
  }

  onChange = (event) => {
   // console.log("Cambiando");
    this.setState({term: event.target.value});
  }



  render() {

 //console.log(JSON.stringify(this.state.data)+"DATA React state 1");
//console.log(this.state.data+"DATA React state 2");

//  console.log("Despliege de render");
    return (
      <div className="app">
        <h1>LDAW GD6 - Axel Meinguer A01653448, react con firebase </h1>
        <ul className="todo-list">
      
 
          {this.state.data.map(//     mapeo para loop de dara state
             //asi se pasa info entre componenets
            (item,index) =>       //index posicion se psas por proops
              <Item data={item} valueFromParent={index}  key={index} onRemove={ () => this._remove(index)} />
            )
          }
       
        </ul>
     
        <form onSubmit={this.anadir.bind(this) }>
       <input value={this.state.term} onChange={this.onChange} />
       <button>Añadir</button>
   </form>
          <p id="jsonP"></p>
      </div>
    );}
  
  
}

export default TodoList;