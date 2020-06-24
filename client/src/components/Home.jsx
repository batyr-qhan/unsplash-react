import React, { Component } from "react";
import "./HomeStyle.css";

import { ReactComponent as FavoriteIcon } from "../images/favoriteIcon.svg";

import downloadIcon from "../images/download_24px_rounded.svg";
import maximizeIcon from "../images/maximize-2.svg";

export default class Home extends Component {
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
                    {(() => {
                      if (
                        this.props.favoritesArray.some(
                          (el) => el.id === item.id
                        )
                      ) {
                        return (
                          <FavoriteIcon
                            className="likeIcon"
                            onClick={() => {
                              this.props.removeFavorites(item);
                            }}
                            style={{ fill: "red" }}
                          />
                        );
                      } else
                        return (
                          <FavoriteIcon
                            className="likeIcon"
                            onClick={() => {
                              this.props.addFavorites(item);
                            }}
                            style={{ fill: "white" }}
                          />
                        );
                    })()}
                    <a href={`photo/${item.id}`}>
                      <img src={maximizeIcon} alt="maximize" />
                    </a>
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
