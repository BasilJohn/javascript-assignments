import React, { Component } from "react";
import "../ToDo/todo.css";
import "../../../src/App.css";

export default class ToDo extends Component {
    state = {
        editValue: "",
        isCompleted: false,
        editIndex: null,
    };

    openEditPanel = (value, index) => {
        this.setState({
            editValue: value,
            editIndex: index,

        });
    };

    saveValue = (value, index) => {
        this.setState({
            editIndex: null
        });
        this.props.updatetoDoList(value, index, this.state.isCompleted,this.props.type);
    };

    updateListItemState = (value, index, evt) => {

        let stateFlag=false;
       
    
        if(this.props.type=="COMPLETED"){
            stateFlag=false;
        } 
        else{
            stateFlag=true;
        }

        this.setState({
            isCompleted: stateFlag,
            editIndex: null
        });
        

        this.props.addItemtoCompletedList(value, index,stateFlag);
    }

    deleteFromList = (item, index) => {
        this.props.deletefromtoDoList(item, index,this.props.type);
    };

    edittoDoValue = evt => {
        this.setState({
            editValue: evt.target.value
        });
    };

    render() {
        var toDoList = this.props.toDoList.map(function (listItem, index) {
 
            return (
                <div key={index} className="Todo-controls">
                    <input className="Checkbox-common"
                        checked={this.props.type == "COMPLETED" ? true : false}
                        onChange={this.updateListItemState.bind(this, listItem, index)} type="checkbox" />
                    {this.state.editIndex == index && (
                        <input
                            className="Input-todo"
                            onChange={this.edittoDoValue.bind(this)}
                            type="text"
                            value={this.state.editValue}
                            editindex={index}
                        />
                    )}
                    {this.state.editIndex != index && (
                        <label editindex={index}
                            className={this.props.type == "COMPLETED" ? "Label-common-completed" : "Label-common-todo"}>{listItem}
                        </label>
                    )}
                    {this.state.editIndex == index && (
                        <label
                            onClick={this.saveValue.bind(this, this.state.editValue, index)}
                            className="Label-common"
                        >
                            Save
            </label>
                    )}
                    {this.state.editIndex != index && (
                        <label
                            onClick={this.openEditPanel.bind(this, listItem, index)}
                            className="Label-common"
                        >
                            Edit
            </label>
                    )}
                    <label
                        onClick={this.deleteFromList.bind(this, listItem, index)}
                        className="Label-common"
                    >
                        Delete
          </label>
                </div>
            );
        }, this);

        return (
            <div className="Todo-component">
                <header className="Item-header">{this.props.type}</header>
                {toDoList}
            </div>
        );
    }
}
