import React, { Component } from 'react'

class EnemyDefence extends Component{
    enemy_defence = () => {
        return document.getElementById('enemy_defence')
    }
    success = () => {
        // console.log('success')
        this.set_style();
        this.enemy_defence().style.right = '35%'
    }
    failure = () => {
        // console.log('failure')
        this.set_style();
        this.enemy_defence().style.right = '10%'
    }
    set_style = () => {
        // console.log('set style')
       let style = this.props.get_hand_position(this.props.enemy_defence);
    //    console.log(style)
        this.enemy_defence().style.height = style.height;
        this.enemy_defence().style.width = style.width;
        this.enemy_defence().style.backgroundPosition = style.backgroundPosition;
        this.enemy_defence().style.opacity = 0;
 
    }
    reset = () => {
        this.enemy_defence().style.height = "0px";
        this.enemy_defence().style.width = "0px";
        this.enemy_defence().style.opacity = "1";
        this.enemy_defence().style.right = "27%";
    }
    componentWillUpdate = (nextProps, nextState) => {
        // console.log('component will update: ' + this.props.animate_enemy_defence)
        if (this.props.animate_enemy_defence !== nextProps.animate_enemy_defence) {
            switch(nextProps.animate_enemy_defence){
                case 'success': this.success(); break;
                case 'failure': this.failure(); break;
                case 'reset': this.reset(); break;
            }
    }
}
    render(){
        return(<div id="enemy_defence"></div>)
    }
}

export default EnemyDefence