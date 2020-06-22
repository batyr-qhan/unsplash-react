import React, { Component } from "react";
import "./HomeStyle.css";

import favoriteIcon from "../images/favorite_24px_rounded.svg";
import downloadIcon from "../images/download_24px_rounded.svg";
import maximizeIcon from "../images/maximize-2.svg";

import Unsplash from "unsplash-js";
const { toJson } = require("unsplash-js");

const unsplash = new Unsplash({
  accessKey: "QqpHhb7OaoMiq91Yz3_TPX6G7_y11KgjrT4rG6tkqfQ",
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className="main">
        <ul className="photoList">
          {this.props.photos.map((item) => {
            return (
              <li key={item.id} className="photoContainer">
                <img src={item.urls.small} alt="" className="image" />
                <div className="overlay">
                  <img
                    src={item.user.profile_image.medium}
                    alt="avatar"
                    className="avatar"
                  />
                  <p className="userFullname">
                    {item.user.first_name} {item.user.last_name}
                  </p>
                  <p className="username">@{item.user.username}</p>
                  <div className="iconsContainer">
                    <img
                      onClick={() => {
                        this.props.addFavorites(item);
                      }}
                      src={favoriteIcon}
                      alt="favorite"
                    />{" "}
                    <img src={maximizeIcon} alt="maximize" />{" "}
                    <img src={downloadIcon} alt="download" />{" "}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}
