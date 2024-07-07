import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [pass, setPass] = useState("")
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed]= useState(false)

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz"
    
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i <=length; i++) {
      const charIndex = Math.floor( Math.random()*str.length+1 )
      pass += str.charAt(charIndex)
        
    }
    setPass(pass) 
  },[setPass, length, charAllowed, numAllowed])

  // useReff hook 
  const passwordReff = useRef(null)
  const copytoclipboard = () => {
    passwordReff.current?.select() // to make the selecetd text blue 
    passwordReff.current?.setSelectionRange(0,20) // to define the range of the selected text
    window.navigator.clipboard.writeText(pass)
  }

  useEffect(()=>{
    passwordGenerator()
  },[length, setPass, charAllowed, numAllowed])


  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text"
         value={pass}
         className='outline-none w-full py-1 px-3'
         placeholder='Password'
         ref={passwordReff}
          />
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 '
        onClick={copytoclipboard}
        >Copy
        </button>
      </div>

      <div className='flex gap-x-3 text-center'>
        <div className='flex gap-x-1 '>
          <input
           type="range"
           min={6}
           max={20}
           value={length}
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length : {length}</label>
        </div>

        <div className='flex gap-x-1' >
          <input type="checkbox"
          defaultChecked={numAllowed}
          onChange={()=>{
            setnumAllowed((prev)=>(!prev))
          }}
          /><label >Numbers</label>
        </div>

        <div className='flex gap-x-1' >
          <input type="checkbox"
          defaultChecked={charAllowed}
          onChange={()=>{
            setcharAllowed((prev)=>(!prev))
          }}
          /><label >Characters</label>
        </div>

      </div>
    </div>
    
  )
}

export default App
