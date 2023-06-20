import React from "react";

interface FullWidthLineProps {
    className?: string,
    style?: React.CSSProperties,
}

export const JustLineSeparator: React.FC<FullWidthLineProps> = (props) => {
    return (
        <div style={props.style} className={props.className ? props.className : "full-width-line"} />
    );
}
