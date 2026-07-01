import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette } from '../common/CommandPalette';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
export function AppLayout() { const [open, setOpen] = useState(false); const navigate = useNavigate(); useKeyboardShortcuts(() => setOpen(true)); return <div className="min-h-screen bg-slate-50 text-slate-700 antialiased dark:bg-slate-950 dark:text-slate-200"><Header onCommand={() => setOpen(true)}/><main><Outlet /></main><Footer/><CommandPalette open={open} onOpenChange={setOpen} onNavigate={navigate}/></div>; }
