import React, { Component } from "react";
import ReactDOM from "react-dom";
import Styles from "./container.css";
import Spinner from "../presentational/Spinner";
export default class Grid extends Component {
    constructor(props) {
        super(props);
    }
    handlePrevNext(type) {

        this.props.fetchOption(type);
        if (this.props.currentPageNumber >= 1) {
            this.props.getBookListPrevNext();
        }


    }
    render() {
        var bookList = this.props.bookList.map(function (books, index) {
            return (
                <li key={index}>
                    <label>{books.title}</label>
                </li>
            );
        }, this);

        return (
            <div>
                {this.props.isLoading && (
                    <Spinner />
                )}
                <ul className={Styles.GridHeight}>{bookList}</ul>

                <div className={Styles.Pager}>
                    <div onClick={this.handlePrevNext.bind(this, "prev")}>
                        <label className={Styles.PagerLink}>Prev</label>
                    </div>
                    <div onClick={this.handlePrevNext.bind(this, "next")} className={Styles.PaddingLeftCommon}>
                        <label className={Styles.PagerLink}>Next</label>
                    </div>
                </div>
            </div>
        );
    }
}
