import { useState, useEffect, useRef } from 'react';
import {
  Shield, Video, Users, AlertTriangle, Brain, BarChart3, Crosshair,
  Play, Pause, Eye, Swords, Target, Activity, ChevronRight,
  Clock, Film, Camera, Cpu, Layers,
  TrendingUp, Zap, Info, Bus, MapPin, Monitor
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line
} from 'recharts';
import {
  actors, violenceEvents, predictions, captions, weaponSummary,
  modelInfo, captorInfo, timeSeriesAnalysis
} from './data/shangchiData';

type Tab = 'analysis' | 'actors' | 'violence' | 'predictions' | 'analytics' | 'about';
type VideoMode = 'train' | 'test';

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('analysis');
  const [videoMode, setVideoMode] = useState<VideoMode>('train');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCaptionIdx, setCurrentCaptionIdx] = useState(0);
  const [visibleCaptions, setVisibleCaptions] = useState(captions.slice(0, 5));
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCaptionIdx(prev => {
        const next = Math.min(prev + 1, captions.length - 1);
        setVisibleCaptions(captions.slice(0, next + 1));
        if (next >= captions.length - 1) setIsPlaying(false);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (captionRef.current) {
      captionRef.current.scrollTop = captionRef.current.scrollHeight;
    }
  }, [visibleCaptions]);

  const tabs = [
    { id: 'analysis' as Tab, label: 'Live Analysis', icon: Video },
    { id: 'actors' as Tab, label: 'Actor Registry', icon: Users },
    { id: 'violence' as Tab, label: 'Violence Events', icon: AlertTriangle },
    { id: 'predictions' as Tab, label: 'LSTM Predictions', icon: Brain },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'about' as Tab, label: 'About', icon: Info },
  ];

  const threatStats = {
    critical: actors.filter(a => a.threatLevel === 'critical').length,
    high: actors.filter(a => a.threatLevel === 'high').length,
    medium: actors.filter(a => a.threatLevel === 'medium').length,
    low: actors.filter(a => a.threatLevel === 'low').length,
  };

  const weaponTypeData = [
    { name: 'Machete-Arm', value: 1, color: '#dc2626' },
    { name: 'Karambit Knives', value: 2, color: '#ef4444' },
    { name: 'Tactical/Concealed', value: 2, color: '#f97316' },
    { name: 'Bus Pole (Improv)', value: 1, color: '#3b82f6' },
    { name: 'Martial Arts', value: 2, color: '#8b5cf6' },
  ];

  const behaviorData = [
    { name: 'Aggressive Striking', value: 3, color: '#ef4444' },
    { name: 'Defensive/Parrying', value: 1, color: '#3b82f6' },
    { name: 'Flanking/Coordinated', value: 3, color: '#f97316' },
    { name: 'Bystander/Cowering', value: 4, color: '#6b7280' },
    { name: 'Grappling/Restraining', value: 1, color: '#8b5cf6' },
  ];

  const captionTypeColor: Record<string, string> = {
    violence: 'text-red-400',
    weapon: 'text-orange-400',
    movement: 'text-blue-400',
    prediction: 'text-purple-400',
    status: 'text-green-400',
  };

  const captionTypeBg: Record<string, string> = {
    violence: 'bg-red-500/10 border-red-500/20',
    weapon: 'bg-orange-500/10 border-orange-500/20',
    movement: 'bg-blue-500/10 border-blue-500/20',
    prediction: 'bg-purple-500/10 border-purple-500/20',
    status: 'bg-green-500/10 border-green-500/20',
  };

  const captionTypeLabel: Record<string, string> = {
    violence: '🔴 VIOLENCE',
    weapon: '🔪 WEAPON',
    movement: '🏃 MOVEMENT',
    prediction: '🧠 PREDICTION',
    status: '🟢 SYSTEM',
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ============ HEADER ============ */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight tracking-wide">
                MOB VIOLENCE PREDICTION SYSTEM
              </h1>
              <p className="text-[10px] text-gray-400 leading-tight">
                B.Tech Final Year Thesis — Video Surveillance Predictive Analysis using CV & AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Train / Test Toggle */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setVideoMode('train')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  videoMode === 'train'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🎓 Train Video
              </button>
              <button
                onClick={() => setVideoMode('test')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  videoMode === 'test'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🧪 Test Video
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {modelInfo.name} Active
            </div>
          </div>
        </div>
      </header>

      {/* ============ TAB NAV ============ */}
      <nav className="bg-gray-900/60 border-b border-gray-800 px-4">
        <div className="max-w-[1600px] mx-auto flex gap-1 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ============ MAIN CONTENT ============ */}
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6">

        {/* ========================================== */}
        {/* TAB: LIVE ANALYSIS                        */}
        {/* ========================================== */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            {/* Video Mode Banner */}
            <div className={`px-4 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium ${
              videoMode === 'train'
                ? 'bg-blue-900/30 border border-blue-700/30 text-blue-300'
                : 'bg-amber-900/30 border border-amber-700/30 text-amber-300'
            }`}>
              <Bus className="w-5 h-5" />
              <span>
                {videoMode === 'train' ? 'TRAINING VIDEO' : 'TEST VIDEO'} — Shang-Chi (2021) Bus Fight Scene • San Francisco Commuter Bus
                {videoMode === 'test' && ' [Model Evaluation Mode — Predictions vs Ground Truth]'}
              </span>
              <span className={`ml-auto text-xs px-3 py-0.5 rounded-full font-bold ${
                videoMode === 'train' ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
              }`}>
                {videoMode === 'train' ? 'TRAIN' : 'TEST'}
              </span>
            </div>

            {/* Main Grid: Video + Labels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* LEFT: Video Player */}
              <div className="lg:col-span-2 space-y-3">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video bg-black relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/gxCtHmPOqtg?rel=0&modestbranding=1&autoplay=0"
                        title="Shang-Chi Bus Fight Scene — Surveillance Analysis"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full absolute inset-0"
                        style={{ border: 'none' }}
                      />
                      {/* Fallback */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 -z-10">
                        <Film className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-sm text-gray-400 mb-2">If video doesn't load:</p>
                        <a
                          href="https://youtu.be/gxCtHmPOqtg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Play className="w-4 h-4" /> Watch on YouTube
                        </a>
                      </div>
                    </div>
                    {/* Overlay */}
                    <div className="absolute top-2 left-2 flex items-center gap-2 pointer-events-none">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-green-400 font-mono bg-black/80 px-2 py-0.5 rounded">
                        BUS-CAM-01 | INTERIOR | {captorInfo.processedResolution}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        videoMode === 'train' ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {videoMode === 'train' ? 'TRAIN' : 'TEST'} VIDEO
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 pointer-events-none">
                      <span className="text-[10px] text-white font-mono bg-red-600/90 px-2 py-0.5 rounded animate-pulse">
                        ● REC — VIOLENCE DETECTED
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="px-4 py-3 bg-gray-800/50 flex items-center gap-4">
                    <button
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (!isPlaying) {
                          setCurrentCaptionIdx(0);
                          setVisibleCaptions(captions.slice(0, 1));
                        }
                      }}
                      className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div className="flex-1">
                      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${(currentCaptionIdx / (captions.length - 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {captions[currentCaptionIdx]?.timestamp || '00:00'} / 04:30
                    </span>
                    <span className="text-xs text-gray-500 font-mono hidden sm:block">
                      F{String(captions[currentCaptionIdx]?.frameNum || 0).padStart(4, '0')} / 8100
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Actors Tracked', value: '12', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                    { label: 'Weapons Detected', value: '8', icon: Swords, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
                    { label: 'Violence Events', value: '8', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                    { label: 'Model Accuracy', value: `${modelInfo.accuracy}%`, icon: Target, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                  ].map((s) => (
                    <div key={s.label} className={`${s.bg} border rounded-xl p-3 flex items-center gap-3`}>
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                      <div>
                        <p className="text-lg font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-gray-400">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Real-Time Labels Panel */}
              <div className="space-y-3">
                {/* Active Actors */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-red-400" />
                      Real-Time Actor Labels
                    </h3>
                    <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                      DeepSORT
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    {actors.map((actor) => (
                      <div
                        key={actor.id}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs border ${
                          actor.threatLevel === 'critical'
                            ? 'bg-red-500/10 border-red-500/30'
                            : actor.threatLevel === 'high'
                            ? 'bg-orange-500/10 border-orange-500/20'
                            : actor.threatLevel === 'medium'
                            ? 'bg-yellow-500/10 border-yellow-500/20'
                            : 'bg-gray-800/50 border-gray-700'
                        }`}
                      >
                        <span className="font-mono text-gray-400 w-[72px] flex-shrink-0 text-[10px]">{actor.id}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-white truncate">{actor.name}</span>
                            {actor.weapon !== 'None' && actor.weapon !== 'None (Martial Arts)' && (
                              <span className="text-[8px] px-1 bg-red-600/30 text-red-300 rounded">
                                {actor.weapon.split(' ')[0]}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 truncate block">{actor.behavior.split(' / ')[0]}</span>
                        </div>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${
                          actor.threatLevel === 'critical' ? 'bg-red-600 text-white' :
                          actor.threatLevel === 'high' ? 'bg-orange-600 text-white' :
                          actor.threatLevel === 'medium' ? 'bg-yellow-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {actor.threatLevel.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weapon Detection */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                    <Crosshair className="w-4 h-4 text-red-400" />
                    Weapons Detected
                  </h3>
                  <div className="space-y-2">
                    {weaponSummary.map((w) => (
                      <div key={w.weapon} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div>
                          <p className="text-xs font-semibold text-white">{w.weapon}</p>
                          <p className="text-[10px] text-gray-400">{w.type} • {w.count} unit{w.count > 1 ? 's' : ''}</p>
                        </div>
                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold ${
                          w.dangerLevel === 'Critical' ? 'bg-red-600 text-white' :
                          w.dangerLevel === 'High' ? 'bg-orange-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {w.dangerLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Threat Distribution */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                  <h3 className="text-sm font-bold text-white mb-3">Threat Distribution</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Critical', val: threatStats.critical, color: 'bg-red-500', tc: 'text-red-300' },
                      { label: 'High', val: threatStats.high, color: 'bg-orange-500', tc: 'text-orange-300' },
                      { label: 'Medium', val: threatStats.medium, color: 'bg-yellow-500', tc: 'text-yellow-300' },
                      { label: 'Low', val: threatStats.low, color: 'bg-green-500', tc: 'text-green-300' },
                    ].map((t) => (
                      <div key={t.label} className="bg-gray-800/50 rounded-lg p-2.5 border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                          <span className="text-[10px] text-gray-400">{t.label}</span>
                        </div>
                        <p className={`text-xl font-bold ${t.tc}`}>{t.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM: Automatic Captions */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  Automatic Captions — Violence Detection Feed
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2 text-[9px]">
                    {Object.entries(captionTypeLabel).map(([key, label]) => (
                      <span key={key} className={`${captionTypeBg[key]} border px-1.5 py-0.5 rounded`}>{label}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {visibleCaptions.length}/{captions.length}
                  </span>
                  <button
                    onClick={() => { setVisibleCaptions(captions); setCurrentCaptionIdx(captions.length - 1); }}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold"
                  >
                    Show All
                  </button>
                </div>
              </div>
              <div ref={captionRef} className="space-y-1.5 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
                {visibleCaptions.map((cap, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs transition-all ${
                      captionTypeBg[cap.type]
                    } ${i === visibleCaptions.length - 1 ? 'ring-1 ring-red-500/50' : ''}`}
                  >
                    <span className="text-gray-500 font-mono w-10 flex-shrink-0 pt-0.5">{cap.timestamp}</span>
                    <span className="text-gray-600 font-mono w-14 flex-shrink-0 pt-0.5">F{String(cap.frameNum).padStart(4, '0')}</span>
                    <span className={`flex-1 leading-relaxed ${captionTypeColor[cap.type]}`}>
                      {cap.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: ACTOR REGISTRY                       */}
        {/* ========================================== */}
        {activeTab === 'actors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">Actor Registry — DeepSORT Tracking</h2>
                <p className="text-sm text-gray-400 mt-1">{actors.length} actors tracked with consistent IDs across all frames</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-red-600/20 text-red-300 px-3 py-1 rounded-full border border-red-600/30">
                  {threatStats.critical} Critical
                </span>
                <span className="text-xs bg-orange-600/20 text-orange-300 px-3 py-1 rounded-full border border-orange-600/30">
                  {threatStats.high} High
                </span>
                <span className="text-xs bg-gray-600/20 text-gray-300 px-3 py-1 rounded-full border border-gray-600/30">
                  {threatStats.low} Bystanders
                </span>
              </div>
            </div>

            {/* Key Actor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shang-Chi Card */}
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-blue-700/30 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-black shrink-0">01</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white">Shang-Chi</h3>
                      <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">PROTAGONIST</span>
                      <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">DEFENDER</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Primary Target — Defender / Victim</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Weapon</p>
                        <p className="text-xs font-semibold text-blue-300">🔩 Bus Pole (Improv)</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Fighting Style</p>
                        <p className="text-xs font-semibold text-blue-300">🥋 Martial Arts</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Confidence</p>
                        <p className="text-xs font-semibold text-green-400">98%</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Status</p>
                        <p className="text-xs font-semibold text-yellow-400">Active — High Velocity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Razor Fist Card */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl border border-red-700/30 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-xl font-black shrink-0">02</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white">Razor Fist</h3>
                      <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">PRIMARY AGGRESSOR</span>
                      <span className="text-[10px] bg-red-800 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">CRITICAL</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Lead Assassin — Ten Rings Organization</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Weapon</p>
                        <p className="text-xs font-semibold text-red-400">🗡️ Machete-Arm</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Weapon Type</p>
                        <p className="text-xs font-semibold text-red-400">Permanent Edged</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Confidence</p>
                        <p className="text-xs font-semibold text-green-400">97%</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-2">
                        <p className="text-[9px] text-gray-500">Status</p>
                        <p className="text-xs font-semibold text-red-400">⚠ Max Aggression</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Actors Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-800/50 border-b border-gray-700">
                      {['ID', 'Name', 'Role', 'Label', 'Weapon', 'Behavior', 'Threat', 'Conf.', 'Bbox'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-gray-400 font-semibold text-[10px] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {actors.map((actor) => (
                      <tr key={actor.id} className={`border-b border-gray-800 hover:bg-gray-800/30 transition-colors ${
                        actor.id === 'ACTOR-01' ? 'bg-blue-900/10' :
                        actor.id === 'ACTOR-02' ? 'bg-red-900/10' : ''
                      }`}>
                        <td className="py-2.5 px-3 font-mono text-red-400 text-xs">{actor.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-white text-xs">{actor.name}</td>
                        <td className="py-2.5 px-3 text-gray-300 text-[11px]">{actor.role.split(' / ')[0]}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[9px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                            {actor.label.split(' — ')[0]}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          {actor.weapon !== 'None' ? (
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                              actor.weaponType === 'edged' ? 'bg-red-600/20 text-red-300' :
                              actor.weaponType === 'environmental' ? 'bg-blue-600/20 text-blue-300' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {actor.weapon.split('(')[0].trim()}
                            </span>
                          ) : <span className="text-[9px] text-gray-500">Unarmed</span>}
                        </td>
                        <td className="py-2.5 px-3 text-[11px] text-gray-300">{actor.behavior.split(' / ')[0]}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                            actor.threatLevel === 'critical' ? 'bg-red-600 text-white' :
                            actor.threatLevel === 'high' ? 'bg-orange-600 text-white' :
                            actor.threatLevel === 'medium' ? 'bg-yellow-600 text-white' :
                            'bg-green-600 text-white'
                          }`}>
                            {actor.threatLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-10 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: `${actor.confidence * 100}%` }} />
                            </div>
                            <span className="text-[9px] text-gray-400">{(actor.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[9px] text-gray-500">
                          [{actor.boundingBox.x},{actor.boundingBox.y},{actor.boundingBox.w},{actor.boundingBox.h}]
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: VIOLENCE EVENTS                      */}
        {/* ========================================== */}
        {activeTab === 'violence' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">Violence Events Timeline</h2>
              <p className="text-sm text-gray-400 mt-1">
                {violenceEvents.length} violence events detected across {captorInfo.duration}
              </p>
            </div>

            {/* Severity Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Critical Events', count: violenceEvents.filter(e => e.severity === 'critical').length, cls: 'bg-red-500/10 border-red-500/30 text-red-400' },
                { label: 'High Events', count: violenceEvents.filter(e => e.severity === 'high').length, cls: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
                { label: 'Medium Events', count: violenceEvents.filter(e => e.severity === 'medium').length, cls: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
                { label: 'Weapons Used', count: 6, cls: 'bg-purple-500/10 border-purple-500/30 text-purple-400' },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-4 border ${s.cls}`}>
                  <p className="text-3xl font-bold">{s.count}</p>
                  <p className="text-xs opacity-80 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {violenceEvents.map((event, idx) => (
                <div key={event.id}>
                  <div className={`bg-gray-900 rounded-xl border overflow-hidden ${
                    event.severity === 'critical' ? 'border-red-700/40' :
                    event.severity === 'high' ? 'border-orange-700/40' :
                    'border-gray-700'
                  }`}>
                    {/* Header */}
                    <div className={`px-5 py-3 flex items-center gap-3 flex-wrap ${
                      event.severity === 'critical' ? 'bg-red-900/20' :
                      event.severity === 'high' ? 'bg-orange-900/20' :
                      'bg-gray-800/30'
                    }`}>
                      <span className="text-white text-xs font-mono bg-gray-700 px-2 py-0.5 rounded">#{event.id}</span>
                      <span className="text-white font-bold text-sm">{event.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        event.severity === 'critical' ? 'bg-red-600 text-white' :
                        event.severity === 'high' ? 'bg-orange-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" /> {event.timestamp}
                        <span className="text-gray-600">|</span>
                        <Film className="w-3 h-3" /> {event.frameRange}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-sm text-gray-300 leading-relaxed">{event.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[9px] text-gray-500 mb-1.5 uppercase tracking-wider font-bold">Involved Actors</p>
                          <div className="flex flex-wrap gap-1">
                            {event.involvedActors.map((actorId) => {
                              const actor = actors.find(a => a.id === actorId);
                              return (
                                <span key={actorId} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700 font-mono">
                                  {actorId}{actor ? ` (${actor.name})` : ''}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 mb-1.5 uppercase tracking-wider font-bold">Weapons Used</p>
                          <div className="flex flex-wrap gap-1">
                            {event.weaponsUsed.map((w) => (
                              <span key={w} className="text-[10px] bg-red-900/30 text-red-300 px-2 py-1 rounded border border-red-700/30">
                                ⚔️ {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Caption */}
                      <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                        event.severity === 'critical' ? 'bg-red-900/10 border-red-700/20 text-red-300' :
                        event.severity === 'high' ? 'bg-orange-900/10 border-orange-700/20 text-orange-300' :
                        'bg-yellow-900/10 border-yellow-700/20 text-yellow-300'
                      }`}>
                        <p className="text-[9px] text-gray-500 mb-1 font-bold">📝 AUTO-CAPTION (Violence Noted):</p>
                        {event.captionText}
                      </div>
                    </div>
                  </div>
                  {idx < violenceEvents.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-5 h-5 text-gray-700 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: LSTM PREDICTIONS                     */}
        {/* ========================================== */}
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">LSTM Next-Move Predictions</h2>
              <p className="text-sm text-gray-400 mt-1">
                Bi-directional LSTM analyzing skeletal tracking to predict next moves & structural failure
              </p>
            </div>

            {/* Model Info */}
            <div className="bg-gradient-to-r from-purple-900/20 to-red-900/20 rounded-xl border border-purple-700/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Prediction Engine — The LSTM "Brain"</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Model', value: 'Bi-LSTM (3-layer)' },
                  { label: 'Input', value: 'Skeletal Keypoints (33/actor)' },
                  { label: 'Sequence', value: '30 frames lookback' },
                  { label: 'Prediction AUC', value: `${modelInfo.violencePredictionAUC}` },
                ].map((m) => (
                  <div key={m.label} className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-[9px] text-gray-400 uppercase">{m.label}</p>
                    <p className="text-sm font-semibold text-purple-300">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictions */}
            <div className="space-y-3">
              {predictions.map((pred, idx) => (
                <div key={idx} className={`bg-gray-900 rounded-xl border overflow-hidden ${
                  pred.riskLevel === 'critical' ? 'border-red-700/40' :
                  pred.riskLevel === 'high' ? 'border-orange-700/40' :
                  'border-gray-700'
                }`}>
                  <div className={`px-5 py-3 flex items-center gap-3 flex-wrap ${
                    pred.riskLevel === 'critical' ? 'bg-red-900/15' :
                    pred.riskLevel === 'high' ? 'bg-orange-900/15' :
                    'bg-gray-800/30'
                  }`}>
                    <span className="text-white font-mono text-xs bg-gray-700 px-2 py-0.5 rounded">⏱ {pred.timestamp}</span>
                    <span className="text-white font-semibold text-sm">{pred.actor}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-auto ${
                      pred.riskLevel === 'critical' ? 'bg-red-600 text-white' :
                      pred.riskLevel === 'high' ? 'bg-orange-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {pred.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="text-xs text-green-400 font-mono">{(pred.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 font-bold">Current Action</p>
                      <p className="text-sm text-gray-300">{pred.currentAction}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 font-bold">⚡ Predicted Next Move</p>
                      <p className="text-sm text-white font-bold">{pred.predictedNextMove}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 font-bold">LSTM Output Code</p>
                      <p className="text-xs text-purple-300 font-mono bg-gray-800/50 rounded p-2">{pred.lstmOutput}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 font-bold">Reasoning</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{pred.reasoning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: ANALYTICS                            */}
        {/* ========================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Analytics & Model Performance</h2>
              <p className="text-sm text-gray-400 mt-1">
                Comprehensive analysis of the Shang-Chi bus fight scene surveillance data
              </p>
            </div>

            {/* Model Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Accuracy', value: `${modelInfo.accuracy}%`, icon: Target, color: 'text-green-400' },
                { label: 'Precision', value: `${modelInfo.precision}%`, icon: Zap, color: 'text-blue-400' },
                { label: 'Recall', value: `${modelInfo.recall}%`, icon: TrendingUp, color: 'text-purple-400' },
                { label: 'F1 Score', value: `${modelInfo.f1Score}%`, icon: BarChart3, color: 'text-red-400' },
              ].map((s) => (
                <div key={s.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                  <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Row 1: Violence + Structural Integrity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white mb-4">Violence Score & Combat Fatigue Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesAnalysis}>
                      <defs>
                        <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#e5e7eb' }} />
                      <Area type="monotone" dataKey="violence" stroke="#ef4444" fill="url(#vg)" strokeWidth={2} name="Violence Score" />
                      <Area type="monotone" dataKey="fatigue" stroke="#f59e0b" fill="url(#fg)" strokeWidth={2} name="Combat Fatigue" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white mb-4">🚌 Bus Structural Integrity vs Razor Fist Velocity</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#e5e7eb' }} />
                      <Line type="monotone" dataKey="structuralIntegrity" stroke="#06b6d4" strokeWidth={2.5} name="Bus Integrity %" dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="razorFistVelocity" stroke="#ef4444" strokeWidth={2} name="Razor Fist Velocity (m/s)" dot={{ r: 2 }} strokeDasharray="4 2" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Row 2: Weapon + Behavior */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white mb-4">Weapon Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={weaponTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      >
                        {weaponTypeData.map((entry, i) => (
                          <Cell key={`c-${i}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#e5e7eb' }} />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white mb-4">Actor Behavior Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={behaviorData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} width={130} />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#e5e7eb' }} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Count">
                        {behaviorData.map((entry, i) => (
                          <Cell key={`bc-${i}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Row 3: Radar + Threat */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white mb-4">Model Performance Radar</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { metric: 'Accuracy', value: modelInfo.accuracy },
                      { metric: 'Precision', value: modelInfo.precision },
                      { metric: 'Recall', value: modelInfo.recall },
                      { metric: 'F1 Score', value: modelInfo.f1Score },
                      { metric: 'Weapon AP', value: modelInfo.weaponDetectionAP },
                      { metric: 'Pose Est.', value: modelInfo.poseEstimationAccuracy },
                    ]}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#6b7280' }} />
                      <Radar name="Performance" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white mb-4">Mob Cohesion & Active Combatants</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesAnalysis}>
                      <defs>
                        <linearGradient id="mcg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px', color: '#e5e7eb' }} />
                      <Area type="monotone" dataKey="mobCohesion" stroke="#8b5cf6" fill="url(#mcg)" strokeWidth={2} name="Mob Cohesion %" />
                      <Line type="monotone" dataKey="actorsActive" stroke="#06b6d4" strokeWidth={2} name="Active Combatants" dot={{ r: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: ABOUT                                */}
        {/* ========================================== */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold text-white">About This Project</h2>
              <p className="text-sm text-gray-400 mt-1">
                Final Year B.Tech Thesis — Prediction of Mob Violence Scene Using Surveillance Data
              </p>
            </div>

            {/* Core Objective */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl border border-red-700/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-bold text-white">I. Core Objective</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Predict human activity and violence in surveillance data using <strong className="text-white">Computer Vision (CV)</strong> and <strong className="text-white">Artificial Intelligence (AI)</strong>.
                The system processes video feeds in real-time to detect, track, label, and predict mob violence scenarios — including weapon detection, behavioral analysis, and structural damage prediction.
              </p>
            </div>

            {/* Case Study */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-bold text-white">II. Primary Dataset Case Study</h3>
              </div>
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-4 mb-4 border border-red-700/20">
                <h4 className="font-bold text-white text-lg">Shang-Chi and the Legend of the Ten Rings (2021)</h4>
                <p className="text-sm text-gray-400 mt-1">Director: Destin Daniel Cretton | Cinematographer: William Pope, ASC</p>
                <p className="text-sm text-red-300 font-semibold mt-1">Scene: Bus Fight — San Francisco Commuter Bus</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Setting', value: 'Inside a moving public commuter bus, San Francisco', icon: Bus },
                  { label: 'Scale', value: '1 Protagonist vs. 6 Assassins + 5 Passengers', icon: Users },
                  { label: 'Shot Type', value: 'Multiple dynamic angles, HD clarity', icon: Camera },
                  { label: 'Duration', value: captorInfo.duration, icon: Clock },
                  { label: 'Total Frames', value: captorInfo.totalFrames, icon: Layers },
                  { label: 'Processing', value: captorInfo.processingFPS, icon: Monitor },
                  { label: 'Location', value: captorInfo.location, icon: MapPin },
                  { label: 'Capture Type', value: captorInfo.captureType, icon: Camera },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg shrink-0">
                      <item.icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actor Roles */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">III. Actor Roles & Weapons</h3>
              <div className="space-y-3">
                <div className="bg-blue-900/10 border border-blue-700/20 rounded-lg p-3">
                  <p className="text-sm font-bold text-blue-300">ACTOR-01: Shang-Chi (Protagonist)</p>
                  <p className="text-xs text-gray-400 mt-1">Role: Defender/Victim | Weapon: Bus Pole (improvised), Martial Arts | Behavior: Defensive parrying, counter-striking, acrobatic combat</p>
                </div>
                <div className="bg-red-900/10 border border-red-700/20 rounded-lg p-3">
                  <p className="text-sm font-bold text-red-300">ACTOR-02: Razor Fist (Primary Aggressor)</p>
                  <p className="text-xs text-gray-400 mt-1">Role: Lead Assassin | Weapon: Machete-Arm (permanent edged prosthetic) | Behavior: Lethal slashing, pursuing, structural destruction</p>
                </div>
                <div className="bg-orange-900/10 border border-orange-700/20 rounded-lg p-3">
                  <p className="text-sm font-bold text-orange-300">ACTOR-03 to ACTOR-07: Ten Rings Assassins</p>
                  <p className="text-xs text-gray-400 mt-1">Role: Secondary Aggressors | Weapons: Karambit knives, tactical knives, concealed blades | Behavior: Coordinated flanking, grappling, blocking exits</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <p className="text-sm font-bold text-gray-300">ACTOR-08 to ACTOR-12: Passengers & Bus Driver</p>
                  <p className="text-xs text-gray-400 mt-1">Role: Bystanders | Weapons: None | Behavior: Cowering, fleeing, frozen in shock, incapacitated</p>
                </div>
              </div>
            </div>

            {/* Technical Pipeline */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">IV. Technical Pipeline</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Person Detection', desc: 'YOLOv8x detects all persons in each frame with bounding boxes.', tech: 'YOLOv8x' },
                  { step: '2', title: 'Multi-Object Tracking', desc: 'DeepSORT assigns consistent IDs (ACTOR-01 through ACTOR-12) across all frames.', tech: 'DeepSORT' },
                  { step: '3', title: 'Skeletal Pose Estimation', desc: 'MediaPipe extracts 33 skeletal keypoints per actor for pose & velocity analysis.', tech: 'MediaPipe' },
                  { step: '4', title: 'Weapon Detection', desc: 'Custom YOLOv8 detects weapons: machete-arm, karambit knives, tactical blades, bus poles.', tech: 'YOLOv8-custom' },
                  { step: '5', title: 'Action Recognition', desc: 'Real-time behavior labeling: Striking, Parrying, Slashing, Grappling, Fleeing, Cowering.', tech: 'CNN + LSTM' },
                  { step: '6', title: 'Violence Classification', desc: 'Classify events by type & severity. Generate auto-captions. Detect structural damage.', tech: 'CNN + Temporal' },
                  { step: '7', title: 'Next-Move Prediction', desc: 'Bi-LSTM predicts: lethal strikes, environmental weapon use, structural failure, combat fatigue.', tech: 'Bi-LSTM (3-layer)' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-red-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-red-600/40">
                      <span className="text-xs font-black text-red-300">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <span className="text-[8px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full font-mono">{item.tech}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Presentation Constraints */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">V. Presentation Constraints (Professor's Requirements)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { req: 'Video Surveillance / Actor Name', status: '✅ Implemented', desc: 'YouTube video embed + all 12 actors named & tracked' },
                  { req: 'Label the Actors', status: '✅ Implemented', desc: 'DeepSORT IDs, roles, behaviors, threat levels, bounding boxes' },
                  { req: 'Violence Noted in Video', status: '✅ Implemented', desc: '8 violence events with auto-captions & severity levels' },
                  { req: 'Train Video / Test Video', status: '✅ Implemented', desc: 'Toggle switch in header for Train/Test mode' },
                  { req: 'Captors (Camera Info)', status: '✅ Implemented', desc: 'Simulated bus interior CCTV with full metadata' },
                  { req: 'Next Move Prediction', status: '✅ Implemented', desc: '9 LSTM predictions with confidence & reasoning' },
                ].map((r) => (
                  <div key={r.req} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400 font-bold">{r.status}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">{r.req}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Python', 'PyTorch', 'YOLOv8', 'DeepSORT', 'LSTM', 'MediaPipe',
                  'OpenCV', 'TensorFlow', 'CNN', 'React', 'Tailwind CSS', 'Vite',
                  'NumPy', 'Pandas', 'Matplotlib', 'CUDA', 'FFmpeg', 'Scikit-learn'
                ].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs font-medium border border-gray-700 hover:border-red-600/40 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-gray-900 border-t border-gray-800 px-4 py-4 mt-8">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © 2024 B.Tech Final Year Thesis — Prediction of Mob Violence Scene Using Surveillance Data
          </p>
          <p className="text-xs text-gray-500">
            {modelInfo.name} | {modelInfo.framework}
          </p>
        </div>
      </footer>
    </div>
  );
}
