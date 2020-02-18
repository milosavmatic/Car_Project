import React from 'react';
import './carItems.css';

const CarItems = ({ car, onSelected = () => null }) => {
    return (
        <div className="container">
            <div className="inner">
                <div className="front">
                    <img
                        src={car.image}
                        alt={car.image}
                        className="imageStyle"
                    />
                    <h4>{car.name}</h4>
                </div>
                <div
                    className="back"
                    onClick={() => {
                        onSelected(car);
                    }}
                >
                    <img
                        src={car.image}
                        alt={car.image}
                        className="imagesBack"
                    />
                    <p className="selectLbl">
                        {car.selected ? 'Select' : 'Unselect'}
                    </p>
                    <div className="descriptionText">
                        <p>{car.description}</p>
                        <p>Speed: {car.speed}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarItems;
