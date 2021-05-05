import React, { useState } from "react";
import '../App.css';

function Description(props) {
    const { description } = props;
    const descriptionSliced = description.slice(0, 100);

    const [isDescriptionExtended, setIsDescriptionExtended] = useState(false);

    const seeMoreBtnClasses = ["see-more"];
    if (props.description.length < 100) seeMoreBtnClasses.push('hide-button');

    function toggleDescriptionButton() {
        setIsDescriptionExtended(!isDescriptionExtended);
    }

    const dots = ["dots-hiden"];
    if (description.length > 100) {
        if (!isDescriptionExtended) dots.push("dots-showed");
    }

    function getParsedDescription() {
        const initialText = isDescriptionExtended ? description : descriptionSliced;
        const descriptionSplited = initialText.split(' ');
        const parsedDescription = descriptionSplited.map(item => {
            if ((item.indexOf('http://') !== -1) || (item.indexOf('https://') !== -1)) return `<a href="${item}" target="_blank">${item}</a>`;
            return item;
        })
        return parsedDescription.join(' ');
    }

    return (
        <div className="container text">
            <div>
                <div dangerouslySetInnerHTML={{ __html: getParsedDescription() }}></div>
                <span className={dots.join(" ")}>...</span>
            </div>

            <div className="see-more-wrap">
                <button
                    className={seeMoreBtnClasses.join(" ")}
                    onClick={toggleDescriptionButton}>{isDescriptionExtended ? 'See less' : 'See more'}
                </button>
            </div>
        </div>
    )
}

export default Description;