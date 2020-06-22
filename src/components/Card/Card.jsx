import React, {useState, useEffect} from 'react'
import "./Card.scss"

export default function Card({card}) {
  const [hearts, setHearts] = useState(false)
  const [diams, setDiams] = useState(false)
  const [clubs, setClubs] = useState(false)
  const [spades, setSpades] = useState(false)
  
  const value = ReturnValue(card)
  const suit = ReturnSuit(card)

  function ReturnSuit(card) {
    //If has "10"
    if (card.length === 3) {
      return card.substr(2, 1);
    }
    return card.substr(1, 1);
  }

  function ReturnValue(card) {
    //If has "10"
    if (card.length === 3) {
      return card.substr(0, 2)
    }
    return card.substr(0, 1)
  }
  
  useEffect(() => {
    if(suit === "c"){
      setClubs(true)
    } else if(suit === "d") {
      setDiams(true)
    } else if(suit === "h") {
      setHearts(true)
    } else if(suit === "s") {
      setSpades(true)
    }
  }, [suit])

  return (
    <li className="card">
      <span className="card__value">{value}</span>
      {diams && <span className="card__suit card__suit--red">&diams;</span>}
      {hearts && <span className="card__suit card__suit--red">&hearts;</span>}
      {spades && <span className="card__suit">&spades;</span>}
      {clubs && <span className="card__suit">&clubs;</span>}
    </li>
  );
}
