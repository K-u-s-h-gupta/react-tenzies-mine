import React from 'react'
import './index.css'

export default function Die(props){

    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    let diceDots = []
    for (let i = 0; i < props.value; i++) {
        diceDots.push("•")
    }
    diceDots = diceDots.join("")

    return(
        <>
        <div className='die' style={styles}>
            <h2 className='dice-num'  onClick={props.hold}>{diceDots}</h2>
        </div>
        </>
    )
}