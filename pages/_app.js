import '@/styles/globals.css'
import NavBar from '../components/NavBar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className='hidden sm:hidden md:hidden lg:flex lg:flex-col'>
        <NavBar><Component {...pageProps} /></NavBar>
      </div>
      <div className='h-screen flex justify-center items-center lg:hidden'>
        <h2 className='text-slate-500 '>This side isn't accessible in this device</h2>
      </div>
    </>
  )
}
