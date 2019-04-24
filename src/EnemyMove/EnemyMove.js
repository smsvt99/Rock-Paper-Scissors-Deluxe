import React, {Component} from 'react'

class EnemyMove extends Component{
    reset = () => {
        let enemy_move = document.getElementById('enemy_move');
        
        enemy_move.style.height = "0px";
        enemy_move.style.width = "0px";
        enemy_move.style.opacity = "1";
        enemy_move.style.right = "40%";
    }
    execute = () => {
        let style = this.props.get_hand_position(this.props.enemy_attack);
        let enemy_move = document.getElementById('enemy_move');
       
        enemy_move.style.backgroundPosition = style.backgroundPosition;
        enemy_move.style.height = style.height;
        enemy_move.style.width = style.width;
        enemy_move.style.opacity = 0;
        enemy_move.style.right = '75%';
    }
    componentWillUpdate = (nextProps, nextState) => {
        if (this.props.animate_enemy_move !== nextProps.animate_enemy_move) {
            switch (nextProps.animate_enemy_move){
                case 'execute': this.execute(); break;
                case 'reset': this.reset(); break;
            }
    }
}
    render(){
        return <div id="enemy_move"></div>
    }
}

export default EnemyMove;