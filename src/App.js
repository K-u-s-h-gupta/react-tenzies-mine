import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Die from "./Die";
import Confetti from 'react-confetti'
function App() {
  const [dice , setDice] = useState(allNewDice())
  const [tenzies , setTenzies] = useState(false)
  const [step , setStep] = useState(0)
  const [bestStep , setBestStep] = useState(localStorage.getItem("step")||0)
  const [seconds,setSeconds] = useState(55)
 
  


  function getNewDice(){
    return{
      value: Math.ceil(Math.random()*6) ,
       id:nanoid() ,
        isHeld:false}
    
  }
  

  useEffect(() => {
    let timerId

    if (!tenzies) {
        timerId = setInterval(() => {
          if(seconds===59){
            return ()=> clearInterval(timerId)
          }
          else{

          }
        
            setSeconds(prevSec=> prevSec+1)
          

        }, 1000)
    }

    return () => clearInterval(timerId)

}, [tenzies])

  useEffect(()=>{

    const allHeld = dice.every(die=> die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die=> die.value===firstValue)
    
    if(allHeld && sameValue)
    {
      console.log("you won!")
      setTenzies(true)
      
    }
   
  }, [dice])
    
 

  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      newDice.push(getNewDice())

    }
    return newDice
  }
  

  function rollDice(){
   
    if(!tenzies){
    setStep(step+1)
      localStorage.setItem("step" , step)
      setDice(oldDice=> oldDice.map(die=>{
        return die.isHeld? die: getNewDice()
        
        
      })) 
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
      setStep(0)
      setSeconds(0)
    }
   
  }

  function holdDice(id){
   setDice(oldDice=> oldDice.map(die=>{
     return die.id===id? {...die, isHeld:!die.isHeld}: die

   }
   ))
  }

 const displayDice= dice.map((die)=>{
   return <Die dice={die.value} key={die.id} isHeld={die.isHeld} hold={()=>holdDice(die.id)} value={die.value}/>
  })
  return (
   <main className="main">
     {tenzies&&<Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions" style={{lineHeight:"0"}}>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <h2 style={{lineHeight:"0"}}>Count: {step}</h2>
            <p style={{lineHeight:"0"}}>Last Steps Count: {bestStep}</p>
            <p style={{lineHeight:"0"}}>Time: {seconds}sec</p>
          
            <div className="dice-container">

              
  
         {displayDice}

            </div>

     <button className="roll-btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
   </main>
  );
}

export default App;
