import React from "react";
import Unsplash from "unsplash-js";

import line from "../images/Line.png";

import { Link } from "react-router-dom";

const { toJson } = require("unsplash-js");
const unsplash = new Unsplash({
  accessKey: "QqpHhb7OaoMiq91Yz3_TPX6G7_y11KgjrT4rG6tkqfQ",
});

export default function HistoryBar(props) {
  return (
    <div className="searchBar">
      <h1>History</h1>
      <img className="fadeLine" src={line} alt="line" />
      <ul className="collectionList">
        {props.history.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                props.setCollId(item);
              }}
              onClick={() => {
                unsplash.collections
                  .getCollectionPhotos(item.id, 1, 9, "popular")
                  .then(toJson)
                  .then((json) => {
                    // console.log(json);
                    props.setPhotos(json);
                  });
              }}
            >
              <Link to="/">{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
