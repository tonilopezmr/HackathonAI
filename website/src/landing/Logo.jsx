import Image from 'next/image'
import logo from '@/images/Logo.png'


export function Logo(props) {
  return (
    <Image  src={logo} alt="SmartTool" className="mx-auto h-14 w-auto" height={70} width={70} />          
  )
}
