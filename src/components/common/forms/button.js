import React from 'react';



export default ({
    buttonLabel,
    className,
    onClick
},props) => (
    <>
    <button className={className} onClick={onClick}>
        {buttonLabel}
    </button>
    
    </>
)