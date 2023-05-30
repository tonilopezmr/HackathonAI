import Head from 'next/head'

import { Button } from '@/landing/Button'
import { Logo } from '@/landing/Logo'

import { MyLink } from '@/board/MyLink'
import { TextField } from '@/landing/Fields'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const useSession = () => {    
  const [token, setToken] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [id, setId] = useState(undefined);

  useEffect(() => {

    if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const id = localStorage.getItem("id");
        
        setToken(token)
        setEmail(email)
        setId(id)
      }
  }, [setToken, setEmail, setId]);  

  return {token, email, id}
}

export default function Login() {
 /* const { data: session, status } = useSession() 
 
  if(session || status === "loading") {    
    return (<div></div>)
  }*/
  const router = useRouter()

  const onLogin = (event) => {
    event.preventDefault();    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
      method: "POST",    
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "identifier": event.target.email.value,
        "password": event.target.password.value
      })
    })
    .then((res) => res.json())
    .then((data) => {      
      console.log(data)
      if(data){
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("id", data.user.id);
        router.push('/dashboard')
      }      
    })
  }

  return (
    <>
    <Head>
        <title>Acceso - Bodia AI</title>
    </Head>
    <div className="bg-gray-900 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">      
      <Logo logo="true" color="#fff" className="mx-auto h-12 w-auto" />      
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Entra en tu cuenta</h2>  
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-neutral-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={onLogin}>          
          <div>       
            <TextField
              className="text-white mb-5 col-span-full"
              label="Correo electronico"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              className="text-white mb-10 col-span-full"
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <Button color="blue" type="submit" className="flex w-full justify-center text-black over:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2">              
              Entrar
            </Button>
          </div>
        </form>       
        <p className="mt-3 text-center text-xs text-gray-300">Cuando inicias sesión, estás deacuerdo con nuestra <MyLink className="underline" href="/privacy">pólitica de privacidad</MyLink>.</p> 
      </div>
    </div>
  </div>
</>
  )
}