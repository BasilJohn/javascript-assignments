import React, { Component } from "react";
import "../AddItem/additem.css";
import "../../../src/App.css";

export default class AddItem extends Component {

    state = {

        toDoInputValue: ""
    }

    addItemtodoList = () => {

        this.props.todoListFunction(this.state.toDoInputValue);
        this.setState({
            toDoInputValue:""
        });
    }

    ontoDoInputChange = (evt) => {

        this.setState({
            toDoInputValue:evt.target.value
        });
    }



    render(props) {
        return (
            <div className="AddItem-component">
                <header className="Item-header">ADD ITEM</header>
                <div className="AddItem-controls">
                    <input className="Input-common" value={this.state.toDoInputValue} onChange={this.ontoDoInputChange.bind(this)} type="text" />
                    <label className="Label-common" onClick={this.addItemtodoList.bind(this)}>Add</label>
                </div>
            </div>
        );
    }
}
