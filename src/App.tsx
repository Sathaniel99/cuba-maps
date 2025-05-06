import { useState, useRef } from 'react'
import { Button } from './components/ui/button'
import Map from '@/components/Maps'
import { IoOpenOutline } from "react-icons/io5";
import '@/App.css'

interface Province {
  name: string;
  coords: [number, number];
  url: string;
  svg?: string;
}

const PROVINCIAS: Province[] = [
  { name: 'Isla de la Juventud', coords: [21.6, -82.8], url: 'https://es.wikipedia.org/wiki/Isla_de_la_Juventud', svg: '' },
  { name: 'Pinar del Río', coords: [22.6, -83.4019], url: 'https://es.wikipedia.org/wiki/Pinar_del_R%C3%ADo', svg: ''},
  { name: 'Artemisa', coords: [22.82, -82.7548], url: 'https://es.wikipedia.org/wiki/Artemisa_(Cuba)', svg: ''},
  { name: 'La Habana', coords: [23.12, -82.3575], url: 'https://es.wikipedia.org/wiki/La_Habana', svg: ''},
  { name: 'Mayabeque', coords: [22.8387, -82], url: 'https://es.wikipedia.org/wiki/Provincia_de_Mayabeque', svg: ''},
  { name: 'Matanzas', coords: [22.5411, -81.3775], url: 'https://es.wikipedia.org/wiki/Matanzas', svg: ''},
  { name: 'Villa Clara', coords: [22.3411, -79.9775], url: 'https://es.wikipedia.org/wiki/Provincia_de_Villa_Clara', svg: '<path class="leaflet-interactive" stroke="#4169E1" stroke-opacity="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#CEE7FF" fill-opacity="0.25" fill-rule="evenodd" d="M798 379L800 376L803 378L803 375L805 373L802 369L801 361L824 360L825 354L822 349L826 339L851 324L861 269L880 271L895 276L995 330L1149 379L1150 423L1138 453L1131 461L1053 458L1042 470L1045 474L1043 479L1046 489L1051 490L1062 496L1054 502L1056 507L1055 508L1046 503L1036 503L1036 505L1034 505L1027 513L1025 523L1022 521L1018 524L1016 524L1012 520L1006 521L1001 514L997 518L987 519L986 518L988 513L982 511L981 513L979 511L976 515L977 517L973 521L979 525L976 528L981 532L982 536L980 541L978 540L977 542L973 540L973 543L970 545L971 548L969 548L973 550L972 553L974 553L971 557L964 553L963 554L963 552L961 553L959 551L957 552L954 551L955 550L952 551L948 549L949 550L947 550L945 557L939 556L939 560L938 559L932 562L927 560L927 555L929 553L924 544L919 541L919 539L921 538L921 534L919 533L916 527L919 525L918 523L920 522L919 518L916 517L921 509L921 505L916 505L911 495L908 494L907 489L909 488L905 488L904 490L899 486L896 486L896 484L893 485L892 480L889 477L893 474L895 475L895 466L892 465L894 461L892 461L894 454L893 450L890 451L892 446L890 443L883 438L880 441L878 441L879 442L877 449L871 448L868 450L868 453L864 451L865 445L861 445L862 441L858 442L855 438L848 445L840 447L840 440L837 439L835 436L836 431L833 430L833 425L836 419L834 418L835 416L830 412L831 408L837 408L835 401L831 400L831 396L828 390L821 391L816 396L803 387L802 384L800 384L800 381z" tabindex="0" style="outline: none;"></path>' },
  { name: 'Cienfuegos', coords: [22.0, -80.2], url: 'https://es.wikipedia.org/wiki/Provincia_de_Cienfuegos', svg: '' },
  { name: 'Sancti Spiritus', coords: [21.8, -79.4], url: 'https://es.wikipedia.org/wiki/Provincia_de_Sancti_Sp%C3%ADritus', svg: '' },
  { name: 'Ciego de Ávila', coords: [21.845, -78.75], url: 'https://es.wikipedia.org/wiki/Provincia_de_Ciego_de_%C3%81vila', svg: '' },
  { name: 'Camagüey', coords: [21.38, -77.899], url: 'https://es.wikipedia.org/wiki/Provincia_de_Camag%C3%BCey', svg: '' },
  { name: 'Las Tunas', coords: [20.95, -76.95], url: 'https://es.wikipedia.org/wiki/Provincia_de_Las_Tunas', svg: '' },
  { name: 'Holguín', coords: [20.88, -76.25], url: 'https://es.wikipedia.org/wiki/Provincia_de_Holgu%C3%ADn', svg: '' },
  { name: 'Granma', coords: [20.15, -76.8], url: 'https://es.wikipedia.org/wiki/Provincia_de_Granma', svg: '' },
  { name: 'Santiago de Cuba', coords: [20.15, -75.9], url: 'https://es.wikipedia.org/wiki/Provincia_de_Santiago_de_Cuba', svg: '' },
  { name: 'Guantánamo', coords: [20.15, -74.9], url: 'https://es.wikipedia.org/wiki/Provincia_de_Guant%C3%A1namo', svg: '' },
  
];

function App() {
  const [activeProvince, setActiveProvince] = useState<Province | null>(null);
  const mapRef = useRef<any>(null);

  const handleProvinceClick = (province: Province) => {
    setActiveProvince(province);
    
    // Llama a flyTo si el mapa está disponible
    if (mapRef.current) {
      mapRef.current.flyTo(province.coords, 12, { // Ajusta el zoom (10) según necesites
        duration: 1.5
      });
    }
  };
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
                onClick={() => handleProvinceClick(province)}
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
              style={{ filter: 'drop-shadow(2px 4px 6px #2c375b)'}}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Coat_of_arms_of_Cuba.svg/533px-Coat_of_arms_of_Cuba.svg.png"
              alt="Bandera de Cuba"
              />
            </div>
          </div>
          
        </aside>
        <section className='p-4 flex flex-col items-center w-full gap-1'>
          <div className='border border-slate-800 w-full max-w-[80rem] h-[25rem] rounded-sm bg-slate-800 shadow-lg shadow-slate-950'>
            <Map
              center={activeProvince?.coords}
              onResetView={() => setActiveProvince(null)}
              ref={mapRef}
              zoom={7}
              activeProvince={activeProvince}
            />
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
