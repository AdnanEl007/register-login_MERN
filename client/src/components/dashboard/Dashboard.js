import React, { Component, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';



const User = props => (
  <tr>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.date.substring(0, 10)}</td>
  </tr>
)

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  constructor(props) {
    super(props);

    this.state = {users: []};
}

componentDidMount(){
  const token = localStorage.jwtToken;
  const config = {
    headers: {
       Authorization: token
    }
 }
    axios.get('http://localhost:5000/users')
        .then(response =>{
            this.setState({users: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
}

userList(){
  return this.state.users.map(currentuser => {
      return <User user={currentuser} key={currentuser._id} />
  })
}


  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Bonjour,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
              Vous avez accédé pour voir la liste des utilisateurs {" "}
                
              </p>
            </h4>

            <table className="responsive-table">
              <thead className="thead-light">
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
                {this.userList()}
              </tbody>
            </table>

            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>


      
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});



export default connect(mapStateToProps, { logoutUser })(Dashboard);
