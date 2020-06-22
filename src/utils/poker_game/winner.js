import * as Global from './globals'

//Return true if 5 suits are equal, else, false
function CheckTheNaipe(cards) {

  //Return an array with the equals suits
  function CountEqualSuits(suits) {
    //Return the suit which is equal your predecessor and successor
    let equal_suits = suits.filter((suit, index) => (
      suit === suits[index - 1] || suit === suits[index + 1]
    ))

    //Filtering, because I can have [c,c,c,d,d] 
    equal_suits = equal_suits.filter((suit) => (
      equal_suits[0] === suit
    ))

    return equal_suits
  }
  
  //This function will return something the suits of my cards
  const suits = Global.ReturnSomethingSuits(cards)

  //Return an array with the equals suits
  const equals_suits = CountEqualSuits(suits)

  //Poker something have points with suits, if it is bigger than 5
  if(equals_suits.length === 5){
    return true
  }else{
    return false
  }
}

//Return true if the player has a sequence, else, false
function CheckIfIsSequence(cards) {
  //Return the values of my cards
  let cards_values = Global.ReturnTheCardsValue(cards)

  //Determine the value of the "A"
  if(cards_values.indexOf("K") >= 0){
    //Case have an "K", in this sequence, the "As" will value 14
    cards_values = Global.TransformLettersInNumbers(cards_values, true)
  }else {
    //Else, in this sequence, the "As" will value 1
    cards_values = Global.TransformLettersInNumbers(cards_values)
  }

  //Organize my array in an ascending form
  cards_values = Global.OrganizeArrayOfNumbers(cards_values)

  cards_values = Global.RemoveRepetitions(cards_values)

  //Return true of false
  function CheckIfIsSequence(cards) {
    let i = 0
    const next_cart = cards[i + 1]

    while(cards[i] + 1 === next_cart){
      i++
    }

    if(i >= 4){
      return true
    }

    return false
  }

  const result = CheckIfIsSequence(cards_values)

  return result
}

//Return an object which has the card name and
//how much times it repeat
function CheckAllRepetitions(cards) {

  const cards_values = Global.ReturnTheCardsValue(cards)

  const repetitions = Global.ReturnRepetitions(cards_values)
  
  function CalcRepetitions(types, cards) {
    const repetitions = types.map((type) => {
      let obj_carta = {
        carta: type,
        vezes: 0,
      };

      cards.forEach((carta) => {
        if (type === carta) {
          obj_carta.vezes++;
        }
      });

      return obj_carta;
    }); 

    //Pois só quero as maiores repetições
    if (repetitions.length === 3) {
      //Como repetitions já será um array organizado do menor ao maior
      //E sabemos que o maior nú
      if(repetitions[0].vezes === 3){
        repetitions.splice(1, 1)
      } else {
        repetitions.splice(0, 1)
      }
    }

    return repetitions;
  }

  const cards_types = Global.RemoveRepetitions(repetitions)
  const result = CalcRepetitions(cards_types, repetitions)
  return result
}

export function DiscoverTheWinner(players, table_cards) {
  
  //Check each playes's score
  for (var i=0; i <= (players.length - 1); i++) {
    const score = ReturnThePlayersScore(players[i].cards)
    players[i].score = score
  }

  
  function ReturnThePlayersScore(user_cards) {
    const cards = [...user_cards, ...table_cards]

    const results = {
      is_same_suit: CheckTheNaipe(cards), //return boolean
      is_sequence: CheckIfIsSequence(cards), //return boolean
      repetitions: CheckAllRepetitions(cards) //return []
    }

    //Return the player's score
    function CalcThePlayersScore(results) {
      const { is_same_suit, is_sequence, repetitions } = results;

      //Straight Flush
      if (is_sequence && is_same_suit) {
        return 9;
      }

      //Quadra
      if (repetitions.length !== 0) {
        if (repetitions[0].vezes === 4) {
          return 8;
        }
      }

      //Full House
      if (repetitions[0] && repetitions[1]) {
        if (
          (repetitions[0].vezes === 3 && repetitions[1].vezes === 2) ||
          (repetitions[1].vezes === 3 && repetitions[0].vezes === 2)
        ) {
          return 7;
        }
      }

      // Flush
      if (is_same_suit) {
        return 6;
      }

      // Sequencia
      if (is_sequence) {
        return 5;
      }

      // Trinca
      if (repetitions.length !== 0) {
        if (repetitions[0].vezes === 3) {
          return 4;
        }
      }

      // Dois Pares
      if (repetitions[0] && repetitions[1]) {
        if (repetitions[0].vezes === 2 && repetitions[1].vezes === 2) {
          return 3;
        }
      }

      // Par
      if (repetitions.length !== 0) {
        if (repetitions[0].vezes === 2) {
          return 2;
        }
      }

      // Carta Alta
      return 1;
    }

    return CalcThePlayersScore(results)
  }

  //Return an array with all winners, or winner index, case have
  //something one
  function DeterminarGanhador(players) {
    const winners = []
    const winner = {
      score: 0,
      index: 0
    }

    players.forEach((player, index) => {
      if(player.score > winner.score){
        winner.score = player.score
        winner.index = index
      }
    })

    players.forEach((player, index) => {
      if(player.score === winner.score){
        winners.push(index)
      }
    })

    if (winners.length > 0){
      return winners
    }

    return winner.index
  }

  const winner = DeterminarGanhador(players)

  return winner
}
