import React from 'react'

const CharSelect = (props) => {
    if (props.view === 'char_select'){
        return (
            <div>
            <div id="char_select">
            <p>Choose Your Character</p>
            <div className="container">
                <div id="char_1" className="char_choice walking"></div>
                <div id="char_2" className="char_choice"></div>
                <div id="char_3" className="char_choice"></div>
                <div id="char_4" className="char_choice"></div>
                <div id="char_5" className="char_choice"></div>
                <div id="char_6" className="char_choice"></div>
            </div>
            <div className="container">
                <div id="hole_1" className="carrot_hole active"></div>
                <div id="hole_2" className="carrot_hole"></div>
                <div id="hole_3" className="carrot_hole"></div>
                <div id="hole_4" className="carrot_hole"></div>
                <div id="hole_5" className="carrot_hole"></div>
                <div id="hole_6" className="carrot_hole"></div>
            </div>
            <p>Name Your Character</p>
            <input type="text"></input>
            <div id="start">Fight!</div>
            </div>
            <div id="screen"></div>
            </div>
        )
    } else {
        return null
    }
}

export default CharSelect