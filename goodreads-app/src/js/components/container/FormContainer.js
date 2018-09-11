import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import Grid from "./Grid";



import axios from "axios";

const developerKey = "rgG39BTxQ7xdQQpHdZw6tw";
let pageNumber = 1;
class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            bookResultSet: [],
            pageNumber: 1,
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getBooksList() {
        this.setState({ isLoading: true }, () => {
            axios.get("/api/goodreadsapicall?key=" + developerKey + "&q=" + this.state.filterText + "&page=" + pageNumber).then(
                res => res.data
            ).then(result => {
                this.setState({ isLoading: false })
                this.setState({ bookResultSet: result.booksResult })
            }).catch(err => {
                this.setState({ isLoading: false })
            })
        })


    }
    handleChange(event) {

        this.setState({ [event.target.id]: event.target.value, pageNumber: 1 }, () => {
            pageNumber = 1;
            this.getBooksList();
        });
    }

    fetchOption(option) {

        let pageIndex = pageNumber;
        option == "prev" ? pageIndex = pageIndex - 1 : pageIndex = pageIndex + 1;
        if (pageIndex == 0) {
            alert("You have reached the starting!!")
        }
        pageNumber = pageIndex == 0 ? 1 : pageIndex;

        this.setState({ pageNumber: pageNumber })

    }

    render() {
        const { filterText } = this.state;
        return (
            <div>
                <Input
                    text="Type Here"
                    label="filter_text"
                    type="text"
                    id="filterText"
                    value={filterText}
                    handleChange={this.handleChange}
                />
                <Grid
                    bookList={this.state.bookResultSet}
                    fetchOption={this.fetchOption.bind(this)}
                    currentPageNumber={this.state.pageNumber}
                    isLoading={this.state.isLoading}
                    getBookListPrevNext={this.getBooksList.bind(this)} />

            </div>
        );
    }
}
export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
