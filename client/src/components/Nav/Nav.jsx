import React from "react";
import s from './Nav.module.css';
import { Link } from "react-router-dom";

const Nav = () => {

    return(
        <div className={s.container}>
            <nav>
                <ul>
                    <li><Link className={s.link} to='/home'>Home</Link></li>
                    <li><Link className={s.link} to="/home/create">Create Pokemon</Link></li>
                </ul>
            </nav>
        </div>
    )
};

export default Nav;