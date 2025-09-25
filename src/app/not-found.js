import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, no pudimos encontrar el recurso que estás buscando.</p>
      <Link href="/">Volver al inicio</Link>
    </div>
  );
}