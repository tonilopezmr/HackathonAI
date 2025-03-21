import Link from 'next/link'

export function MyLink({ className, href, children }) {
  return (
    <Link
      href={href}    
      className={className}      
    >
      {children}
    </Link>
  )
}
