import React, { Component } from 'react'

class Menu extends Component {
    componentDidUpdate = () =>{
        let options = document.getElementsByClassName('pointer');
        for(let option of options){
            option.classList.add('hidden')
        }
        options[this.props.choices_index].classList.remove('hidden')
    }

    render() {
        return (
            <div id="menu">
                <div id="hp">
                    <span>HP: {this.props.my_stats.hp} / 3</span>
                    <div id="health"><span id="bar"></span></div>
                </div>
                <div>
                    <div className="menu_item pointer"></div>
                    <div className="menu_item pointer hidden"></div>
                    <div className="menu_item pointer hidden"></div>
                </div>
                <div>
                    <div className="menu_item">Rock</div>
                    <div className="menu_item">Paper</div>
                    <div className="menu_item">Scissors</div>
                </div>
                <div>
                    <div className="menu_item">{this.props.my_stats.pp.rock} / 3</div>
                    <div className="menu_item"> {this.props.my_stats.pp.paper} / 3</div>
                    <div className="menu_item"> {this.props.my_stats.pp.scissors} / 3</div>
                </div>

            </div>
        )
    }
}

export default Menu;