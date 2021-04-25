import React from "react";
import '../App.css';
import UserAccount from "./UserAccount";
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className="container header">
            <div className="row">
                <div className="col header-title">
                    Todos
                </div>

                {props.auth.isAuth && <UserAccount />}

                {!props.auth.isAuth &&
                    <>
                        <div className="col-1 sign-btn pr-0">
                            <Link to='/signin'>
                                <Button variant="dark">Sign in</Button>
                            </Link>
                        </div>
                        <div className="col-1 sign-btn">
                            <Link to='/signup'>
                                <Button variant="dark">Sign up</Button>
                            </Link>
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);