import React from 'react'

const Title = ({
    titleText,
    fs = '1rem',
    fw = 900,
    padding = '0.5rem 0',
    color = '#000',
    textAlign = 'center'
}) => {
    const titleStyle = {
        fontSize: fs,
        fontWeight: fw,
        padding,
        color,
        textAlign,
        fontFamily: "Montserrat",
    }
    return (
        <h2 style={titleStyle}>
            {titleText}
        </h2>
    )
}

export default Title;
