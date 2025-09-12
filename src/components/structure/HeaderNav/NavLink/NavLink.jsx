'use client';
 
/*
 
NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.
 
*/
import Link from 'next/link'


import { usePathname } from 'next/navigation'

 
export default function NavLink  ({ href, activeClassName, children, ...props }) {
  const pathname = usePathname()
  const isActive =  pathname.startsWith(href);

  if (isActive) {
    props.className += " "+activeClassName
  }
 
  return (
    <Link href={href} {...props}>
     {children}
    </Link>
  )
}