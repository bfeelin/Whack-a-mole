import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Tile = {
  id: number;
  active: boolean;
};

function App() {
  const NO_TILES:number = 9
  const initialData:Array<boolean> = []
  
  for(let i = 0; i < NO_TILES; i++){
    initialData.push(false)
  }
  return (
    <WhackAMole initialData={initialData}/>
  )
}

function WhackAMole({initialData}: {initialData:Array<boolean>}){
  const [score, setScore] = useState<number>(0)
  const [tiles, setTiles] = useState<Array<boolean>>(initialData)
  const [delay, setDelay] = useState<number>(1000)

  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      let randomTile = getRandomWholeNumber(0, 8);
      let newTiles = tiles?.map((tile, i) => (
          randomTile === i ? true : false
      ))
      setTiles(newTiles)
    }, delay)
  
    return () => clearInterval(intervalId); //This is important
  }, [])

  function getRandomWholeNumber(min:number, max:number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // Increment score and set the clicked tile back to inactive
  function handleIncrementScore(tileID:number){
    let newTiles = [...tiles]
    newTiles[tileID] = false
    setTiles(newTiles)
    setScore(score + 1)
  }
  return (
    <>
      <p>Score: {score}</p>
      <div className='grid-wrapper'>
        {tiles?.map((tile, i) => (
          <Tile 
            key={i} 
            id={i} 
            active={tile} 
            handleIncrementScore={handleIncrementScore}/>
        ))}
      </div>
    </>
  )
}

function Tile({ id, active, handleIncrementScore }: { id: number, active: boolean, handleIncrementScore: Function }){
  return(
    <div 
      onClick={active ? () => handleIncrementScore(id) : () => {}}  
      className={active ? 'mole tile' : 'hole tile'}>
    </div>
  )
}

export default App
