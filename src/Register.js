import React, { Component } from "react";
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import Logo from "./Logo"
import "./styles/Register.css"

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
export default class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          username: "",
          address: "",
          password: "",
          passwordConfirm: "",
          registerErrors: ""
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
        const { email, username, address, password, passwordConfirm } = this.state;
      }
    
    render() {
        return (
            <div className="body">
            <div className="center" id="logo">
               <div>
                 <Logo name="Helpie" />
               </div>
             </div>
             <div className="center">
               <form onSubmit={this.handleSubmit}>
               <div className="center">
                <label>
                  <p>Email address</p>
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
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>
              <div className="center">
                <label>
                  <p>Address</p>
                  <input
                    type="address"
                    name="address"
                    placeholder="Address"
                    value={this.state.address}
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
                </label>
              </div>
              <div className="center">
                <label>
                  <p>Confirm password</p>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm password"
                    value={this.state.passwordConfirm}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </div>

                <div className="center">
                    <Button type="submit" variant="contained" color="primary" disableElevation>
                        Register
                    </Button>
                </div>
                <div className="center">
                <div className="fb">
                  <Wrapper>
                    <BtnFacebook>
                      &nbsp;&nbsp;Register with Facebook
                        </BtnFacebook>
                    <BtnGoogle>
                      &nbsp;&nbsp;Register with Google
                        </BtnGoogle>
                  </Wrapper>
                </div></div>
                </form>
                </div>
        </div>
        );
    }
}