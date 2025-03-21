import Head from 'next/head';

export default function Privacy() {
  return (
    <>
    <Head>
      <title>Bodia AI - IA Accesible para todo el mundo</title>
    </Head>
    <div className="bg-gray-900 py-28 px-8 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-7xl">Política de Privacidad</h1>        
      </div>
    </div>
    <div className="relative overflow-hidden py-16">
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">        
      </div>
      <div className="relative px-6 lg:px-8">        
        <div className="prose prose-indigo max-w-screen-xl mx-auto mt-10 text-black">                    
          <div className="mx-auto max-w-screen-xl text-lg">          
            <p className="mt-8 leading-8 text-black">
              En <span className='font-bold'>Bodia</span>, nos comprometemos a proteger tu privacidad y mantener la seguridad de tu información personal. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos tu información en relación con nuestros servicios.
            </p>            
          </div>

          <h2 className="text-black">No recogemos ni guardamos ningún tipo de dato, excepto el de los jueces que necesitan entrar a la plaforma, todos los datos y servicios serán borrados una vez el Hackathon haya terminado.</h2>

          <h2 className="text-black">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@bodia.ai">privacy@bodia.ai</a>.
          </p>        

          <h4 className="text-gray-400">Last update: May 30, 2023</h4>
        </div>
      </div>
    </div>
    </>
  )
}
