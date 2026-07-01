import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
export function NotFoundPage() { return <section className="section"><div className="container-page text-center"><h1 className="text-6xl font-black text-ink dark:text-white">404</h1><p className="mt-4 text-slate-500">This page does not exist.</p><Link to="/"><Button className="mt-6">Return home</Button></Link></div></section>; }
