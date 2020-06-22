const clubs = ["Ac","2c","3c","4c","5c","6c","7c","8c","9c","10c","Jc","Qc","Kc"]
const diamonds = ["Ad","2d","3d","4d","5d","6d","7d","8d","9d","10d","Jd","Qd","Kd"]
const hearts = ["Ah","2h","3h","4h","5h","6h","7h","8h","9h","10h","Jh","Qh","Kh"]
const spades = ["As","2s","3s","4s","5s","6s","7s","8s","9s","10s","Js","Qs","Ks"]

var deck = [...clubs, ...diamonds, ...hearts, ...spades]

//Separate function, because with in the future I want
//do a real poker game simulation, I can take the cards
//in each round and add in the deck.

//Return one card from the deck
function TakeTheCard() {
  //Draw one number to be my card in the deck
  const posicao_array = Math.floor(Math.random() * deck.length)

  const card = deck[posicao_array]
  
  //remove the card in the deck
  deck.splice(posicao_array, 1)

  return card
}

export function DealTheCards(players_num) {

  //Return the number of cards, based in the number
  //what was passed as a param
  function TakeTheCards(number_of_cards) {
    const cards = [];

    while (number_of_cards > 0) {
      let card = TakeTheCard();
      cards.push(card);

      number_of_cards--;
    }

    return cards;
  }

  //Return one array of objects, with all players and your cards
  function TakeThePlayersCards(num_of_players) {
    let players_cards = [];
    let player_number = 1

    //For each player, the var "players_cards", receive 2 cards
    while (num_of_players > 0) {
      players_cards.push({
        player: player_number.toString(),
        cards: TakeTheCards(2),
      });

      player_number++
      num_of_players--;
    }

    return players_cards
  }

  return {
    table_cards: TakeTheCards(5),
    players: TakeThePlayersCards(players_num),
  };
}



