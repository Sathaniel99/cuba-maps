import { useState } from 'react'
import { Button } from './components/ui/button'
import '@/App.css'

function App() {
  
  return (
    <>
      <nav className='w-full border border-slate-800 p-3 shadow text-center text-[1.7rem] bg-slate-950 text-slate-100'>Mapa de Cuba</nav>
      <main className='flex columns text-slate-100 bg-slate-950'>
        <aside className='columns-[15rem] border-e border-slate-800 p-4 text-center'>
          <div className='border-b-3 pb-2 mb-2'>
            <h2 className='text-[1.2rem]'>Provincias</h2>
          </div>
          <div className='flex flex-col gap-1'>
            <Button variant={'secondary'} className='text-slate-100'>Pinar del Río</Button>
            <Button variant={'secondary'} className='text-slate-100'>Artemisa</Button>
            <Button variant={'secondary'} className='text-slate-100'>La Habana</Button>
            <Button variant={'secondary'} className='text-slate-100'>Mayabeque</Button>
            <Button variant={'secondary'} className='text-slate-100'>Matanzas</Button>
            <Button variant={'secondary'} className='text-slate-100'>Villa Clara</Button>
            <Button variant={'secondary'} className='text-slate-100'>Cienfuegos</Button>
            <Button variant={'secondary'} className='text-slate-100'>Sancti Spiritus</Button>
            <Button variant={'secondary'} className='text-slate-100'>Ciego de Avila</Button>
            <Button variant={'secondary'} className='text-slate-100'>Camagüey</Button>
            <Button variant={'secondary'} className='text-slate-100'>Las Tunas</Button>
            <Button variant={'secondary'} className='text-slate-100'>Holguín</Button>
            <Button variant={'secondary'} className='text-slate-100'>Granma</Button>
            <Button variant={'secondary'} className='text-slate-100'>Santiago de Cuba</Button>
            <Button variant={'secondary'} className='text-slate-100'>Guantánamo</Button>
            <Button variant={'secondary'} className='text-slate-100'>Isla de la Juventud</Button>
          </div>
        </aside>
        <section className='p-4 flex flex-col items-center w-full gap-1'>
          <div className='border border-slate-800 w-full max-w-[80rem] h-[30rem] rounded-sm bg-slate-800 shadow-slate-950 shadow-lg'></div>
          <div className='border border-slate-800 w-full h-[30rem] rounded-sm shadow-slate-950 shadow-lg'>
            <div></div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
