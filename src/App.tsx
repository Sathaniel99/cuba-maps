import { useState } from 'react'
import { Button } from './components/ui/button'
import Map from '@/components/Maps'
import { IoOpenOutline } from "react-icons/io5";
import '@/App.css'

interface Province {
  name: string
  coords: [number, number]
  url: string
}

const PROVINCIAS: Province[] = [
  { name: 'Pinar del Río', coords: [22.4179, -83.6981], url: 'https://es.wikipedia.org/wiki/Pinar_del_R%C3%ADo' },
  { name: 'Artemisa', coords: [22.8136, -82.7633], url: 'https://es.wikipedia.org/wiki/Artemisa_(Cuba)'},
  { name: 'La Habana', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/La_Habana'},
  { name: 'Mayabeque', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Mayabeque'},
  { name: 'Matanzas', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Matanzas' },
  { name: 'Villa Clara', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Villa_Clara' },
  { name: 'Cienfuegos', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Cienfuegos' },
  { name: 'Sancti Spiritus', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Sancti_Sp%C3%ADritus' },
  { name: 'Ciego de Ávila', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Ciego_de_%C3%81vila' },
  { name: 'Camagüey', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Camag%C3%BCey' },
  { name: 'Las Tunas', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Las_Tunas' },
  { name: 'Holguín', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Holgu%C3%ADn' },
  { name: 'Granma', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Granma' },
  { name: 'Santiago de Cuba', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Santiago_de_Cuba' },
  { name: 'Guantánamo', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Guant%C3%A1namo' },
  { name: 'Isla de la Juventud', coords: [23.0411, -81.5775], url: 'https://es.wikipedia.org/wiki/Isla_de_la_Juventud' },
];

function App() {
  const [activeProvince, setActiveProvince] = useState<Province | null>(null);


  //console.log(PROVINCIAS.find(provincia => provincia.name === 'Artemisa')?.url);

  return (
    <>
      <nav className='w-full border border-slate-800 p-3 text-center text-[1.7rem] text-slate-100 bg-slate-800/20'>
        Mapa de Cuba
      </nav>
      <main className='flex columns text-slate-100'>
        <aside className='w-[15rem] border-e border-slate-800 p-4 text-center flex flex-col items-stretch relative bg-slate-800/20 shadow-lg shadow-slate-950'>
          
          <div className='border-b-3 pb-2 mb-2'>
            <h2 className='text-[1.2rem]'>Provincias</h2>
          </div>
          <div className='flex flex-col gap-1'>
            {PROVINCIAS.map((province) => (
              <Button 
                key={province.name} 
                variant={'secondary'} 
                className='dark' 
                onClick={() => setActiveProvince(province)}
              >
                {province.name}
              </Button>
            ))}
          </div>

          <div className='mt-auto pt-4 sticky bottom-0'>
            <div className='p-3 flex flex-col items-center gap-2'>
              <h2 className='text-sm font-medium'>República de Cuba</h2>
              <img
              className='w-16 h-auto mb-3'
              src="https://media.istockphoto.com/id/516927998/es/foto/acercamiento-de-cuba-de-la-bandera.jpg?s=612x612&w=0&k=20&c=fF7YrXKxzdStP5KbOA7vVBALEkpPMFjWrY35F0ZOGmU="
              alt="Bandera de Cuba"
              />
            </div>
          </div>
          
        </aside>
        <section className='p-4 flex flex-col items-center w-full gap-1'>
          <div className='border border-slate-800 w-full max-w-[80rem] h-[30rem] rounded-sm bg-slate-800 shadow-lg shadow-slate-950'>
            <Map center={activeProvince?.coords} onResetView={() => setActiveProvince(null)}  />
          </div>
          <div className='border border-slate-800 w-full max-w-[80rem] h-[30rem] rounded-sm shadow-slate-950 shadow-lg relative bg-slate-950'>
            {activeProvince ? (
              <div className='p-4 relative min-h-[30rem]'>
                <Button
                  variant="outline"
                  className="dark flex items-center gap-2 absolute top-0 start-0 ms-3 mt-2 bg-slate-950 hover:bg-slate-800"
                  onClick={() => window.open(activeProvince.url, '_blank', 'noopener,noreferrer')}
                >
                  Ver en Wikipedia <IoOpenOutline className="h-4 w-4" />
                </Button>

                <div className='w-full text-center border-b-2 border-border pb-4 mb-4'>
                  <h3 className='text-xl font-semibold'>{activeProvince.name}</h3>
                </div>

                <div className="text-center text-muted-foreground">
                  Información detallada sobre {activeProvince.name}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground relative overflow-hidden pointer-none:">
                <img className='object-cover h-full w-full absolute opacity-5' src="https://media.istockphoto.com/id/516927998/es/foto/acercamiento-de-cuba-de-la-bandera.jpg?s=612x612&w=0&k=20&c=fF7YrXKxzdStP5KbOA7vVBALEkpPMFjWrY35F0ZOGmU=" alt="" />
                <div className='border-dashed border-neutral-400 border-2 p-15'>
                  <h2 className='text-4xl z-20 text-neutral-400'>Selecciona una provincia</h2>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
