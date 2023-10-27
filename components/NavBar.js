import { useRouter } from "next/router"


function NavBar(props) {
    let router = useRouter();
    return (
        <>
            <nav className="flex items-center justify-between w-[100%] h-[60px] shadow-lg shadow-slate-500 bg-pink-300 px-10 lg:">
                <h4 className="text-[30px] font-extrabold cursor-pointer " onClick={()=>router.push('/')}>TypeMaster</h4>
                <div className="flex justify-between">
                    <button className={`text-[18px] font-bold text-[#4578ba] px-3 mx-3 ${router.asPath === '/' ? "text-[20px] font-extrabold": ''}`} onClick={()=>router.push('/')}>Playground</button>
                    <button className={`text-[18px] font-bold text-[#4578ba] px-3 mx-3 ${router.asPath === '/topscorers' ? "text-[20px] font-extrabold": ''}`} onClick={()=>router.push('/topscorers')}>Rank Table</button>
                </div>
            </nav>
            <div>{props.children}</div>   
        </>   
    )
}

export default NavBar
