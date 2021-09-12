import React from 'react'
import _ from 'lodash'

export default function JoinDemo(props) {

  let arr = ['Bono', 'Min', 'Nano', 'Max', 'Bon', 'Opp'];

  //chunk
  const seperate = _.chunk(arr, 3);

  console.log(seperate)

  let array = [
    ['001', 'Hen'],
    ['002', 'Xu'],
    ['003', 'Bin'],
  ]

  let arrPerson = [
    {id:1, namePerson: 'Tun', age: 26},
    {id:2, namePerson: 'Nano', age: 25},
    {id:3, namePerson: 'Min', age: 24},
    {id:4, namePerson: 'Bono', age: 23},
  ];

  let phantu1 = _.first(arrPerson);
  let phantu2 = _.last(arrPerson);

  // const [id, namee] = _.first(arrPerson);
  // const [id2, namee2] = _.last(arrPerson);

  //es6
  let result = arr.join('-');

  //Lodash
  let result2 = _.join(arr, '?')

  // let name = _.find(arr, item => item === 'Min')

  let person = _.find(arrPerson, item => item.id === 2)

  //chunk
  const arrString = ['a1', 'a2', 'a3', 'a4', 'a5','a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13'];
  const resultSepa = _.chunk(arrString, 3);
  console.log(resultSepa)


  //fill
  // let fillResult = _.fill(arrPerson, {id:4, namePerson: 'Bank'}, 1, 2)
  // console.log('fillResult', fillResult)
  
  //sortBy
  // let resultSort = _.sortBy(arrPerson, [item => item.namePerson])
  //sort theo id và age
  let resultSort = _.sortBy(arrPerson, ['id', 'age'])

  console.log(resultSort)

  //includes
  let resultInclude = _.includes(arr, 'Bono', )
  console.log(resultInclude)

  let resultIncludeArr = _.includes(arrPerson, 'Nano')
  console.log(resultIncludeArr)


  return (
    <div>
      {result}
      <br/>
      {result2}
      <br/>
      {/* {name} */}
      <br/>
      <div>{person.id}</div>
      <div>{person.namePerson}</div>
      <div>{phantu1.id}</div>
      <div>{phantu1.namePerson}</div>
      <div>{phantu2.id}</div>
      <div>{phantu2.namePerson}</div>
      <iv>{_.first(arrPerson).namePerson}</iv>
      {/* <div>{id} + {namee}</div> */}

    </div>
  )
}


