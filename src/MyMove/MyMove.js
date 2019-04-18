import React, { Component } from 'react'

class MyMove extends Component {
    execute = () => {
        let my_move = document.getElementById('my_move');
        let style = this.props.get_hand_position(this.props.my_attack);
       
        my_move.style.backgroundPosition = style.backgroundPosition;
        my_move.style.height = style.height;
        my_move.style.width = style.width;
        my_move.style.opacity = 0;
        my_move.style.left = '75%';
    }
    reset = () => {
        let my_move = document.getElementById('my_move');

        my_move.style.height = "0px";
        my_move.style.width = "0px";
        my_move.style.opacity = "1";
        my_move.style.left = "40%";
    }
    componentWillUpdate = (nextProps, nextState) => {
        if (this.props.animate_my_move !== nextProps.animate_my_move) {
            switch (nextProps.animate_my_move){
                case 'execute': this.execute(); break;
                case 'reset': this.reset(); break;
            }
    }
}
render(){
    return (<div id="my_move"></div>)
}
}

export default MyMove