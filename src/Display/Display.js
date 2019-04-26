import React from 'react';

const Display = (props) => {
    let text = props.display_text;
    if(text.length > 0){
    return(
        <div id="display">{text}</div>
    )
    } else {
        return null;
    }
}
export default Display;