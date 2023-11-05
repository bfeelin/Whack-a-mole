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
  const initialData:Array<Tile> = []
  
  for(let i = 0; i < NO_TILES; i++){
    initialData.push({id: i, active: false})
  }
  return (
    <WhackAMole initialData={initialData}/>
  )
}

function WhackAMole({initialData}: {initialData:Array<Tile>}){
  const [score, setScore] = useState<number>(0)
  const [tiles, setTiles] = useState<Array<Tile>>(initialData)
  const [delay, setDelay] = useState<number>(1000)

  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      let randomTile = getRandomArbitrary(0, 8);
      console.log(randomTile)
      let newTiles = tiles?.map((tile) => ({
          id: tile.id,
          active: randomTile === tile.id ? true : false
        }
      ))
      setTiles(newTiles)
    }, delay)
  
    return () => clearInterval(intervalId); //This is important
   
  }, [])

  function getRandomArbitrary(min:number, max:number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // Increment score and set the clicked tile back to inactive
  function handleIncrementScore(tileID:number){
    let newTiles = [...tiles]
    newTiles[tileID] = {...newTiles[tileID], active: false}
    setTiles(newTiles)
    let s = score + 1
    setScore(s)
  }
  return (
    <>
      <p>Score: {score}</p>
      <div className='grid-wrapper'>
        {tiles?.map((tile) => (
          <Tile id={tile.id} active={tile.active} handleIncrementScore={handleIncrementScore}/>
        ))}
      </div>
    </>
  )
}

function Tile({ id, active, handleIncrementScore }: { id: number, active: boolean, handleIncrementScore: Function }){
  return(
    <div onClick={active ? () => handleIncrementScore(id) : () => {}} key={id} className={active ? 'mole tile' : 'hole tile'}>
    </div>
  )
}

export default App
