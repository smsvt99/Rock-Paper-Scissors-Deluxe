import React, { Component } from 'react'
// import { setMaxListeners } from 'cluster';
// import { getPriority } from 'os';
// import { getMaxListeners } from 'cluster';

class Me extends Component {
    componentDidUpdate = () => {
        this.setY();
        this.setX();
    }
    componentDidMount = () => {
        this.setY();
        this.setX();
    }
    setX = () => {

    }
    setY = () => {
        let sprite = document.getElementById('me')
        switch(this.props.my_character){
            case 1:
                sprite.style.backgroundPositionY = '-2px';
                break;
            case 2:
                sprite.style.backgroundPositionY = '-40px';
                break;
            case 3:
                sprite.style.backgroundPositionY = '-79px';
                break;
            case 4:
                sprite.style.backgroundPositionY = '-116px';
                break;
            case 5:
                sprite.style.backgroundPositionY = '-154px';
                break;
            case 6:
                sprite.style.backgroundPositionY = '-187px';
                break;
            default:
                sprite.style.backgroundPositionY = '-2px';
            }
    }

    render() {
        return (
            <div id="me"></div>
        )
    }
}

export default Me