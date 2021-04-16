import React, { Component } from "react";
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Logo from "./Logo"
import "./styles/Login.css"

const Wrapper = styled.div`
    @media only screen and (max-width : 399px) {
        width: 10%
    }
`
const BtnFacebook = styled.button`
    width: 165px;
    height:35px;  
    border-radius: 4px;
    background: #3b5998;
    color:white;
    border:0px transparent;
    text-align: center;
    margin:5px;
    display: inline-block;
    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`;
const BtnGoogle = styled.button`
    margin:5px;
    width: 165px;
    height:35px;
    border-radius: 4px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;
    &:hover{
        background: #3b5998;
        opacity: 0.6;
    }
`
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
  }

  render() {
    return (
      <div className="body">
         <div className="center" id="logo">
            <div>
              <Logo name="HelPie" />
            </div>
          </div>
        <div>
          <div className="center">
            <form onSubmit={this.handleSubmit}>
              <div className="center">
                <label>
                  <p>Username or email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <div className="center">
                <label>

                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </label> </div>

              <div className="center">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
              </div>


              <div className="center">
                <Button type="submit" variant="contained" color="primary" disableElevation>
                  Login
                    </Button>
              </div>
              <div className="center">
                <div className="fb">
                  <Wrapper>
                    <BtnFacebook>
                      &nbsp;&nbsp;Sign In with Facebook
                        </BtnFacebook>
                    <BtnGoogle>
                      &nbsp;&nbsp;Sign In with Google
                        </BtnGoogle>
                  </Wrapper>
                </div></div>
              <p className="col-md-3 center forgot-password text-right ">
                <a href="#">Forgot password?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
