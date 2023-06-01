import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Card.css"
import { Link } from "react-router-dom";

const Card = ({ title, barValue, value, color, navigateTo }) => {
    return (
        <div
            className="SimpleCard"
            style={{
                background: color.backGround,
                boxShadow: color.boxShadow,
            }}
        >
            <div className="radialBar">
                <CircularProgressbar value={value} text={`${barValue}%`} />
            </div>
            <div className="detail">
                <span>{value}</span>
                <Link to={navigateTo} > <span>{title}</span> </Link>
            </div>
        </div>
    );
};

export default Card;
