(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{34:function(e,t,n){e.exports=n(69)},39:function(e,t,n){},40:function(e,t,n){},66:function(e,t){},69:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),c=n(31),i=n.n(c),o=(n(39),n(32)),r=n(1),m=n(2),l=n(4),_=n(3),d=n(5),u=(n(40),function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).componentDidUpdate=function(){"char_select"!==n.props.view&&(n.point(),n.set_bar())},n.cycle_index_down=function(){var e=n.props.choices_index,t=0===e?2:e-1;n.props.set_choices_index(t)},n.cycle_index_up=function(){var e=n.props.choices_index,t=2===e?0:e+1;n.props.set_choices_index(t)},n.point=function(){var e=document.getElementsByClassName("pointer"),t=!0,a=!1,s=void 0;try{for(var c,i=e[Symbol.iterator]();!(t=(c=i.next()).done);t=!0){c.value.classList.add("hidden")}}catch(o){a=!0,s=o}finally{try{t||null==i.return||i.return()}finally{if(a)throw s}}e[n.props.choices_index].classList.remove("hidden")},n.set_bar=function(){var e=document.getElementById("bar");switch(n.props.my_stats.hp){case 3:e.style.width="100%";break;case 2:e.style.width="66%";break;case 1:e.style.width="33%";break;case 0:e.style.width="0%";break;default:console.log("something went wrong")}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return"char_select"===this.props.view?null:s.a.createElement("div",null,s.a.createElement("div",{id:"menu"},s.a.createElement("div",{id:"hp"},s.a.createElement("div",{id:"name"},this.props.my_name),s.a.createElement("div",null,"HP: ",this.props.my_stats.hp," / 3"),s.a.createElement("div",{id:"health"},s.a.createElement("span",{id:"bar"}))),s.a.createElement("div",null,s.a.createElement("div",{className:"menu_item pointer"}),s.a.createElement("div",{className:"menu_item pointer hidden"}),s.a.createElement("div",{className:"menu_item pointer hidden"})),s.a.createElement("div",null,s.a.createElement("div",{className:"menu_item"},"Rock"),s.a.createElement("div",{className:"menu_item"},"Paper"),s.a.createElement("div",{className:"menu_item"},"Scissors")),s.a.createElement("div",null,s.a.createElement("div",{className:"menu_item numbers"}," ",this.props.my_stats.pp.rock," / 3"),s.a.createElement("div",{className:"menu_item numbers"}," ",this.props.my_stats.pp.paper," / 3"),s.a.createElement("div",{className:"menu_item numbers"}," ",this.props.my_stats.pp.scissors," / 3"))),s.a.createElement("div",{id:"controls"},s.a.createElement("div",{onClick:this.cycle_index_down,class:"arrow up-arrow"}),s.a.createElement("div",{onClick:this.cycle_index_up,class:"arrow down-arrow"}),s.a.createElement("div",{onClick:this.props.handle_enter,id:"select"},"A")))}}]),t}(a.Component)),y=function(e){var t=e.display_text;return t.length>0?s.a.createElement("div",{id:"display"},t):null},p=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).state={characters:[1,2,3,4,5,6],character_index:0,name:"",interval:null,listener:null,page:1,opponent_id:""},n.cycle_index_down=function(e){0===e?e=n.state.characters.length-1:e--,n.setState({character_index:e})},n.cycle_index_up=function(e){e===n.state.characters.length-1?e=0:e++,n.setState({character_index:e})},n.point=function(){var e=document.getElementsByClassName("carrot_hole"),t=!0,a=!1,s=void 0;try{for(var c,i=e[Symbol.iterator]();!(t=(c=i.next()).done);t=!0){c.value.classList.remove("active")}}catch(y){a=!0,s=y}finally{try{t||null==i.return||i.return()}finally{if(a)throw s}}var o=document.getElementsByClassName("char_choice"),r=!0,m=!1,l=void 0;try{for(var _,d=o[Symbol.iterator]();!(r=(_=d.next()).done);r=!0){var u=_.value;u.classList.remove("walking"),u.style.backgroundPositionX="0px"}}catch(y){m=!0,l=y}finally{try{r||null==d.return||d.return()}finally{if(m)throw l}}e[n.state.character_index].classList.add("active"),o[n.state.character_index].classList.add("walking")},n.walk=function(){if("char_select"===n.props.view&&1===n.state.page){var e=document.getElementsByClassName("walking")[0];"-30px"===(t=e).style.backgroundPositionX?t.style.backgroundPositionX="0px":t.style.backgroundPositionX="-30px"}var t},n.componentDidMount=function(){n.setState({interval:setInterval(n.walk,110)}),n.setState({listener:window.addEventListener("keydown",function(e){switch(e.key){case"ArrowLeft":n.cycle_index_down(n.state.character_index);break;case"ArrowRight":n.cycle_index_up(n.state.character_index)}})})},n.componentDidUpdate=function(){"char_select"===n.props.view&&1===n.state.page&&n.point()},n.componentWillUnmount=function(){clearInterval(n.state.interval)},n.handle_change=function(e){n.setState({name:e.target.value})},n.handle_change2=function(e){n.setState({opponent_id:e.target.value})},n.next=function(){n.setState({page:2})},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return"char_select"!==this.props.view?null:1===this.state.page?s.a.createElement("div",null,s.a.createElement("div",{id:"char_select"},s.a.createElement("p",{id:"choose"},"Choose Your Character"),s.a.createElement("div",{className:"char_container"},s.a.createElement("div",{id:"char_1",className:"char_choice walking"}),s.a.createElement("div",{id:"char_2",className:"char_choice"}),s.a.createElement("div",{id:"char_3",className:"char_choice"}),s.a.createElement("div",{id:"char_4",className:"char_choice"}),s.a.createElement("div",{id:"char_5",className:"char_choice"}),s.a.createElement("div",{id:"char_6",className:"char_choice"})),s.a.createElement("div",{className:"char_container"},s.a.createElement("div",{id:"hole_1",className:"carrot_hole active"}),s.a.createElement("div",{id:"hole_2",className:"carrot_hole"}),s.a.createElement("div",{id:"hole_3",className:"carrot_hole"}),s.a.createElement("div",{id:"hole_4",className:"carrot_hole"}),s.a.createElement("div",{id:"hole_5",className:"carrot_hole"}),s.a.createElement("div",{id:"hole_6",className:"carrot_hole"})),s.a.createElement("div",{className:"container"},s.a.createElement("div",{onClick:function(){e.cycle_index_down(e.state.character_index)},className:"arrow left-arrow"}),s.a.createElement("div",{onClick:function(){e.cycle_index_up(e.state.character_index)},className:"arrow right-arrow"})),s.a.createElement("p",null,"Name Your Character"),s.a.createElement("input",{value:this.state.name,onChange:this.handle_change,id:"name",type:"text"}),s.a.createElement("div",{id:"next",onClick:this.next},"Next")),s.a.createElement("div",{id:"screen"})):2===this.state.page?s.a.createElement("div",null,s.a.createElement("div",{id:"char_select"},s.a.createElement("p",{id:"your"},"Your ID is:"),s.a.createElement("p",{id:"id"},this.props.my_id),s.a.createElement("p",null,"Enter Opponent's ID:"),s.a.createElement("input",{value:this.state.opponent_id,onChange:this.handle_change2,id:"opponent_id",type:"text"}),s.a.createElement("p",{id:"tip"},"TIP: leave this blank to play against the bot, or open this page in another browser to play both characters yourself!"),s.a.createElement("div",{onClick:function(){e.props.start(e.state.characters[e.state.character_index],e.state.name,e.state.opponent_id)},id:"start"},"Fight!")),s.a.createElement("div",{id:"screen"})):void 0}}]),t}(a.Component),h=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(l.a)(this,Object(_.a)(t).call(this,e))).me=function(){return document.getElementById("me")},n.walk=function(){var e=n.props.names;n.setState({my_interval:setInterval(function(){window.getComputedStyle(n.me()).backgroundPositionX===e.standing?n.me().style.backgroundPositionX=e.walking:n.me().style.backgroundPositionX=e.standing},150)})},n.approach=function(){n.me().style.left="40%",n.walk()},n.attack=function(){var e=n.props.names;n.me().style.backgroundPositionX=e.pre_attack,setTimeout(function(){n.me().stylebackgroundPositionX=e.attack},200)},n.get_hit=function(){var e=n.props.names;n.me().style.backgroundPositionX=e.hit,setTimeout(function(){n.show_damage()},800)},n.show_damage=function(){var e=n.props.names;n.props.my_stats.hp>1?n.me().style.backgroundPositionX=e.standing:n.props.my_stats.hp<=1&&(n.me().style.backgroundPositionX=e.hurt)},n.celebrate=function(){var e=n.props.names;n.me().style.backgroundPositionX=e.pre_attack,setTimeout(function(){n.me().style.backgroundPositionX=e.standing},200),setTimeout(function(){n.me().style.backgroundPositionX=e.pre_attack},400),setTimeout(function(){n.me().style.backgroundPositionX=e.standing},600)},n.return=function(){n.me().style.left="27%",n.me().style.transform="scale(2.9)",n.walk()},n.returned=function(){console.log("me returned"),n.stop_walking(),n.me().style.transform="scale(2.9) scaleX(-1)",n.show_damage()},n.componentDidUpdate=function(){n.setY()},n.componentWillUpdate=function(e,t){if(n.props.animate_me!==e.animate_me)switch(e.animate_me){case"celebrate":n.celebrate();break;case"approach":n.approach();break;case"stop walking":n.stop_walking();break;case"attack":n.attack();break;case"show_damage":n.show_damage();break;case"return":n.return();break;case"returned":n.returned();break;case"get_hit":n.get_hit()}},n.setY=function(){var e=document.getElementById("me");switch(n.props.my_character){case 1:e.style.backgroundPositionY="-2px";break;case 2:e.style.backgroundPositionY="-40px";break;case 3:e.style.backgroundPositionY="-79px";break;case 4:e.style.backgroundPositionY="-116px";break;case 5:e.style.backgroundPositionY="-154px";break;case 6:e.style.backgroundPositionY="-187px";break;default:e.style.backgroundPositionY="-2px"}},n.state={my_interval:null,left:"27%",backgroundPositionX:"0px;"},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"stop_walking",value:function(){console.log("me stop walking");var e=this.props.names;clearInterval(this.state.my_interval),this.me().style.backgroundPositionX=e.standing}},{key:"render",value:function(){return s.a.createElement("div",{id:"me"})}}]),t}(a.Component),f=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).state={enemy_interval:null},n.walk=function(){var e=n.props.names;n.setState({enemy_interval:setInterval(function(){window.getComputedStyle(n.enemy()).backgroundPositionX===e.standing?n.enemy().style.backgroundPositionX=e.walking:n.enemy().style.backgroundPositionX=e.standing},150)})},n.stop_walking=function(){console.log("enemy stop walking");var e=n.props.names;clearInterval(n.state.enemy_interval),n.enemy().style.backgroundPositionX=e.standing},n.componentDidUpdate=function(){n.setY()},n.componentWillUpdate=function(e,t){if(n.props.animate_enemy!==e.animate_enemy)switch(e.animate_enemy){case"show_damage":n.show_damage();break;case"get_hit":n.get_hit();break;case"celebrate":n.celebrate();break;case"approach":n.approach();break;case"stop_walking":n.stop_walking();break;case"attack":n.attack();break;case"return":n.return();break;case"returned":n.returned()}},n.approach=function(){n.enemy().style.right="40%",n.walk()},n.return=function(){n.walk(),n.enemy().style.right="27%",n.enemy().style.transform="scale(2.9) scaleX(-1)"},n.returned=function(){console.log("enemy returned"),n.stop_walking(),n.enemy().style.transform="scale(2.9)",n.show_damage()},n.attack=function(){var e=n.props.names;n.enemy().style.backgroundPositionX=e.pre_attack,setTimeout(function(){n.enemy().style.backgroundPositionX=e.attack},200)},n.show_damage=function(){var e=n.props.names;n.props.enemy_stats.hp>1?n.enemy().style.backgroundPositionX=e.standing:n.props.enemy_stats.hp<=1&&(n.enemy().style.backgroundPositionX=e.hurt)},n.get_hit=function(){console.log("get hit");var e=n.props.names;n.enemy().style.backgroundPositionX=e.hit,setTimeout(function(){n.show_damage()},800)},n.celebrate=function(){console.log("celebrate");var e=n.props.names;n.enemy().style.backgroundPositionX=e.pre_attack,setTimeout(function(){n.enemy().style.backgroundPositionX=e.standing},200),setTimeout(function(){n.enemy().style.backgroundPositionX=e.pre_attack},400),setTimeout(function(){n.enemy().style.backgroundPositionX=e.standing},600)},n.enemy=function(){return document.getElementById("enemy")},n.setY=function(){var e=document.getElementById("enemy");switch(n.props.enemy_character){case 1:e.style.backgroundPositionY="-2px";break;case 2:e.style.backgroundPositionY="-40px";break;case 3:e.style.backgroundPositionY="-79px";break;case 4:e.style.backgroundPositionY="-116px";break;case 5:e.style.backgroundPositionY="-154px";break;case 6:e.style.backgroundPositionY="-187px";break;default:e.style.backgroundPositionY="-2px"}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"enemy"})}}]),t}(a.Component),g=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).execute=function(){var e=document.getElementById("my_move"),t=n.props.get_hand_position(n.props.my_attack);e.style.backgroundPosition=t.backgroundPosition,e.style.height=t.height,e.style.width=t.width,e.style.opacity=0,e.style.left="75%"},n.reset=function(){var e=document.getElementById("my_move");e.style.height="0px",e.style.width="0px",e.style.opacity="1",e.style.left="40%"},n.componentWillUpdate=function(e,t){if(n.props.animate_my_move!==e.animate_my_move)switch(e.animate_my_move){case"execute":n.execute();break;case"reset":n.reset()}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"my_move"})}}]),t}(a.Component),k=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).reset=function(){var e=document.getElementById("enemy_move");e.style.height="0px",e.style.width="0px",e.style.opacity="1",e.style.right="40%"},n.execute=function(){var e=n.props.get_hand_position(n.props.enemy_attack),t=document.getElementById("enemy_move");t.style.backgroundPosition=e.backgroundPosition,t.style.height=e.height,t.style.width=e.width,t.style.opacity=0,t.style.right="75%"},n.componentWillUpdate=function(e,t){if(n.props.animate_enemy_move!==e.animate_enemy_move)switch(e.animate_enemy_move){case"execute":n.execute();break;case"reset":n.reset()}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"enemy_move"})}}]),t}(a.Component),v=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).enemy_defence=function(){return document.getElementById("enemy_defence")},n.success=function(){n.set_style(),n.enemy_defence().style.right="35%"},n.failure=function(){n.set_style(),n.enemy_defence().style.right="10%"},n.set_style=function(){var e=n.props.get_hand_position(n.props.enemy_defence);n.enemy_defence().style.height=e.height,n.enemy_defence().style.width=e.width,n.enemy_defence().style.backgroundPosition=e.backgroundPosition,n.enemy_defence().style.opacity=0},n.reset=function(){n.enemy_defence().style.height="0px",n.enemy_defence().style.width="0px",n.enemy_defence().style.opacity="1",n.enemy_defence().style.right="27%"},n.componentWillUpdate=function(e,t){if(n.props.animate_enemy_defence!==e.animate_enemy_defence)switch(e.animate_enemy_defence){case"success":n.success();break;case"failure":n.failure();break;case"reset":n.reset()}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"enemy_defence"})}}]),t}(a.Component),b=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).my_defence=function(){return document.getElementById("my_defence")},n.success=function(){n.set_style(),n.my_defence().style.left="35%"},n.failure=function(){n.set_style(),n.my_defence().style.left="10%"},n.reset=function(){n.my_defence().style.height="0px",n.my_defence().style.width="0px",n.my_defence().style.opacity="1",n.my_defence().style.left="27%"},n.set_style=function(){var e=n.props.get_hand_position(n.props.my_defence);n.my_defence().style.height=e.height,n.my_defence().style.width=e.width,n.my_defence().style.backgroundPosition=e.backgroundPosition,n.my_defence().style.opacity=0},n.componentWillUpdate=function(e,t){if(n.props.animate_my_defence!==e.animate_my_defence)switch(e.animate_my_defence){case"success":n.success();break;case"failure":n.failure();break;case"reset":n.reset()}},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"my_defence"})}}]),t}(a.Component),w=n(33),x=n.n(w),E=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(l.a)(this,(e=Object(_.a)(t)).call.apply(e,[this].concat(s)))).state={my_stats:{hp:3,pp:{rock:3,paper:3,scissors:3}},enemy_stats:{hp:3,pp:{rock:3,paper:3,scissors:3}},my_attack:null,my_defence:null,enemy_attack:null,enemy_defence:null,my_character:null,enemy_character:null,view:"char_select",selection:"attack",choices:["rock","paper","scissors"],choices_index:0,my_name:null,enemy_name:"RPS-Bot",display_text:"",animate_me:null,animate_my_move:null,animate_enemy:null,animate_enemy_defence:null,animate_enemy_move:null,names:{standing:"0px",walking:"-31px",pre_attack:"-63px",attack:"-91px",hit:"-133px",hurt:"-163px",dead:"-253px"},endpoint:"https://infinite-castle-27081.herokuapp.com/",my_id:null,enemy_id:null,single_player:!1},n.set_attack=function(){n.setState({my_attack:n.state.choices[n.state.choices_index]})},n.set_choices_index=function(e){n.setState({choices_index:e})},n.set_defence=function(){n.setState({my_defence:n.state.choices[n.state.choices_index]})},n.handle_enter=function(){var e=n.state.choices,t=n.state.choices_index,a=JSON.parse(JSON.stringify(n.state.my_stats));"select"===n.state.view&&"attack"===n.state.selection?n.state.my_stats.pp[e[t]]>0&&(a.pp[e[t]]--,n.setState({my_attack:e[t],selection:"defence",my_stats:a}),n.set_text("Select Defence")):"select"===n.state.view&&"defence"===n.state.selection&&n.state.my_stats.pp[e[t]]>0&&(a.pp[e[t]]--,n.setState({my_defence:e[t],selection:"",my_stats:a,view:"waiting"},function(){n.set_text("Waiting for Opponent..."),!0===n.state.single_player?n.get_enemy_move():(n.send_moves_to_server(),n.check_for_ready())}))},n.send_moves_to_server=function(){console.log("sending this to server: "+n.state.my_attack+n.state.my_defence),n.socket.emit("moves_from_client",{attack:n.state.my_attack,defence:n.state.my_defence,enemy_id:n.state.enemy_id})},n.set_text=function(e){n.setState({display_text:""}),setTimeout(function(){n.setState({display_text:e})},300)},n.get_enemy_move=function(){var e,t,a=Object.keys(n.state.enemy_stats.pp).filter(function(e){return n.state.enemy_stats.pp[e]>0});e=a[n.get_random_int(a.length)],t=a[n.get_random_int(a.length)];var s=JSON.parse(JSON.stringify(n.state.enemy_stats));s.pp[e]--,s.pp[t]--,setTimeout(function(){n.setState({enemy_stats:s,enemy_attack:e,enemy_defence:t}),n.fight()},2500)},n.fight=function(){setTimeout(function(){n.set_text("".concat(n.state.my_name," uses ").concat(n.state.my_attack.toUpperCase(),"!")),n.setState({animate_me:"approach"})},1e3),setTimeout(function(){console.log("app calls me stop walking"),n.setState({animate_me:"stop walking"})},2200),setTimeout(function(){n.setState({animate_me:"attack"})},2300),setTimeout(function(){n.setState({animate_my_move:"execute"})},2500),setTimeout(function(){n.setState({animate_enemy:"show_damage"}),n.enemy_block_successful()?n.setState({animate_enemy_defence:"success",animate_enemy:"celebrate"}):(n.setState({animate_enemy_defence:"failure",animate_enemy:"get_hit"}),n.take_damage("enemy"))},2700),setTimeout(function(){n.setState({animate_my_move:"reset",animate_enemy_defence:"reset",animate_me:"return",animate_enemy:"show_damage"})},3500),setTimeout(function(){n.enemy_block_successful()?n.set_text("But ".concat(n.state.enemy_name," blocks it with ").concat(n.state.enemy_defence.toUpperCase(),"!")):n.set_text("".concat(n.state.enemy_name," tries to block with ").concat(n.state.enemy_defence.toUpperCase(),"...but it doesn't work"))},3600),setTimeout(function(){console.log("app calls me returned"),n.setState({animate_me:"returned"})},4500),setTimeout(function(){n.set_text("".concat(n.state.enemy_name," uses ").concat(n.state.enemy_attack.toUpperCase(),"!")),n.setState({animate_enemy:"approach"})},6e3),setTimeout(function(){console.log("app calls enemy stop walking"),n.setState({animate_enemy:"stop_walking"})},7200),setTimeout(function(){n.setState({animate_enemy:"attack"})},7300),setTimeout(function(){n.setState({animate_enemy_move:"execute"})},7500),setTimeout(function(){n.setState({animate_enemy:"show_damage"}),n.my_block_successful()?n.setState({animate_my_defence:"success",animate_me:"celebrate"}):(n.setState({animate_my_defence:"failure",animate_me:"get_hit"}),n.take_damage("me"))},7700),setTimeout(function(){n.setState({animate_enemy_move:"reset",animate_my_defence:"reset",animate_enemy:"return",animate_me:"show_damage"})},8500),setTimeout(function(){n.my_block_successful()?n.set_text("But ".concat(n.state.my_name," blocks it with ").concat(n.state.my_defence.toUpperCase(),"!")):n.set_text("".concat(n.state.my_name," tries to block with ").concat(n.state.my_defence.toUpperCase(),"...but it doesn't work"))},9e3),setTimeout(function(){console.log("app calls enemy returned"),n.setState({animate_enemy:"returned"})},9500),setTimeout(function(){n.is_winner()||(n.setState({view:"select",selection:"attack",my_attack:null,my_defence:null,enemy_attack:null,enemy_defence:null}),n.set_text("Select Attack"))},10500)},n.get_random_int=function(e){return Math.floor(Math.random()*Math.floor(e))},n.block_successful=function(e,t){switch(e){case"rock":return"paper"===t;case"paper":return"scissors"===t;case"scissors":return"rock"===t;default:console.log("something went wrong")}},n.my_block_successful=function(){return n.block_successful(n.state.enemy_attack,n.state.my_defence)},n.enemy_block_successful=function(){return n.block_successful(n.state.my_attack,n.state.enemy_defence)},n.take_damage=function(e){var t,a;console.log("take damage"),"me"===e?(t=n.state.my_stats,a="my_stats"):(t=n.state.enemy_stats,a="enemy_stats"),console.log("before set state: "+a+" "+t.hp);var s=JSON.parse(JSON.stringify(t));console.log("copy before subtraction: "+s.hp),s.hp--,console.log("copy after subtraction: "+s.hp),n.setState(Object(o.a)({},a,s))},n.is_winner=function(){var e=[n.state.my_stats.hp,n.state.enemy_stats.hp];return 0===e[0]&&0===e[1]?(n.draw(),!0):0===e[0]?(n.set_text("".concat(n.state.enemy_name," wins!")),document.getElementById("me").style.backgroundPositionX="-253px",!0):0===e[1]&&(n.set_text("".concat(n.state.my_name," wins!")),document.getElementById("enemy").style.backgroundPositionX="-253px",!0)},n.draw=function(){n.set_text("Draw!")},n.start=function(e,t,a){function s(){var e=document.getElementById("char_select"),t=window.getComputedStyle(e).opacity;e.style.opacity=t-.2}t.length||(t="anonymous"),n.setState({enemy_id:a,my_character:e,my_name:t},n.send_initial_info),setTimeout(s,500),setTimeout(s,1e3),setTimeout(s,1500),setTimeout(s,2e3),setTimeout(s,2500),setTimeout(function(){var e=!1;a.length||(e=!0),n.setState({view:"select",display_text:"Select Attack",single_player:e})},3e3)},n.get_hand_position=function(e){var t={};switch(e){case"rock":t.backgroundPosition="-915px -310px",t.height="95px",t.width="95px";break;case"paper":t.backgroundPosition="-688px -290px",t.height="120px",t.width="90px";break;case"scissors":t.backgroundPosition="-230px -520px",t.height="120px",t.width="90px";break;default:console.log("something went wrong")}return t},n.send_initial_info=function(){n.socket.emit("initial_info",{name:n.state.my_name,enemy_id:n.state.enemy_id,character:n.state.my_character})},n.check_for_ready=function(){var e;console.log("checking..."),n.state.enemy_attack&&n.state.enemy_defence?n.setState({view:"animation"},function(){n.fight(),clearTimeout(e)}):console.log("no enemy attack and defence"),"waiting"===n.state.view?e=setTimeout(n.check_for_ready,800):console.log("view not waiting")},n}return Object(d.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket=x()(),this.socket.on("socket_id",function(t){e.setState({my_id:t})}),this.socket.on("initial_info_from_server",function(t){console.log("Got initial info from server: "+t),e.setState({enemy_character:t.character,enemy_name:t.name})}),this.socket.on("moves_from_server",function(t){console.log("Got moves from server: "+t),e.setState({enemy_attack:t.attack,enemy_defence:t.defence})}),window.addEventListener("keydown",function(t){if("select"===e.state.view)switch(t.key){case"ArrowDown":t.preventDefault(),e.cycle_index_up(e.state.choices_index);break;case"ArrowUp":t.preventDefault(),e.cycle_index_down(e.state.choices_index);break;case"Enter":t.preventDefault(),e.handle_enter();break;default:console.log("there was a problem")}})}},{key:"cycle_index_up",value:function(e){var t;t=2===e?0:e+1,this.setState({choices_index:t})}},{key:"cycle_index_down",value:function(e){var t;t=0===e?2:e-1,this.setState({choices_index:t})}},{key:"render",value:function(){return s.a.createElement("div",{id:"wrapper"},s.a.createElement(b,{my_defence:this.state.my_defence,get_hand_position:this.get_hand_position,animate_my_defence:this.state.animate_my_defence}),s.a.createElement(g,{my_attack:this.state.my_attack,get_hand_position:this.get_hand_position,animate_my_move:this.state.animate_my_move}),s.a.createElement(k,{get_hand_position:this.get_hand_position,enemy_attack:this.state.enemy_attack,animate_enemy_move:this.state.animate_enemy_move}),s.a.createElement(v,{enemy_defence:this.state.enemy_defence,get_hand_position:this.get_hand_position,animate_enemy_defence:this.state.animate_enemy_defence}),s.a.createElement(f,{enemy_character:this.state.enemy_character,animate_enemy:this.state.animate_enemy,enemy_stats:this.state.enemy_stats,names:this.state.names}),s.a.createElement(h,{names:this.state.names,animate_me:this.state.animate_me,my_character:this.state.my_character,my_stats:this.state.my_stats}),s.a.createElement(p,{view:this.state.view,my_id:this.state.my_id,start:this.start}),s.a.createElement(y,{display_text:this.state.display_text}),s.a.createElement(u,{set_choices_index:this.set_choices_index,cycle_index_up:this.cycle_index_up,cycle_index_down:this.cycle_index_down,handle_enter:this.handle_enter.bind(this),my_stats:this.state.my_stats,choices:this.state.choices,choices_index:this.state.choices_index,my_name:this.state.my_name,view:this.state.view}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[34,1,2]]]);
//# sourceMappingURL=main.5b6b78cd.chunk.js.map