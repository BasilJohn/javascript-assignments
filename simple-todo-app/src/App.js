import React, { Component } from "react";
import AddItem from "./components/AddItem/addItemComponent";
import Todo from "./components/ToDo/todoComponent";
import "./App.css";

class App extends Component {
  state = {
    todoList: [],
    completedList: []
  };

  updatetoDoList = (value, index, isCompleted,type) => {

    if(type==="COMPLETED"){

      let newArray = [...this.state.completedList];
      newArray[index] = value;
      this.setState({ completedList: newArray });
    }
    else{
      let newArray = [...this.state.todoList];
      newArray[index] = value;
      this.setState({ todoList: newArray });
    }
   
  };
  addItemtoDoList = value => {

    this.setState({ todoList: [...this.state.todoList, value] });
  };

  deletefromtoDoList = (item, index,type) => {

    let stateObject=type=="COMPLETED"? this.state.completedList: this.state.todoList;

    stateObject.splice(index, 1);
    this.setState({ [stateObject]: stateObject});
  };

  addItemtoCompletedList = (value,index,isCompleted) => {
    
    if (isCompleted) {
      this.state.todoList.splice(index, 1);
      this.setState({ todoList: this.state.todoList });
      this.setState({ completedList: [...this.state.completedList, value] });
    }
    else
    {
      this.state.completedList.splice(index, 1);
      this.setState({ completedList: this.state.completedList });
      this.setState({ todoList: [...this.state.todoList, value] });
    }
    
  };



  render() {
    return (
      <div className="App">
        <AddItem todoListFunction={this.addItemtoDoList} />
        <Todo
          updatetoDoList={this.updatetoDoList}
          deletefromtoDoList={this.deletefromtoDoList}
          toDoList={this.state.todoList}
          addItemtoCompletedList={this.addItemtoCompletedList}
          type={"TODO"}
        />
        <Todo
          updatetoDoList={this.updatetoDoList}
          deletefromtoDoList={this.deletefromtoDoList}
          toDoList={this.state.completedList}
          addItemtoCompletedList={this.addItemtoCompletedList} 
          type={"COMPLETED"}
          />
      </div>
    );
  }
}

export default App;
