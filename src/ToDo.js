import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';

 //http://zetcode.com/javascript/lodash/



class Item extends Component{
    _remove(){
        this.undone();
        if(this.props.onRemove){ 
        console.log("Removed");
            this.props.onRemove();}
            
 //window.location.reload();
    }

    //debugg SE USA PARA PRESERVAR LA ESENCIA DE VISTAS DEL TUTORIAL

    undone(){
        document.getElementById(this.props.data.name).className = ""; 
      //  this.props.data.status = "Pending...";
        document.getElementById(this.props.data.name+"-idButton").className = ""; 
        document.getElementById(this.props.data.name+"-idStatus").className = "hidden";
     //   document.getElementById(this.props.data.name+"-idStatus").innerHTML = "Pending...";
    }

    done(){
        document.getElementById(this.props.data.name).className = "gray-done"; 
      this.props.data.status = "Done";
      document.getElementById(this.props.data.name+"-idButton").className = "hidden"; 
      document.getElementById(this.props.data.name+"-idStatus").className = "item-status ";
      document.getElementById(this.props.data.name+"-idStatus").innerHTML = "Done";

      //props de parent a child
      //console.log(  this.props.valueFromParent );

      var ref = firebase.database().ref("Object/"+this.props.valueFromParent+"/status");
      ref.set("Done");
  
     

    }


    componentDidMount(){
        this.verfify();
    }

    verfify(){
        //console.log(this.props.data.name+"-idStatus");
        if(this.props.data.status =="Done"&&  document.getElementById(this.props.data.name) ){
          //  console.log("dentro");
       this.done();


           }


           if(this.props.data.status =="Pending..."&&  document.getElementById(this.props.data.name) ){
         //   console.log("dentro2");
       this.undone();


           }
           //console.log("fuera");

    }


    render(){
        return (
            <div>
            
                <div id={this.props.data.name} className="name">
                    <span className="item-name">{this.props.data.name}</span>
                  <span>  </span>
                    <span id={this.props.data.name+"-idStatus"} className="item-status hidden">{this.props.data.status}</span>
                    <span>  <button className="remove" onClick={this._remove.bind(this)}>Borrar
                </button></span>
                <span>
                <button id={this.props.data.name+"-idButton"} className="done" onClick={this.done.bind(this)}>Done
                </button></span>
                </div>
                  
             



            </div>
        )
    }
}
 
 
export default Item;