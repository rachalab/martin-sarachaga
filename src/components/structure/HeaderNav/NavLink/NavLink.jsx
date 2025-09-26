'use client';
import Link from 'next/link'
 
export default function NavLink  ({ href, children, ...props }) {
  return (
    <Link href={href} {...props}>
     {children}
    </Link>
  )
}