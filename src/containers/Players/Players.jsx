import React from 'react'

import './Players.scss'

export default function Players({winners, children}) {
  return (
    <section className="players">
      {React.Children.map(children, (child, i) => {
          if(winners.indexOf(i) >= 0){
            return React.cloneElement(child, {
              className: "players__player players__player--winner"
            })
          }
        return child
      })
      }
    </section>
  )
}
