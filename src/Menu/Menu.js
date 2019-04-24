import React, { Component } from 'react'

class Menu extends Component {

    componentDidUpdate = () => {
        if (this.props.view !== 'char_select') {
            this.point();
            this.set_bar();
        }
    }
    cycle_index_down = () => {
        let index = this.props.choices_index;
        let new_index = index === 0 
            ? 2 
            : index - 1
        this.props.set_choices_index(new_index)

    }
    cycle_index_up = () => {
        let index = this.props.choices_index;
        let new_index = index === 2
            ? 0
            : index + 1
        this.props.set_choices_index(new_index)
    }
    point = () => {
        let options = document.getElementsByClassName('pointer');
        for (let option of options) {
            option.classList.add('hidden')
        }
        options[this.props.choices_index].classList.remove('hidden')
    }
    set_bar = () => {
        let bar = document.getElementById('bar');
        let hp = this.props.my_stats.hp;
        switch (hp) {
            case 3:
                bar.style.width = "100%";
                break;
            case 2:
                bar.style.width = "66%";
                break;
            case 1:
                bar.style.width = "33%";
                break;
            case 0:
                bar.style.width = "0%";
                break;
            default: console.log('something went wrong')
        }
    }

    render() {
        if (this.props.view === 'char_select') {
            return null
        } else {
            return (
                <div>
                    <div id="menu">
                        <div id="hp">
                            <div id="name">{this.props.my_name}</div>
                            <div>HP: {this.props.my_stats.hp} / 3</div>
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
                            <div className="menu_item numbers"> {this.props.my_stats.pp.rock} / 3</div>
                            <div className="menu_item numbers"> {this.props.my_stats.pp.paper} / 3</div>
                            <div className="menu_item numbers"> {this.props.my_stats.pp.scissors} / 3</div>
                        </div>
                    </div>
                    <div id="controls">
                        <div onClick={this.cycle_index_down} class="arrow up-arrow"></div>
                        <div onClick={this.cycle_index_up} class="arrow down-arrow"></div>
                        <div onClick={this.props.handle_enter} id="select">A</div>
                    </div>
                </div>
            )
        }
    }
}

export default Menu;