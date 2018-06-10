import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Chatbox extends Component {
	constructor() {
		super();
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		if (event.keyCode === 13) {
			this.props.messageSubmit(this.state.value);
   event.preventDefault();
   this.setState({ value: '' });
		}
	}

	render() {
  const messages = this.props.messages;
		return (
			<div className='chatbox-container' >
			<Paper style={{ align: 'center',  width: '50%',  margin: 'auto' }} elevation={8}>
			<Typography align="center" variant="subheading" gutterBottom>
							Chat
						</Typography>
				<div className='chatbox'>
					{messages.map((message) => (
						<p>
							{message.author}: {message.text}{' '}
						</p>
					))}
				</div> 
				<input type="text" value={this.state.value} onKeyDown={this.handleSubmit} onChange={this.handleChange} style={{ align: 'center',  width: '100%', height: '100%' }} />
		 </Paper>
			</div>
		);
	}
}

export default Chatbox;
