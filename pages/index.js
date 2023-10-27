import { useEffect,  useState } from "react"
import styles from './home.module.css';
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';

let totalScore = 0;

function Home() {
  const [buttonClicked, setButtonClick] = useState(true);
  const [text,setText] = useState('')
  const [textAreaContent, setContent] = useState('');
  const [seconds,setSeconds] = useState(0);
  const [gameStarted,setGameStarted] = useState(false);
  const [playerName,setPlayerName] = useState('');
  const [result,setResult] = useState('');
  const [loading, setLoading] = useState(false)
  let router = useRouter()
  
  useEffect(()=>{
    if (buttonClicked){
        console.log('useEffect Trigered',buttonClicked)
        const TextCreator = async()=>{
          const response = await fetch('https://apis.ccbp.in/random-quote');
          const data = await response.json();
          setText(data.content);
          setButtonClick(false);
        } 
        TextCreator()
    }
  },[buttonClicked])

  useEffect(()=>{
    if (gameStarted){
      console.log('timer started')
      let timerId = setInterval(()=>{
          setSeconds(seconds-1)
      },1000)
      if (seconds === 0){
        console.log("clearInterval Trigered")
        clearInterval(timerId);
        setResult(totalScore);
      }
      return ()=> clearInterval(timerId);
  }
  },[seconds])

  const showText = (e)=>{
    const contentArr = textAreaContent.split('')
    console.log(contentArr)
    let wordCount= 0
    contentArr.forEach((element,index) => {
      if (element === text[index] && element !== ' '){
        wordCount += 1
      }
    });
    console.log(wordCount);
    totalScore += wordCount;
    console.log(totalScore);
    setButtonClick(true);
    setContent('')
  }

  const startingTheGame = ()=>{
    setGameStarted(true);
    setSeconds(60); // setting the initial timer
  }

  const navigatingToTopScorerPage = async()=>{
    setLoading(true)
      let todoItems = {
        id: uuidv4(),
        name: playerName,
        score: result
      }
      let options = {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(todoItems)
      }            
      const response = await fetch("https://typing-app-657bf-default-rtdb.firebaseio.com/topscorers.json",options);
      if (response.ok){
        const data = await response.json();
        console.log('sending post data to state==> ',data);
        router.push('/topscorers');
      }
    }
  
  const getPlayGround = ()=>{
      return gameStarted?(
        <div className="bg-[#c6f7b5] flex items-center justify-center h-screen">
        <div className="flex flex-col items-center w-[70%]">
          <p className="text-[25px] font-bold text-blue-700">Hi, {playerName}</p>
          <p className={`text-[30px] font-bold my-10 ${seconds<=10 ? "animate-ping text-red-700 opacity-15" : "text-black   "}`}>{seconds}</p>
           <p className="text-[20px] font-semibold mb-10">{buttonClicked?"Loading...":text}</p>
           <textarea rows="5" cols="50"  className="rounded-sm text-[20px] p-5 overflow-auto border-4 shadow-md font-mono lg:flex xl:hidden 2xl:hidden" autoFocus value={textAreaContent} onChange={(e)=>setContent(e.target.value)} placeholder="Your Type goes here..."></textarea>
           <textarea rows="5" cols="70"  className="hidden rounded-sm text-[20px] p-5 overflow-auto border-4 shadow-md font-mono xl:flex 2xl:hidden" autoFocus value={textAreaContent} onChange={(e)=>setContent(e.target.value)} placeholder="Your Type goes here..."></textarea>
           <textarea rows="5" cols="100"  className="hidden rounded-sm text-[20px] p-5 overflow-auto border-4 shadow-md font-mono 2xl:flex" autoFocus value={textAreaContent} onChange={(e)=>setContent(e.target.value)} placeholder="Your Type goes here..."></textarea>
           <div className="w-[100%] flex justify-end">
            <button className="bg-[#4578ba] rounded-sm text-[17px] text-white font-bold float-right my-8 w-[100px] h-[30px]" onClick={showText}>Next</button>
           </div>
        </div>
      </div>
      ):(
        <div className="bg-gradient-to-r from-white to-green-400  flex items-center justify-center h-screen">
          <img src="https://upload.wikimedia.org/wikipedia/en/3/3f/Woody_Woodpecker.png" className={`h-[400px] w-[300px] mr-10  ${styles.toyanimation} `}/>
          <div className={`flex flex-col items-center justify-center w-[40%] h-[400px] border-2 border-slate-500 rounded-lg  ${styles.linearanimation} `}>
            <h4 className="text-[30px] font-extrabold animate-bounce">TypeMaster</h4>
            <input className="border-2 border-sky-700 h-[35px] pl-6 text-[20px] font-mono my-10 rounded-full shadow-2xl shadow-green-950 lg:w-[300px] xl:w-[400px] 2xl:w-[500px]" placeholder="your name..." value={playerName} onChange={(e)=>setPlayerName(e.target.value)}/>
            <button className="bg-pink-400 rounded-lg text-[17px] text-white font-bold float-right my-8 px-10 h-[30px]" onClick={startingTheGame}>Get Started</button>
          </div>
        </div>
      )
    }
  
    const showResult = ()=>(
      
      <div className="bg-[#c6f7b5] flex items-center justify-center h-screen">
        {
        loading?(
          <h4 className="text-[20px] font-bold ">Loading...</h4>
        ):(
          <div className={`flex flex-col items-center justify-center w-[20%] h-[30%] shadow-lg  rounded-2xl bg-pink-400 ${styles.linearanimation}`}>
            <h3 className=" font-bold text-blue-600 lg:text-[18px] xl:text-[22px] 2xl:text-[24px]">Your score is: {result}</h3>
            <button className="bg-black rounded-lg text-[17px] text-white font-bold float-right mt-5 h-[30px] lg:w-[100px] lg:text-[10px] lg:h-[25px] xl:w-[130px] xl:text-[12px] xl:h-[27px] 2xl:w-[150px] 2xl:text-[14px] 2xl:h-[30px]" onClick={navigatingToTopScorerPage}>Go to rank board </button>
          </div>
        )
      }
      </div>
    )

  return (
    <>
    {
      (result === '' )? getPlayGround(): showResult()
    }
    </>
  )
}

export default Home
