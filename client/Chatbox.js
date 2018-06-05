import React, { Component } from 'react';

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
			<div style={{ textAlign: 'center',width: '100%',  margin: 'auto' }}>
				<div style={{ textAlign: 'left', margin: 'auto', backgroundColor: 'white', maxWidth: '50%', height: '150px', overflow: 'scroll' }}>
					{messages.map((message) => (
						<p>
							{message.author}: {message.text}{' '}
						</p>
					))}
				</div>
				<input type="text" value={this.state.value} onKeyDown={this.handleSubmit} onChange={this.handleChange} style={{ align: 'center',  width: '50%',  margin: 'auto' }} />
			</div>
		);
	}
}

export default Chatbox;
