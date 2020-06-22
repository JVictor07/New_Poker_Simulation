import React from 'react'
import Card from '../../components/Card/Card'

import './Cards.scss'

export default function Cards({cards}) {
  return (
    <ul className="cards">
      {cards.map((card, index) => (
        <Card key={index} card={card}/>
      ))}
    </ul>
  )
}
