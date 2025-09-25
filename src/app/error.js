'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div>
      <p>Lo sentimos, ocurrió un error.</p>
      <Link href="/">Volver a la página de inicio</Link>
    </div>
  );
}