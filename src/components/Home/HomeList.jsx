import React from 'react';

import "./home.css"; // Import the CSS file for styling
import styles from '../Styles/styles';
import { useNavigate } from 'react-router-dom';


const HomeList = ({title, data}) => {
const navigate = useNavigate();



    return (
        <div>
            <h2 className={styles.homeTitle} >{title}</h2>
            <div className="brands-container">
                <div className="brands-wrapper">
                    {data.map(item => (
                        <div className="brand-item" style={{ background: item.bgColor }} key={item.id}>
                            <div className="brand-image-container cursor-pointer" onClick={() => navigate(`/products?category=${item.title}`)}>
                                <img src={item.img} alt="image" className="brand-image" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeList;
