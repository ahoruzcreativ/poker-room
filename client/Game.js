import React, {Component} from "react";
import io from "socket.io-client"
import { getPlayer } from './store/clientPlayer'
import { connect } from 'react-redux';
import Seats from './seats'
import Actions from './playerActions'

let socket
const mapStateToProps = state => ({state})
const mapDispatchToProps = (dispatch) => ( {getPlayer: id => dispatch(getPlayer(id))})

class Test extends Component {
 constructor(props) {
  super(props)
  this.state = {
   id: '',
   gameState: {
    players: [],
    gameDeck: ''
   }
  }
  this.check = this.check.bind(this)
  socket = io.connect()
  socket.on('clientId', (id) => {
   this.setState({id})
  })
  socket.on('gameState', (gameState) => {
   this.setState({gameState})
  })
 }

 shuffle() {
  socket.emit('shuffle')
 }

 deal() {
  socket.emit('deal')
 }

 check() {
  console.log(this.state.gameState)
  socket.emit('check')
  console.log(this.state.gameState)
 }

 render() {
 
  const players = this.state.gameState.players
  const id = this.state.id
	const clientPlayer = players.filter((player) => player.id === id);
  const deck = this.state.gameState.gameDeck
  return (
   <div>
   <div className="container">
    <img src="poker_table.svg" />
    <Seats clientPlayer={clientPlayer} id={id} players={players} />
    <Actions clientPlayer={clientPlayer} check={this.check} />
    </div>
    <button onClick={this.shuffle}>Shuffle </button>
    <button onClick={this.deal}>Deal</button>
    <p>Number of players: {players.length} </p>
    </div>
  )
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);