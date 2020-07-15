//In this archive has some functions which can be used in more than one place

//Return an array of numbers in ascending order
export function OrganizeArrayOfNumbers(numbers) {
  numbers.sort(function(a, b) {
    return a - b
  })

  return numbers
}

//Return an array of suits
export function ReturnSomethingSuits(cards) {
  const suits_list = cards.map(card => {
    //Case has the card 10
    if (card.length === 3){
      return card.substr(2, 1)
    }
    return card.substr(1, 1)
  })

  return suits_list
}

//Return an array with the cards values
export function ReturnTheCardsValue(cards) {
  const cards_values = cards.map(card => {
    //Case have the card 10
    if(card.length === 3){ 
      return card.substr(0, 2)
    }
    return card.substr(0, 1)
  })

  return cards_values
}

//Return an array with something numbers
export function TransformLettersInNumbers(cards, bigger_a) {
  const array_of_nums = cards.map((valor) => {
    if (valor === "J") {
      return 11;
    } else if (valor === "Q") {
      return 12;
    } else if (valor === "K") {
      return 13;
    //Because the "A" can value 1 in the sequence "[A,2,3,4,5]"
    } else if (valor === "A" && bigger_a) {
      return 14;
    } else if (valor === "A"){
      return 1
    }
    else { //Caso já seja um número
      return Number(valor);
    }
  })

  return array_of_nums
}

//Return an array with all values which is repeated in the array
export function ReturnRepetitions(arr) {
  //For the values be close
  arr.sort()

  let return_the_next = false
  //If one number is equal the next number, it will be returned
  const repetitions = arr.filter((card, index) => {
    if(card === arr[index + 1]){
      return_the_next = true
      return card
    } else if (return_the_next) {
      return_the_next = false
      return card
    } else {
      return null
    }
  })

  console.log(repetitions)

  return repetitions
}

//Return an array without repetitions
export function RemoveRepetitions(values) {
  const clean_values = values.filter((value, index) => (
    values.indexOf(value) === index
  ))

  return clean_values
}