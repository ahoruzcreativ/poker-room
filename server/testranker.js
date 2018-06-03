const Ranker = require('handranker');

const hands = [{id: 'asdasdas', cards: ['Ac', 'Ad'], test: 'asdasdas'}, {id: '232dsa', cards: ['Ah', 'As']}]
const board = ['2c','2h', '3h', '3d', '4c']

const winner = Ranker.orderHands(hands, board)
console.log(winner)