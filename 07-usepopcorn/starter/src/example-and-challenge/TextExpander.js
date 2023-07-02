import { useState } from "react";
import "./textExpander.css";

export default function TextExpander({
    text,
    className = "",
    isOpen = false,
    collapsedNumWords = 5,
    expandButtonText = "show more",
    collapseButtonText = "show less",
    buttonColor = "",
}) {
    const [showMore, setShowMore] = useState(isOpen);
    const showFewWords = (sentence, numWords) => sentence.split(' ').slice(0, numWords).join(' ');

    const handleClick = () => {
        setShowMore(!showMore);
    }

    return (
        <div className={className}>
            {showMore ? text : showFewWords(text, collapsedNumWords)}
            <button style={{ backgroundColor: buttonColor }} onClick={handleClick}>{showMore ? collapseButtonText : expandButtonText}</button>
        </div>
    )
}