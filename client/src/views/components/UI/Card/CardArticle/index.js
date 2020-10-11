import React, { Component } from "react";

import PropTypes from "prop-types";
import "./style.css";
import { withRouter } from "react-router-dom";

class CardArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleCardClick = (e) => {
    this.props.history.push("/post/" +
    (this.props.id ? this.props.id : 1));
  };

  render() {
    return (
      <div className="cardArticle" onClick={this.handleCardClick}>
        <div className="cardImage">
          <img
            src={require("../../../../assets/images/nature/" +
              this.props.imageSrc)}
            alt=""
          />
        </div>
        <div className="cardTitle">
          <h2>{this.props.title}</h2>
        </div>
        <div className="cardInfo">
          <p>{this.props.content}</p>
        </div>
        <div className="cardFooter">
          <div className="source">
            <span>Freebie</span>
            <span>Bootstrap</span>
          </div>
          <div className="moreInfo">
            <span>Recommeded</span>
          </div>
        </div>
      </div>
    );
  }
}

CardArticle.propTypes = {};

export default withRouter(CardArticle);
