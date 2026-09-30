'use client';

import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { TerminalIntro } from '@/components/terminal-intro';
import { workItems } from '@/components/work-items';

type AppId = 'terminal' | 'about' | 'services' | 'portfolio' | 'contact' | 'calculator' | 'weather' | 'notes' | 'snake' | 'game2048' | 'secret';

type WindowState = {
  id: string;
  app: AppId;
  title: string;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  booting: boolean;
  bootText: string;
  bootIndex: number;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function appTitle(app: AppId) {
  switch (app) {
    case 'terminal':
      return 'Terminal';
    case 'about':
      return 'About Pixaloom';
    case 'services':
      return 'Services';
    case 'portfolio':
      return 'Portfolio';
    case 'contact':
      return 'Contact Us';
    case 'calculator':
      return 'Calculator';
    case 'weather':
      return 'Weather';
    case 'notes':
      return 'Notes';
    case 'snake':
      return 'Snake Game';
    case 'game2048':
      return '2048';
    case 'secret':
      return 'Secret';
  }
}

function bootScript(app: AppId) {
  const name = appTitle(app);
  return [
    `[ OK ] Launching ${name}...`,
    `[ OK ] Initializing UI...`,
    `[ OK ] Mounting modules...`,
    `[ OK ] Rendering window...`,
    `[ OK ] Ready.`,
  ].join('\n');
}

function AboutApp() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            🚀
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Pixaloom</h1>
            <p className="text-purple-200">Web Design & Development Studio</p>
          </div>
        </div>
        
        <div className="mb-6 rounded-xl bg-white/10 p-4">
          <h2 className="mb-2 font-semibold text-white">Who We Are</h2>
          <p className="text-sm leading-relaxed text-purple-100">
            Pixaloom is a web design and development studio focused on shipping websites that convert. 
            We combine conversion-first UX, clean engineering, and performance that feels instant.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-xs text-purple-200">Projects Delivered</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-xs text-purple-200">Client Satisfaction</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 font-semibold text-white">What We Care About</h2>
          <div className="space-y-2">
            {[
              { icon: '🎯', text: 'Conversion-first UX and clear messaging' },
              { icon: '⚡', text: 'Performance + SEO (Core Web Vitals)' },
              { icon: '🛠️', text: 'Clean engineering, fast iterations' },
              { icon: '🎨', text: 'Modern, beautiful design' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-purple-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-medium text-white">George, Western Cape</div>
              <div className="text-sm text-purple-200">South Africa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesApp() {
  const services = [
    {
      icon: '🌐',
      title: 'Landing Pages',
      desc: 'High-converting landing pages with compelling copy, strategic layouts, and clear CTAs',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '🏢',
      title: 'Business Websites',
      desc: 'Fast, modern, SEO-ready websites that represent your brand professionally',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: '📊',
      title: 'Web Applications',
      desc: 'Dashboards, portals, and admin panels with seamless integrations',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      desc: 'Ongoing updates, performance tuning, and technical support',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="h-full overflow-auto bg-slate-900">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
        <h1 className="text-2xl font-bold text-white">Our Services</h1>
        <p className="text-cyan-100">What Pixaloom builds for you</p>
      </div>
      
      <div className="p-4 space-y-4">
        {services.map((s, i) => (
          <div key={i} className="rounded-xl bg-slate-800 p-4 border border-slate-700">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-2xl`}>
                {s.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-4">
          <h3 className="font-semibold text-cyan-100 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'].map((t) => (
              <span key={t} className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useState<typeof workItems[0] | null>(null);

  if (selectedProject) {
    return (
      <div className="h-full overflow-auto bg-neutral-900">
        <div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 p-4 flex items-center gap-3">
          <button 
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
          >
            <span>←</span> Back
          </button>
          <h1 className="font-semibold text-white">{selectedProject.name}</h1>
        </div>
        <div className="p-4">
          {selectedProject.png && (
            <div className="rounded-xl overflow-hidden mb-4">
              <Image
                src={selectedProject.png}
                alt={selectedProject.name}
                width={1200}
                height={675}
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <p className="text-neutral-400 mb-4">{selectedProject.meta}</p>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">Scope</h3>
            <p className="text-neutral-400 text-sm">{selectedProject.scope}</p>
          </div>
          {selectedProject.highlights && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-neutral-300 mb-2">Highlights</h3>
              <ul className="space-y-1">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="text-neutral-400 text-sm flex gap-2">
                    <span className="text-amber-500">•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedProject.stack.map((t) => (
              <span key={t} className="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs text-amber-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-neutral-900">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-amber-100">Our recent work - Click to view details</p>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-3">
        {workItems.map((project) => (
          <button
            key={project.slug}
            onClick={() => setSelectedProject(project)}
            className="group rounded-xl bg-neutral-800 overflow-hidden border border-neutral-700 hover:border-amber-500/50 transition-all text-left"
          >
            {project.png && (
              <div className="h-24 overflow-hidden">
                <Image
                  src={project.png}
                  alt={project.name}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
            )}
            <div className="p-3">
              <h3 className="font-semibold text-white text-sm truncate">{project.name}</h3>
              <p className="text-[10px] text-neutral-400 truncate">{project.meta}</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400">
                <span>View details</span>
                <span>→</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Contact Us</h1>
          <p className="text-slate-400 text-sm">We&apos;d love to hear from you</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <a href="mailto:info@pixaloom.co.za" className="flex flex-col items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 p-4 hover:border-cyan-500/50 transition group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl shadow-lg">
              ✉️
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white transition">Email</span>
          </a>
          <a href="https://wa.me/27662995533" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 p-4 hover:border-cyan-500/50 transition group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl shadow-lg">
              💬
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white transition">WhatsApp</span>
          </a>
        </div>

        <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-5">
          <h2 className="mb-4 font-semibold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
            Send a Message
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition"
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition"
            />
            <textarea
              placeholder="How can we help?"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition resize-none"
            />
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-medium text-white hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 shadow-lg shadow-cyan-500/20"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          George, Western Cape • info@pixaloom.co.za
        </div>
      </div>
    </div>
  );
}

function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [history, setHistory] = useState('');

  const handleNum = (n: string) => {
    setDisplay((d) => (d === '0' ? n : d + n));
  };

  const handleOp = (o: string) => {
    setPrev(parseFloat(display));
    setOp(o);
    setHistory(`${display} ${o}`);
    setDisplay('0');
  };

  const calculate = () => {
    if (prev === null || !op) return;
    const curr = parseFloat(display);
    let result = 0;
    switch (op) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '×': result = prev * curr; break;
      case '÷': result = curr !== 0 ? prev / curr : 0; break;
    }
    setHistory(`${prev} ${op} ${curr} =`);
    setDisplay(String(Math.round(result * 1000000) / 1000000));
    setPrev(null);
    setOp(null);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setHistory('');
  };

  const buttons = [
    { label: 'C', action: clear, style: 'bg-red-500/80 hover:bg-red-500 text-white' },
    { label: '±', action: () => setDisplay((d) => String(-parseFloat(d))), style: 'bg-neutral-600 hover:bg-neutral-500 text-white' },
    { label: '%', action: () => setDisplay((d) => String(parseFloat(d) / 100)), style: 'bg-neutral-600 hover:bg-neutral-500 text-white' },
    { label: '÷', action: () => handleOp('÷'), style: 'bg-amber-500 hover:bg-amber-400 text-white' },
    { label: '7', action: () => handleNum('7'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '8', action: () => handleNum('8'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '9', action: () => handleNum('9'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '×', action: () => handleOp('×'), style: 'bg-amber-500 hover:bg-amber-400 text-white' },
    { label: '4', action: () => handleNum('4'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '5', action: () => handleNum('5'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '6', action: () => handleNum('6'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '-', action: () => handleOp('-'), style: 'bg-amber-500 hover:bg-amber-400 text-white' },
    { label: '1', action: () => handleNum('1'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '2', action: () => handleNum('2'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '3', action: () => handleNum('3'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '+', action: () => handleOp('+'), style: 'bg-amber-500 hover:bg-amber-400 text-white' },
    { label: '0', action: () => handleNum('0'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white col-span-2' },
    { label: '.', action: () => handleNum('.'), style: 'bg-neutral-700 hover:bg-neutral-600 text-white' },
    { label: '=', action: calculate, style: 'bg-green-500 hover:bg-green-400 text-white' },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-neutral-900 to-neutral-800 flex flex-col">
      <div className="flex-1 flex flex-col justify-end p-4">
        <div className="text-right text-neutral-500 text-sm h-6 truncate">{history}</div>
        <div className="text-right font-light text-5xl text-white truncate">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-1 p-3 bg-neutral-900/50">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={b.action}
            className={`${b.style} rounded-xl p-4 text-xl font-medium transition-all active:scale-95 ${b.label === '0' ? 'col-span-2' : ''}`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function WeatherApp() {
  const [weatherData, setWeatherData] = useState<{ temp: number | null; city: string; wind: number | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => r.json())
      .then((d) => {
        const result = d as { ok?: boolean; temperatureC?: number; city?: string; windKmh?: number };
        if (result.ok && typeof result.temperatureC === 'number' && typeof result.city === 'string' && typeof result.windKmh === 'number') {
          setWeatherData({ temp: result.temperatureC, city: result.city, wind: result.windKmh });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;
  const bgClass = isNight 
    ? 'from-indigo-900 via-purple-900 to-slate-900' 
    : 'from-sky-400 via-blue-500 to-indigo-500';

  return (
    <div className={`h-full bg-gradient-to-br ${bgClass} p-6 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-pulse" style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {loading ? (
          <div className="text-white/60 animate-pulse">Loading weather...</div>
        ) : (
          <>
            <div className="text-8xl mb-4 drop-shadow-lg">{isNight ? '🌙' : '☀️'}</div>
            <h2 className="text-2xl font-medium text-white/90 mb-1">{weatherData?.city || 'George, WC'}</h2>
            <div className="text-8xl font-extralight text-white mb-6 tracking-tighter">
              {weatherData?.temp != null ? `${Math.round(weatherData.temp)}°` : '--°'}
            </div>
            <div className="flex gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <span>💨</span>
                <span>{weatherData?.wind != null ? `${Math.round(weatherData.wind)} km/h` : '--'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💧</span>
                <span>62%</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function NotesApp({ onSaveToDesktop }: { onSaveToDesktop?: (name: string, content: string) => void }) {
  const [notes, setNotes] = useState<{ id: string; name: string; content: string }[]>([
    { id: '1', name: 'Welcome', content: 'Welcome to Notes!\n\nStart typing here...' }
  ]);
  const [activeNote, setActiveNote] = useState('1');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveName, setSaveName] = useState('');

  const currentNote = notes.find(n => n.id === activeNote);

  const updateNote = (content: string) => {
    setNotes(notes.map(n => n.id === activeNote ? { ...n, content } : n));
  };

  const addNote = () => {
    const id = Math.random().toString(36).slice(2);
    setNotes([...notes, { id, name: `Note ${notes.length + 1}`, content: '' }]);
    setActiveNote(id);
  };

  const deleteNote = (id: string) => {
    if (notes.length === 1) return;
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    if (activeNote === id) setActiveNote(newNotes[0].id);
  };

  const saveToDesktop = () => {
    if (saveName.trim() && currentNote) {
      onSaveToDesktop?.(saveName.trim(), currentNote.content);
      setShowSaveModal(false);
      setSaveName('');
    }
  };

  return (
    <div className="h-full flex bg-stone-100">
      <div className="w-48 bg-stone-200 border-r border-stone-300 flex flex-col">
        <div className="p-2 border-b border-stone-300 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-600">Notes</span>
          <button onClick={addNote} className="text-stone-500 hover:text-stone-700 text-lg leading-none">+</button>
        </div>
        <div className="flex-1 overflow-auto">
          {notes.map(n => (
            <div
              key={n.id}
              onClick={() => setActiveNote(n.id)}
              className={`p-2 cursor-pointer border-b border-stone-300 ${activeNote === n.id ? 'bg-amber-200' : 'hover:bg-stone-300'}`}
            >
              <div className="text-sm font-medium text-stone-800 truncate">{n.name}</div>
              <div className="text-xs text-stone-500 truncate">{n.content.slice(0, 30) || 'Empty note'}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-amber-100 border-b border-amber-200 p-2 flex items-center justify-between">
          <input
            value={currentNote?.name || ''}
            onChange={(e) => setNotes(notes.map(n => n.id === activeNote ? { ...n, name: e.target.value } : n))}
            className="bg-transparent font-semibold text-amber-800 outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-3 py-1 bg-amber-500 text-white text-xs rounded hover:bg-amber-600 transition"
            >
              Save to Desktop
            </button>
            <button
              onClick={() => deleteNote(activeNote)}
              className="px-2 py-1 bg-red-400 text-white text-xs rounded hover:bg-red-500 transition"
            >
              🗑️
            </button>
          </div>
        </div>
        <textarea
          value={currentNote?.content || ''}
          onChange={(e) => updateNote(e.target.value)}
          className="flex-1 w-full resize-none bg-amber-50 p-4 text-stone-800 outline-none"
          style={{ lineHeight: '1.8' }}
          placeholder="Start typing..."
        />
      </div>
      {showSaveModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-2xl">
            <h3 className="font-bold text-lg mb-4">Save Note to Desktop</h3>
            <input
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter file name..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 outline-none focus:border-amber-500"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowSaveModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={saveToDesktop} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SnakeApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const gameRef = useRef<{ snake: { x: number; y: number }[]; food: { x: number; y: number }; dx: number; dy: number; running: boolean } | null>(null);

  const startGame = () => {
    setScore(0);
    setGameState('playing');
    gameRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      dx: 1,
      dy: 0,
      running: true,
    };
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = 20;
    canvas.width = gridSize * tileCount;
    canvas.height = gridSize * tileCount;

    const handleKey = (e: KeyboardEvent) => {
      if (!gameRef.current) return;
      const { dx, dy } = gameRef.current;
      if (e.key === 'ArrowUp' && dy !== 1) { gameRef.current.dx = 0; gameRef.current.dy = -1; }
      if (e.key === 'ArrowDown' && dy !== -1) { gameRef.current.dx = 0; gameRef.current.dy = 1; }
      if (e.key === 'ArrowLeft' && dx !== 1) { gameRef.current.dx = -1; gameRef.current.dy = 0; }
      if (e.key === 'ArrowRight' && dx !== -1) { gameRef.current.dx = 1; gameRef.current.dy = 0; }
    };
    window.addEventListener('keydown', handleKey);

    const gameLoop = setInterval(() => {
      if (!gameRef.current?.running) return;
      const { snake, food, dx, dy } = gameRef.current;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
          snake.some((s) => s.x === head.x && s.y === head.y)) {
        gameRef.current.running = false;
        setHighScore(h => Math.max(h, score));
        setGameState('gameover');
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        gameRef.current.food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
      } else {
        snake.pop();
      }

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#1e293b';
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw snake with gradient
      snake.forEach((s, i) => {
        const alpha = 1 - (i / snake.length) * 0.5;
        ctx.fillStyle = i === 0 ? '#22c55e' : `rgba(74, 222, 128, ${alpha})`;
        ctx.beginPath();
        ctx.roundRect(s.x * gridSize + 1, s.y * gridSize + 1, gridSize - 2, gridSize - 2, 4);
        ctx.fill();
      });

      // Draw food with glow
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(gameRef.current.food.x * gridSize + gridSize / 2, gameRef.current.food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }, 150);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKey);
    };
  }, [gameState, score]);

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      {gameState === 'menu' && (
        <div className="text-center">
          <div className="text-6xl mb-4">🐍</div>
          <h1 className="text-3xl font-bold text-white mb-2">Snake</h1>
          <p className="text-slate-400 mb-6">Use arrow keys to move</p>
          <button
            onClick={startGame}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Game
          </button>
          {highScore > 0 && <p className="text-slate-500 mt-4">High Score: {highScore}</p>}
        </div>
      )}
      {gameState === 'playing' && (
        <>
          <div className="text-white mb-3 text-xl font-bold">Score: {score}</div>
          <canvas ref={canvasRef} className="rounded-xl shadow-2xl" />
        </>
      )}
      {gameState === 'gameover' && (
        <div className="text-center">
          <div className="text-6xl mb-4">💀</div>
          <h1 className="text-3xl font-bold text-red-400 mb-2">Game Over!</h1>
          <p className="text-2xl text-white mb-2">Score: {score}</p>
          {score >= highScore && score > 0 && <p className="text-yellow-400 mb-4">🎉 New High Score!</p>}
          <button
            onClick={startGame}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

function Game2048App() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won' | 'lost'>('menu');
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [newTiles, setNewTiles] = useState<Set<string>>(new Set());
  const [mergedTiles, setMergedTiles] = useState<Set<string>>(new Set());

  function createGrid() {
    const g = Array(4).fill(null).map(() => Array(4).fill(0));
    const pos1 = addRandom(g);
    const pos2 = addRandom(g);
    const newSet = new Set<string>();
    if (pos1) newSet.add(`${pos1[0]}-${pos1[1]}`);
    if (pos2) newSet.add(`${pos2[0]}-${pos2[1]}`);
    setNewTiles(newSet);
    setMergedTiles(new Set());
    return g;
  }

  function addRandom(g: number[][]): [number, number] | null {
    const empty: [number, number][] = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (g[i][j] === 0) empty.push([i, j]);
    if (empty.length) {
      const [r, c] = empty[Math.floor(Math.random() * empty.length)];
      g[r][c] = Math.random() < 0.9 ? 2 : 4;
      return [r, c];
    }
    return null;
  }

  const startGame = () => {
    setGrid(createGrid());
    setScore(0);
    setGameState('playing');
  };

  function move(dir: string) {
    if (gameState !== 'playing') return;
    const newGrid = grid.map((r) => [...r]);
    let moved = false;
    let pts = 0;
    const merged = new Set<string>();

    const slide = (row: number[], rowIdx: number, isCol: boolean, reversed: boolean) => {
      const filtered = row.filter((x) => x !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          pts += filtered[i];
          if (filtered[i] === 2048) setGameState('won');
          const pos = reversed ? 3 - i : i;
          const key = isCol ? `${pos}-${rowIdx}` : `${rowIdx}-${pos}`;
          merged.add(key);
          filtered.splice(i + 1, 1);
        }
      }
      while (filtered.length < 4) filtered.push(0);
      return filtered;
    };

    if (dir === 'left') {
      for (let i = 0; i < 4; i++) {
        const old = [...newGrid[i]];
        newGrid[i] = slide(newGrid[i], i, false, false);
        if (old.join() !== newGrid[i].join()) moved = true;
      }
    } else if (dir === 'right') {
      for (let i = 0; i < 4; i++) {
        const old = [...newGrid[i]];
        newGrid[i] = slide(newGrid[i].reverse(), i, false, true).reverse();
        if (old.join() !== newGrid[i].join()) moved = true;
      }
    } else if (dir === 'up') {
      for (let j = 0; j < 4; j++) {
        const col = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]];
        const newCol = slide(col, j, true, false);
        if (col.join() !== newCol.join()) moved = true;
        for (let i = 0; i < 4; i++) newGrid[i][j] = newCol[i];
      }
    } else if (dir === 'down') {
      for (let j = 0; j < 4; j++) {
        const col = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]].reverse();
        const newCol = slide(col, j, true, true).reverse();
        if ([newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]].join() !== newCol.join()) moved = true;
        for (let i = 0; i < 4; i++) newGrid[i][j] = newCol[i];
      }
    }

    if (moved) {
      const newPos = addRandom(newGrid);
      const newSet = new Set<string>();
      if (newPos) newSet.add(`${newPos[0]}-${newPos[1]}`);
      setNewTiles(newSet);
      setMergedTiles(merged);
      setGrid(newGrid);
      const newScore = score + pts;
      setScore(newScore);
      setBestScore(b => Math.max(b, newScore));
    }
  }

  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); move('up'); }
      if (e.key === 'ArrowDown') { e.preventDefault(); move('down'); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); move('left'); }
      if (e.key === 'ArrowRight') { e.preventDefault(); move('right'); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const colors: Record<number, string> = {
    0: 'bg-stone-700/50',
    2: 'bg-stone-200 text-stone-800',
    4: 'bg-stone-300 text-stone-800',
    8: 'bg-orange-400 text-white',
    16: 'bg-orange-500 text-white',
    32: 'bg-orange-600 text-white',
    64: 'bg-red-500 text-white',
    128: 'bg-yellow-400 text-white shadow-lg shadow-yellow-400/30',
    256: 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30',
    512: 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30',
    1024: 'bg-amber-500 text-white shadow-xl shadow-amber-500/40',
    2048: 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-xl shadow-amber-500/50',
  };

  return (
    <div className="h-full bg-gradient-to-br from-stone-800 to-stone-900 flex flex-col items-center justify-center p-4">
      <style>{`
        @keyframes tile-pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tile-merge {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .tile-new { animation: tile-pop 0.2s ease-out; }
        .tile-merged { animation: tile-merge 0.15s ease-out; }
      `}</style>
      {gameState === 'menu' && (
        <div className="text-center">
          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">2048</div>
          <p className="text-stone-400 mb-6">Join the tiles, get to 2048!</p>
          <button
            onClick={startGame}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Game
          </button>
          {bestScore > 0 && <p className="text-stone-500 mt-4">Best: {bestScore}</p>}
        </div>
      )}
      {(gameState === 'playing' || gameState === 'won') && (
        <>
          <div className="flex gap-8 mb-4">
            <div className="bg-stone-700 rounded-lg px-4 py-2 text-center">
              <div className="text-stone-400 text-xs">SCORE</div>
              <div className="text-white font-bold text-xl">{score}</div>
            </div>
            <div className="bg-stone-700 rounded-lg px-4 py-2 text-center">
              <div className="text-stone-400 text-xs">BEST</div>
              <div className="text-white font-bold text-xl">{bestScore}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 bg-stone-700 p-3 rounded-xl">
            {grid.flat().map((v, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const key = `${row}-${col}`;
              const isNew = newTiles.has(key);
              const isMerged = mergedTiles.has(key);
              return (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold ${colors[v] || 'bg-purple-500 text-white'} ${v >= 100 ? 'text-xl' : 'text-2xl'} ${isNew && v ? 'tile-new' : ''} ${isMerged ? 'tile-merged' : ''}`}
                >
                  {v || ''}
                </div>
              );
            })}
          </div>
          <p className="text-stone-500 text-xs mt-4">Use arrow keys to play</p>
          {gameState === 'won' && (
            <div className="mt-4 text-center">
              <p className="text-yellow-400 text-xl font-bold mb-2">🎉 You Won!</p>
              <button onClick={startGame} className="px-4 py-2 bg-amber-500 text-white rounded-lg">Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SecretApp() {
  return (
    <div className="h-full bg-neutral-900 p-6 font-mono">
      <div className="rounded border border-dashed border-red-500/50 bg-red-500/10 p-4">
        <div className="text-red-400 text-sm mb-2">⚠️ SECRET_FILE.txt</div>
        <div className="text-neutral-300 text-sm leading-relaxed">
          <p className="mb-3">Why did you click this? 🤔</p>
          <p className="mb-3">This was supposed to be a SECRET folder!</p>
          <p className="mb-3">Well, since you&apos;re here...</p>
          <p className="text-green-400">Congratulations! You found the easter egg! 🎉</p>
          <p className="mt-4 text-neutral-500 text-xs">
            PS: Curiosity didn&apos;t kill the cat this time.
          </p>
        </div>
      </div>
    </div>
  );
}

type DesktopIcon = {
  id: string;
  app: AppId | null;
  icon: string;
  label: string;
  x: number;
  y: number;
  isFile?: boolean;
  fileContent?: string;
};

export function DesktopShell() {
  const zTopRef = useRef(10);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const dragRef = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  }>({ id: null, startX: 0, startY: 0, startLeft: 0, startTop: 0 });

  const iconDragRef = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  }>({ id: null, startX: 0, startY: 0, startLeft: 0, startTop: 0 });

  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>([
    { id: '1', app: 'terminal', icon: '🖥️', label: 'Terminal', x: 20, y: 20 },
    { id: '2', app: 'calculator', icon: '🧮', label: 'Calculator', x: 20, y: 110 },
    { id: '3', app: 'weather', icon: '⛅', label: 'Weather', x: 20, y: 200 },
    { id: '4', app: 'notes', icon: '📝', label: 'Notes', x: 20, y: 290 },
    { id: '5', app: 'snake', icon: '🐍', label: 'Snake', x: 110, y: 20 },
    { id: '6', app: 'game2048', icon: '🎮', label: '2048', x: 110, y: 110 },
    { id: '7', app: 'about', icon: 'ℹ️', label: 'About', x: 110, y: 200 },
    { id: '8', app: 'portfolio', icon: '📁', label: 'Portfolio', x: 110, y: 290 },
    { id: '9', app: 'secret', icon: '📂', label: 'Secret', x: 200, y: 20 },
    { id: '10', app: null, icon: '🗑️', label: 'Trash', x: 200, y: 110 },
  ]);

  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);

  const handleSaveNoteToDesktop = (name: string, content: string) => {
    const newIcon: DesktopIcon = {
      id: uid(),
      app: null,
      icon: '📄',
      label: `${name}.txt`,
      x: 200 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      isFile: true,
      fileContent: content,
    };
    setDesktopIcons((prev) => [...prev, newIcon]);
  };

  const startIconDrag = (iconId: string, e: React.PointerEvent) => {
    const icon = desktopIcons.find((i) => i.id === iconId);
    if (!icon) return;
    e.stopPropagation();
    iconDragRef.current = { id: iconId, startX: e.clientX, startY: e.clientY, startLeft: icon.x, startTop: icon.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (!selectedIcons.includes(iconId)) {
      setSelectedIcons([iconId]);
    }
  };

  const onIconDragMove = (e: React.PointerEvent) => {
    if (!iconDragRef.current.id) return;
    e.stopPropagation();
    const dx = e.clientX - iconDragRef.current.startX;
    const dy = e.clientY - iconDragRef.current.startY;
    
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 120;
    
    setDesktopIcons((prev) =>
      prev.map((icon) => {
        if (selectedIcons.includes(icon.id)) {
          const newX = clamp(iconDragRef.current.startLeft + dx, 0, maxX);
          const newY = clamp(iconDragRef.current.startTop + dy, 0, maxY);
          return { ...icon, x: newX, y: newY };
        }
        return icon;
      })
    );
  };

  const endIconDrag = () => {
    iconDragRef.current.id = null;
  };

  const startSelectionBox = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[data-window]')) return;
    setSelectionBox({ startX: e.clientX, startY: e.clientY, endX: e.clientX, endY: e.clientY });
    setSelectedIcons([]);
  };

  const updateSelectionBox = (e: React.MouseEvent) => {
    if (!selectionBox) return;
    setSelectionBox({ ...selectionBox, endX: e.clientX, endY: e.clientY });
    
    const minX = Math.min(selectionBox.startX, e.clientX);
    const maxX = Math.max(selectionBox.startX, e.clientX);
    const minY = Math.min(selectionBox.startY, e.clientY);
    const maxY = Math.max(selectionBox.startY, e.clientY);

    const selected = desktopIcons.filter((icon) => {
      const iconCenterX = icon.x + 40;
      const iconCenterY = icon.y + 40;
      return iconCenterX >= minX && iconCenterX <= maxX && iconCenterY >= minY && iconCenterY <= maxY;
    });
    setSelectedIcons(selected.map((i) => i.id));
  };

  const endSelectionBox = () => {
    setSelectionBox(null);
  };

  const [windows, setWindows] = useState<WindowState[]>(() => {
    // Start with terminal open
    const id = uid();
    const b = bootScript('terminal');
    return [
      {
        id,
        app: 'terminal',
        title: 'Terminal',
        minimized: false,
        maximized: false,
        z: 10,
        x: 120,
        y: 90,
        w: 980,
        h: 640,
        booting: true,
        bootText: b,
        bootIndex: 0,
      },
    ];
  });

  // Boot animation per window
  useEffect(() => {
    const id = window.setInterval(() => {
      setWindows((prev) => {
        let changed = false;
        const next = prev.map((w) => {
          if (!w.booting) return w;
          const step = Math.min(w.bootIndex + 6, w.bootText.length);
          if (step >= w.bootText.length) {
            changed = true;
            return { ...w, booting: false, bootIndex: w.bootText.length };
          }
          changed = true;
          return { ...w, bootIndex: step };
        });
        return changed ? next : prev;
      });
    }, 16);

    return () => window.clearInterval(id);
  }, []);

  // Clock + weather
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<{ temp: number | null; city: string } | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/weather', { cache: 'no-store' });
        const data = (await res.json()) as
          | { ok: true; city: string; temperatureC: number | null }
          | { ok: false; error: string };
        if (cancelled) return;
        if ('ok' in data && data.ok) {
          setWeather({ city: data.city, temp: data.temperatureC });
        }
      } catch {
        // ignore
      }
    }
    void load();
    const id = window.setInterval(load, 1000 * 60 * 5);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  function focusWindow(id: string) {
    zTopRef.current += 1;
    const nextZ = zTopRef.current;
    setActiveWindowId(id);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: nextZ, minimized: false } : w)));
  }

  function openApp(app: AppId) {
    // If already open but minimized, restore
    const existing = windows.find((w) => w.app === app);
    if (existing) {
      focusWindow(existing.id);
      return;
    }

    const id = uid();
    const title = appTitle(app);
    const b = bootScript(app);

    zTopRef.current += 1;
    const z = zTopRef.current;

    setWindows((prev) => [
      ...prev,
      {
        id,
        app,
        title,
        minimized: false,
        maximized: false,
        z,
        x: 140 + Math.round(Math.random() * 80),
        y: 90 + Math.round(Math.random() * 60),
        w: app === 'terminal' ? 980 : 720,
        h: app === 'terminal' ? 640 : 520,
        booting: true,
        bootText: b,
        bootIndex: 0,
      },
    ]);
    setActiveWindowId(id);
  }

  function closeWindow(id: string) {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }

  function minimizeWindow(id: string) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }

  function toggleMaximize(id: string) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }

  function startDrag(id: string, e: React.PointerEvent<HTMLDivElement>) {
    const win = windows.find((w) => w.id === id);
    if (!win || win.maximized) return;
    focusWindow(id);
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, startLeft: win.x, startTop: win.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
    const activeId = dragRef.current.id;
    if (!activeId) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== activeId) return w;
        const nx = clamp(dragRef.current.startLeft + dx, 12, window.innerWidth - 120);
        const ny = clamp(dragRef.current.startTop + dy, 12, window.innerHeight - 120);
        return { ...w, x: nx, y: ny };
      }),
    );
  }

  function endDrag() {
    dragRef.current.id = null;
  }

  const taskbarApps = useMemo(
    () => [
      { app: 'terminal' as const, icon: '/os/terminal.png', label: 'Terminal' },
      { app: 'about' as const, icon: '/os/about.png', label: 'About' },
      { app: 'services' as const, icon: '/os/services.png', label: 'Services' },
      { app: 'portfolio' as const, icon: '/os/portfolio.png', label: 'Portfolio' },
      { app: 'contact' as const, icon: '/os/contact.png', label: 'Contact' },
    ],
    [],
  );

  return (
    <div 
      className="fixed inset-0 overflow-hidden select-none"
      onMouseDown={startSelectionBox}
      onMouseMove={updateSelectionBox}
      onMouseUp={endSelectionBox}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/os/wallpaper.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Selection Box */}
      {selectionBox && (
        <div
          className="absolute border border-blue-400 bg-blue-400/20 z-50 pointer-events-none"
          style={{
            left: Math.min(selectionBox.startX, selectionBox.endX),
            top: Math.min(selectionBox.startY, selectionBox.endY),
            width: Math.abs(selectionBox.endX - selectionBox.startX),
            height: Math.abs(selectionBox.endY - selectionBox.startY),
          }}
        />
      )}

      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <button
          key={icon.id}
          onPointerDown={(e) => startIconDrag(icon.id, e)}
          onPointerMove={onIconDragMove}
          onPointerUp={endIconDrag}
          onPointerCancel={endIconDrag}
          onDoubleClick={() => icon.app && openApp(icon.app)}
          className={`absolute flex flex-col items-center gap-1 rounded-lg p-2 text-white transition w-20 cursor-default ${
            selectedIcons.includes(icon.id) ? 'bg-blue-500/30 ring-1 ring-blue-400' : 'hover:bg-white/10'
          }`}
          style={{ left: icon.x, top: icon.y }}
        >
          <span className="text-4xl drop-shadow-lg select-none">{icon.icon}</span>
          <span className="text-[10px] text-white text-center drop-shadow select-none leading-tight px-1 rounded bg-black/30">
            {icon.label}
          </span>
        </button>
      ))}

      {/* Windows */}
      {windows
        .filter((w) => !w.minimized)
        .sort((a, b) => a.z - b.z)
        .map((w) => {
          const style = w.maximized
            ? { left: 10, top: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 62px)' }
            : { left: w.x, top: w.y, width: w.w, height: w.h };

          const isTerminal = w.app === 'terminal';

          return (
            <div
              key={w.id}
              data-window
              className={`absolute rounded-xl border border-neutral-700 shadow-2xl overflow-hidden ${
                w.id === activeWindowId ? 'ring-1 ring-white/20' : ''
              }`}
              style={style as CSSProperties}
              onMouseDown={() => focusWindow(w.id)}
            >
              {/* Titlebar */}
              <div
                className="flex cursor-default items-center justify-between gap-3 border-b border-neutral-700 bg-neutral-800 px-3 py-2"
                onPointerDown={(e) => startDrag(w.id, e)}
                onPointerMove={onDragMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-3 w-3 rounded-full bg-[#ff5f57]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (w.app === 'terminal') {
                          minimizeWindow(w.id);
                        } else {
                          closeWindow(w.id);
                        }
                      }}
                      title="Close"
                    />
                    <button
                      className="h-3 w-3 rounded-full bg-[#febc2e]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        minimizeWindow(w.id);
                      }}
                      title="Minimize"
                    />
                    <button
                      className="h-3 w-3 rounded-full bg-[#28c840]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMaximize(w.id);
                      }}
                      title="Maximize"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-fg-200">{w.title}</div>
                </div>
                <div className="font-mono text-[10px] text-fg-400">kali@pixa:~</div>
              </div>

              {/* Content */}
              <div className="h-[calc(100%-40px)] overflow-hidden">
                {w.booting ? (
                  <div className="h-full bg-neutral-900 p-4 font-mono text-xs text-green-400">
                    <pre className="whitespace-pre-wrap">{w.bootText.slice(0, w.bootIndex)}</pre>
                    <div className="mt-2 animate-pulse">▮</div>
                  </div>
                ) : isTerminal ? (
                  <div className="h-full bg-[#0d1117]">
                    <TerminalIntro embedded hideHeader hideExit />
                  </div>
                ) : w.app === 'about' ? (
                  <AboutApp />
                ) : w.app === 'services' ? (
                  <ServicesApp />
                ) : w.app === 'portfolio' ? (
                  <PortfolioApp />
                ) : w.app === 'contact' ? (
                  <ContactApp />
                ) : w.app === 'calculator' ? (
                  <CalculatorApp />
                ) : w.app === 'weather' ? (
                  <WeatherApp />
                ) : w.app === 'notes' ? (
                  <NotesApp onSaveToDesktop={handleSaveNoteToDesktop} />
                ) : w.app === 'snake' ? (
                  <SnakeApp />
                ) : w.app === 'game2048' ? (
                  <Game2048App />
                ) : w.app === 'secret' ? (
                  <SecretApp />
                ) : null}
              </div>
            </div>
          );
        })}

      {/* Taskbar - Modern dock */}
      <div className="absolute bottom-3 left-1/2 z-[80] -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-black/60 px-3 py-2.5 shadow-2xl backdrop-blur-2xl">
          {taskbarApps.map((a) => {
            const win = windows.find((w) => w.app === a.app);
            const active = win && !win.minimized && win.id === activeWindowId;
            const open = !!win && !win.minimized;
            return (
              <button
                key={a.app}
                onClick={() => openApp(a.app)}
                title={a.label}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                  active 
                    ? 'bg-white/20 shadow-lg shadow-white/10 scale-105' 
                    : open 
                    ? 'bg-white/10' 
                    : 'hover:bg-white/10 hover:scale-110'
                }`}
              >
                <Image
                  src={a.icon}
                  alt={a.label}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain brightness-0 invert drop-shadow-lg"
                />
                {open && (
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all ${
                    active ? 'h-1.5 w-4 bg-cyan-400' : 'h-1 w-1 bg-white/60'
                  }`} />
                )}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 group-hover:-top-10">
                  {a.label}
                </span>
              </button>
            );
          })}

          {/* Dynamic icons for open apps not in taskbar */}
          {(() => {
            const taskbarAppIds: Set<AppId> = new Set(taskbarApps.map(a => a.app));
            const openNonTaskbarApps = windows.filter(w => !taskbarAppIds.has(w.app) && !w.minimized);
            if (openNonTaskbarApps.length === 0) return null;
            
            const appIcons: Record<string, string> = {
              calculator: '🧮',
              weather: '⛅',
              notes: '📝',
              snake: '🐍',
              game2048: '🎮',
              secret: '📂',
            };
            
            return (
              <>
                <div className="mx-1 h-8 w-px bg-white/20 rounded-full" />
                {openNonTaskbarApps.map((w) => {
                  const active = w.id === activeWindowId;
                  return (
                    <button
                      key={w.id}
                      onClick={() => focusWindow(w.id)}
                      title={w.title}
                      className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                        active 
                          ? 'bg-white/20 shadow-lg shadow-white/10 scale-105' 
                          : 'bg-white/10 hover:scale-110'
                      }`}
                    >
                      <span className="text-2xl">{appIcons[w.app] || '📱'}</span>
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all ${
                        active ? 'h-1.5 w-4 bg-cyan-400' : 'h-1 w-1 bg-white/60'
                      }`} />
                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 group-hover:-top-10">
                        {w.title}
                      </span>
                    </button>
                  );
                })}
              </>
            );
          })()}

          <button
            onClick={() => {
              window.location.href = '/';
            }}
            title="Power off"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/10 hover:scale-110"
          >
            <span className="text-lg text-white/90">⏻</span>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 group-hover:-top-10">
              Power off
            </span>
          </button>

          {/* Separator */}
          <div className="mx-1 h-8 w-px bg-white/20 rounded-full" />

          {/* Clock/Weather widget */}
          <div className="flex flex-col items-center justify-center px-2 min-w-[60px]">
            <div className="font-mono text-sm font-medium text-white">
              {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="font-mono text-[10px] text-white/60">
              {weather?.temp != null ? `${Math.round(weather.temp)}°C` : '--'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
