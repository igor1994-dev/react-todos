import React, { useState } from "react";
import '../App.css';

function Description(props) {

    const descriptionSliced = props.description.slice(0, 100);

    const [propsDescription, setPropsDescription] = useState(descriptionSliced);

    const [checkDescriptionStatus, setCheckDescriptionStatus] = useState(true);

    const seeMoreBtnClasses = ["see-more"];
    if (props.description.length < 100) seeMoreBtnClasses.push('hide-button');

    function toggleDescriptionButton() {
        setCheckDescriptionStatus(!checkDescriptionStatus);
        if (checkDescriptionStatus === true) {
            setPropsDescription(props.description);
        } else if (checkDescriptionStatus === false) {
            setPropsDescription(descriptionSliced)
        }
    }

    const dots = ["dots-hiden"];
    if (props.description.length > 100) {
        if (checkDescriptionStatus) dots.push("dots-showed")
    }

    function getParsedDescription(description) {
        const descriptionSplited = description.split(' ');
        const parsedDescription = descriptionSplited.map(item => {
            if ((item.indexOf('http://') !== -1) || (item.indexOf('https://') !== -1)) return `<a href="${item}" target="_blank">${item}</a>`;
            return item;
        })
        return parsedDescription.join(' ');
    }

    return (
        <div className="container text">
            <div dangerouslySetInnerHTML={{ __html: getParsedDescription(propsDescription) }}></div>
            <span className={dots.join(" ")}>...</span>
            <div className="see-more-wrap">
                <button
                    className={seeMoreBtnClasses.join(" ")}
                    onClick={toggleDescriptionButton}>{checkDescriptionStatus ? 'See more' : 'See less'}
                </button>
            </div>
        </div>
    )
}

export default Description;