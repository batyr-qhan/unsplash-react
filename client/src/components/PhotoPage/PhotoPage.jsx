import React, {Component} from 'react';

import {useParams} from 'react-router';
import {withRouter} from 'react-router-dom';
import downloadIcon from '../../images/download_24px_rounded.svg';

import Unsplash from 'unsplash-js';

const {toJson} = require('unsplash-js');

const unsplash = new Unsplash({
  accessKey: 'QqpHhb7OaoMiq91Yz3_TPX6G7_y11KgjrT4rG6tkqfQ',
});

class PhotoPage extends Component {
  constructor(props) {
    super(props);
    this.routeParam = props.match.params.id;
    this.state = {
      photo: {},
      url: String,
      profileImage: String,
      firstName: String,
      lastName: String,
    };
  }

  componentDidMount() {
    unsplash.photos
      .getPhoto(this.routeParam)
      .then(toJson)
      .then((json) => {
        this.setState({
          photo: json,
          url: json.urls.small,
          profileImage: json.user.profile_image.medium,
          firstName: json.user.first_name,
          lastName: json.user.last_name,
          userName: json.user.username,
        });
        // Your code
        // this.props.setPhoto(json);
        // console.log(json);
      });
  }

  render() {
    // let { id } = useParams();

    return (
      <div className="PhotoPage">
        <div className="photoContainer">
          <img src={this.state.url} alt="" className="image"/>
          <div className="overlay">
            <img
              src={this.state.profileImage}
              alt="avatar"
              className="avatar"
            />
            <p className="userFullname">
              {this.state.firstName} {this.state.lastName}
            </p>
            <p className="username">@{this.state.userName}</p>
            <div className="iconsContainer">
              {/* <img src={favoriteIcon} alt="favorite" />{" "} */}
              {/* <img src={maximizeIcon} alt="maximize" />{" "} */}
              <img src={downloadIcon} alt="download"/>{' '}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PhotoPage);
