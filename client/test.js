import React, {Component} from "react";
import io from "socket.io-client"
import { getPlayer } from './store/clientPlayer'
import { connect } from 'react-redux';
import Seats from './seats'

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
 render() {
 
  const players = this.state.gameState.players
  const deck = this.state.gameState.gameDeck
  console.log('players', players)
  console.log('deck', deck)
  const id = this.state.id
  return (
   <div>
   <div className="container">
    <img src="poker_table.svg" />
    <Seats id={id} players={players} />
    <button onClick={this.shuffle}>Shuffle </button>
    <button onClick={this.deal}>Deal</button>
    </div>
    <p>Number of players: {players.length} </p>
    </div>
  )
 }
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);