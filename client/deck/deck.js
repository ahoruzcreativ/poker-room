class Deck {
	constructor() {
		this.cards = [
			'Ac',
			'2c',
			'3c',
			'4c',
			'5c',
			'6c',
			'7c',
			'8c',
			'9c',
			'Tc',
			'Jc',
			'Qc',
			'Kc',
			'Ad',
			'2d',
			'3d',
			'4d',
			'5d',
			'6d',
			'7d',
			'8d',
			'9d',
			'Td',
			'Jd',
			'Qd',
			'Kd',
			'Ah',
			'2h',
			'3h',
			'4h',
			'5h',
			'6h',
			'7h',
			'8h',
			'9h',
			'Th',
			'Jh',
			'Qh',
			'Kh',
			'As',
			'2s',
			'3s',
			'4s',
			'5s',
			'6s',
			'7s',
			'8s',
			'9s',
			'Ts',
			'Js',
			'Qs',
			'Ks'
		];
		this.dealtCards = [];
		this.shuffle = this.shuffle.bind(this);
		this.shuffleDeck = this.shuffleDeck.bind(this);
		this.dealCards = this.dealCards.bind(this);
	}

	shuffle(array) {
		let m = array.length,
			t,
			i;

		while (m) {
			i = Math.floor(Math.random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

	shuffleDeck() {
		this.dealtCards.forEach( card => this.cards.push(card))
		this.dealtCards = [];
		this.cards = this.shuffle(this.cards);
	}

	dealCards(num) {
		const cards = [];
		for (let i = 0; i < num; i++) {
			cards.push(this.cards.pop());
		}
		cards.forEach(card => this.dealtCards.push(card))
		return cards;
	}
}

module.exports = Deck
