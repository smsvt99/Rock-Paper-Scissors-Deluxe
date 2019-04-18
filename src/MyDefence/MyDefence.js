import React, { Component } from 'react'

class MyDefence extends Component {
    my_defence = () => {
        return document.getElementById('my_defence')
    }
    success = () => {
        this.set_style()
        this.my_defence().style.left = '35%';
    }
    failure = () => {
        this.set_style()
        this.my_defence().style.left = '10%';
    }
    reset = () => {
        this.my_defence().style.height = "0px";
        this.my_defence().style.width = "0px";
        this.my_defence().style.opacity = "1";
        this.my_defence().style.left = "27%";
    }
    set_style = () => {
        let style = this.props.get_hand_position(this.props.my_defence);
        this.my_defence().style.height = style.height;
        this.my_defence().style.width = style.width;
        this.my_defence().style.backgroundPosition = style.backgroundPosition;
        this.my_defence().style.opacity = 0;
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (this.props.animate_enemy_defence !== nextProps.animate_enemy_defence) {
            switch (nextProps.animate_enemy_defence) {
                case 'success': this.success(); break;
                case 'failure': this.failure(); break;
                case 'reset': this.reset(); break;
            }
        }
    }
    render() {
        return <div id="my_defence"></div>
    }
}

export default MyDefence;