import React from "react";

import favoriteIcon from "../images/favoriteIcon.svg";
import downloadIcon from "../images/download_24px_rounded.svg";
import maximizeIcon from "../images/maximize-2.svg";

export default function Favorite(props) {
  return (
    <ul className="photoList">
      {props.favorites.map((item) => {
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
                <a href={`photo/${item.id}`}>
                  <img href src={maximizeIcon} alt="maximize" />{" "}
                </a>
                <img src={downloadIcon} alt="download" />{" "}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
