import React, { useEffect, useState } from 'react';
import './index.css';

function ProgressBar(props) {
    // let { progress } = props;

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        let timer = setInterval(() => {
            setProgress((oldValue) => {
                const newValue = oldValue + 5;
                if (newValue === 100) clearInterval(timer);
                return newValue;
            });
        }, 100);
    }, []);

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "red",
        transition: 'width .1s',
    };

    return (

        <div className="progress-bar-background">
            <div className="progress-bar-container">

                <div className="load-percentage">{progress < 100 ? progress + '%' : 'DONE'}</div>
                <div className="bar">
                    <div style={fillerStyles}></div>
                </div>
                
            </div>
        </div>

    )
}

export default ProgressBar;