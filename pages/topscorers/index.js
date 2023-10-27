import React from 'react'
import styles from './table.module.css';
import { AiFillStar } from "react-icons/ai";

function TopScorer({data}) {
    let dataArr = [];
    for (let i in data){
        dataArr.push(data[i])
    }
    dataArr.sort((a,b)=>{
        if (a.score > b.score){
            return -1;
        }else if (a.score < b.score){
            return 1;
        }else{
            return 0;
        }
    })

    if (dataArr.length > 10){
        dataArr = dataArr.slice(0,11);
    }

    const getRows = (eachPlayer,index)=>{
        // let rowTimerId = setTimeout(()=>(
        //         <tr key={eachPlayer.id} className={`text-[16px] h-[35px] shadow-md shadow-slate-400 ${styles.tableanimation}`}>
        //             <td className='text-center '>{eachPlayer.name}</td>
        //             <td className='text-center font-semibold '>{eachPlayer.score}</td>
        //         </tr>
        //     ) ,500)

        // const myPromise = new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       resolve();
        //     }, 300);
        //   });
          
        //   myPromise
        //     .then(handleFulfilledA, handleRejectedA);
        // const functionCall = (){
        //     setTimeout(()=>{
        //         console.log('resolved')
        //     },500)
        // }

        // const asyncFunc = async()=>{
        //     const res = await functionCall(); 
        // }

        return(
            <tr key={eachPlayer.id} className={`text-[16px] h-[35px] shadow-md shadow-slate-400 ${styles.tableanimation} ${index ===0 && "bg-slate-500"} `}>
                {
                    index === 0 ? (
                        <>
                            <td className='flex items-center justify-center font-semibold text-white'>
                                <p className='mr-2'>{eachPlayer.name}</p>
                                <AiFillStar className='w-[18px] h-[18px] text-yellow-500 '/>
                            </td>
                            <td className='text-center text-white font-semibold '>{eachPlayer.score}</td>
                        </>
                    ):(
                    <>
                        <td className='text-center'>{eachPlayer.name}</td>
                        <td className='text-center font-semibold'>{eachPlayer.score}</td>
                    </>
                    )
                }
                
            </tr>
        )
    }

    return (
        <div className="bg-gradient-to-r from-white to-slate-200 flex flex-col items-center pt-[100px] h-screen">
            <h3 className='font-bold mb-10 text-[30px] text-blue-600'>Top Scoreres</h3>
            <table className='w-[40%] '>
                <thead>
                    <tr className='text-[18px] text-pink-600 border-2 border-gray-400 '>
                        <th>name</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataArr && dataArr.map((eachPlayer,index) => getRows(eachPlayer,index))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TopScorer

export const getServerSideProps = async() => {
    const res = await fetch("https://typing-app-657bf-default-rtdb.firebaseio.com/topscorers.json");
    const data = await res.json();
    return {
        props:{
            data
        }
    }
}
