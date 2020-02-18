import React, { useEffect, useState } from 'react';
import CarItems from './CarItems';

const VehicleList = () => {
    const [cars, setCars] = useState([]);
    const [items, setItems] = useState('');
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState([]);

    const filterArray = () => {
        const filter = cars.filter(car => {
            return car.name.toLowerCase().includes(items.toLowerCase());
        });
        return filter;
    };

    useEffect(() => {
        fetch(' http://feteam.htec.co.rs/api/cars')
            .then(res => res.json())
            .then(res => {
                setCars(
                    res.cars.map(data => {
                        return {
                            selected: false,
                            name: data.name,
                            id: data.id,
                            description: data.description,
                            speed: data.speed,
                            image: data.image
                        };
                    })
                );
            }, setLoading(false));
    }, []);

    const onCarSelected = car => {
        const checked = car.selected;
        setCars(
            cars.map(data => {
                if (car.id === data.id) {
                    data.selected = !checked;
                    console.log(data.selected);
                }
                return data;
            })
        );
        if (checked === true) return setLink([...link, car]);
        if (checked === false)
            return setLink(link.filter(e => e.id !== car.id));
    };

    return (
        <div className="containerList">
            <div>
                <input
                    type="text"
                    value={items}
                    onChange={e => setItems(e.target.value)}
                    className="inputField"
                />
                <div className="cars">
                    {loading && <h1>Loading data</h1>}

                    {filterArray().map((car, index) => {
                        const borderClass =
                            filterArray().length - index > 2
                                ? 'borderBottom'
                                : '';
                        return (
                            <div
                                key={car.id}
                                className={`imageCon ${borderClass}`}
                            >
                                <CarItems
                                    car={car}
                                    onSelected={onCarSelected}
                                    checked={car.selected}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default VehicleList;
