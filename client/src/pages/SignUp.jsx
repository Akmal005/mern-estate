import Link from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> Sign up</h1>
    <form className='flex flex-col gap-4'>
      <input type="text" 
      placeholder='username...' 
      className='border p-3 rounded-l'
      id='username'></input>
       <input type="text" 
      placeholder=" email..." 
      className='border p-3 rounded-l'
      id='email'></input>
       <input type="text" 
      placeholder='password...' 
      className='border p-3 rounded-l'
      id='password'></input>
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
    </form>
    <div></div>
    </div>
  )
}
