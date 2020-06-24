import React from "react";

import group1 from "../images/Group 11.png";
import group2 from "../images/Group 10.png";

export default function FavoriteBar() {
  return (
    <div className="favoriteBar">
      <h1>Избранное</h1>

      <ul className="favoriteList">
        <li>
          <img src={group1} alt="" />
        </li>
        <li>
          <img src={group2} alt="" />
        </li>
      </ul>
    </div>
  );
}
