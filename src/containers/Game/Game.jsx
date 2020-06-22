import React from "react";
import "./Game.scss";

/* Components */
import Players from '../Players/Players'
import Cards from '../Cards/Cards'

/* Utils */
import { useParams } from 'react-router-dom'
import { DealTheCards } from '../../utils/poker_game/deal_the_cards'
import { DiscoverTheWinner } from '../../utils/poker_game/winner'

export default function Game() {
  const { number_of_players } = useParams()
  const { table_cards, players } = DealTheCards(number_of_players)
  const winners = DiscoverTheWinner(players, table_cards)

  return (
    <main className="main-game">
      <div className="container">
        <div className="main-game__top">
          <section className="table">
            <h2>Mesa</h2>
            <Cards cards={table_cards} />
          </section>

          <span className="message">The winner/s will have a <strong>green</strong> border </span>
        </div>

        <Players winners={winners}>
          {players.map(({ player, cards }, index) => (
            <div key={index} className="players__player">
              <span>Jogador {player}</span>
              <Cards cards={cards} />
            </div>
          ))}
        </Players>
      </div>
    </main>
  );
}
