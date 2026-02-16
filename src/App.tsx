import { useState, useEffect, useRef } from 'react';
import {
  Shield, Video, Users, AlertTriangle, Brain, BarChart3, Crosshair,
  Play, Pause, Eye, Swords, Target, Activity, ChevronRight,
  Clock, Monitor, MapPin, Film, Camera, Cpu, Layers,
  TrendingUp, Zap, Info
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
} from './data/oldboyData';

type Tab = 'analysis' | 'actors' | 'violence' | 'predictions' | 'analytics' | 'about';
type VideoMode = 'train' | 'test';

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('analysis');
  const [videoMode, setVideoMode] = useState<VideoMode>('train');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCaptionIdx, setCurrentCaptionIdx] = useState(0);
  const [visibleCaptions, setVisibleCaptions] = useState(captions.slice(0, 5));
  const captionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll captions when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentCaptionIdx(prev => {
        const next = Math.min(prev + 1, captions.length - 1);
        setVisibleCaptions(captions.slice(0, next + 1));
        return next;
      });
    }, 2200);
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
    { id: 'predictions' as Tab, label: 'Predictions', icon: Brain },
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
    { name: 'Wooden Sticks', value: 14, color: '#f59e0b' },
    { name: 'Bare Hands', value: 11, color: '#3b82f6' },
    { name: 'Knives', value: 5, color: '#ef4444' },
    { name: 'Claw Hammer', value: 1, color: '#8b5cf6' },
  ];

  const behaviorData = [
    { name: 'Striking/Attacking', value: 12, color: '#ef4444' },
    { name: 'Advancing/Charging', value: 6, color: '#f97316' },
    { name: 'Blocking/Defensive', value: 4, color: '#3b82f6' },
    { name: 'Waiting/Observing', value: 5, color: '#6b7280' },
    { name: 'Grappling/Holding', value: 4, color: '#8b5cf6' },
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">
                Mob Violence Prediction System
              </h1>
              <p className="text-[10px] text-slate-400 leading-tight">
                B.Tech Thesis — Video Surveillance Predictive Analysis
              </p>
            </div>
          </div>

          {/* Train / Test Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => setVideoMode('train')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  videoMode === 'train'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 Train Video
              </button>
              <button
                onClick={() => setVideoMode('test')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  videoMode === 'test'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🧪 Test Video
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {modelInfo.name} Active
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-slate-900/50 border-b border-slate-800 px-4">
        <div className="max-w-[1600px] mx-auto flex gap-1 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6">
        {/* ================================================ */}
        {/* TAB: LIVE ANALYSIS */}
        {/* ================================================ */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            {/* Video Mode Banner */}
            <div className={`px-4 py-2 rounded-lg flex items-center gap-3 text-sm font-medium ${
              videoMode === 'train'
                ? 'bg-blue-900/30 border border-blue-700/30 text-blue-300'
                : 'bg-amber-900/30 border border-amber-700/30 text-amber-300'
            }`}>
              <span className="text-lg">{videoMode === 'train' ? '🎓' : '🧪'}</span>
              <span>
                {videoMode === 'train' ? 'TRAINING VIDEO' : 'TEST VIDEO'} — Oldboy (2003) Hallway Fight Scene
                {videoMode === 'test' && ' [Model Evaluation Mode — Predictions vs Ground Truth]'}
              </span>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                videoMode === 'train' ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
              }`}>
                {videoMode === 'train' ? 'TRAIN' : 'TEST'}
              </span>
            </div>

            {/* Main Grid: Video + Labels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* LEFT: Video Player */}
              <div className="lg:col-span-2 space-y-3">
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                  {/* Video Embed */}
                  <div className="relative">
                    <div className="aspect-video bg-black relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/gvQ7Z6ZCxTc?rel=0&modestbranding=1&autoplay=0"
                        title="Oldboy Hallway Fight Scene — Surveillance Analysis"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full absolute inset-0"
                        style={{ border: 'none' }}
                      />
                      {/* Fallback if embed is blocked */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 -z-10">
                        <Film className="w-12 h-12 text-slate-600 mb-3" />
                        <p className="text-sm text-slate-400 mb-2">If video doesn't load, click below:</p>
                        <a
                          href="https://youtu.be/gvQ7Z6ZCxTc"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Play className="w-4 h-4" /> Watch on YouTube
                        </a>
                        <p className="text-[10px] text-slate-500 mt-2">Oldboy (2003) — Hallway Fight Scene</p>
                      </div>
                    </div>
                    {/* Overlay Info */}
                    <div className="absolute top-2 left-2 flex items-center gap-2 pointer-events-none">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] text-green-400 font-mono bg-black/70 px-2 py-0.5 rounded">
                        CAM-01 | CORRIDOR | {captorInfo.processedResolution}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        videoMode === 'train' ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {videoMode === 'train' ? 'TRAIN' : 'TEST'} VIDEO
                      </span>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="px-4 py-3 bg-slate-800/50 flex items-center gap-4">
                    <button
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (!isPlaying) {
                          setCurrentCaptionIdx(0);
                          setVisibleCaptions(captions.slice(0, 1));
                        }
                      }}
                      className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div className="flex-1">
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${(currentCaptionIdx / (captions.length - 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {captions[currentCaptionIdx]?.timestamp || '00:00'} / 03:30
                    </span>
                    <div className="text-xs text-slate-500 font-mono hidden sm:block">
                      Frame: {captions[currentCaptionIdx]?.frameNum || 0} / 6300
                    </div>
                  </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Actors Tracked', value: '31', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Weapons Detected', value: '20', icon: Swords, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    { label: 'Violence Events', value: '8', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
                    { label: 'Model Accuracy', value: `${modelInfo.accuracy}%`, icon: Target, color: 'text-green-400', bg: 'bg-green-500/10' },
                  ].map((s) => (
                    <div key={s.label} className={`${s.bg} border border-slate-800 rounded-lg p-3 flex items-center gap-3`}>
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                      <div>
                        <p className="text-lg font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-slate-400">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Real-Time Labels Panel */}
              <div className="space-y-3">
                {/* Active Actors */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-indigo-400" />
                      Real-Time Labels
                    </h3>
                    <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">
                      DeepSORT
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                    {actors.slice(0, 12).map((actor) => (
                      <div
                        key={actor.id}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs border ${
                          actor.threatLevel === 'critical'
                            ? 'bg-red-500/10 border-red-500/20'
                            : actor.threatLevel === 'high'
                            ? 'bg-orange-500/10 border-orange-500/20'
                            : actor.threatLevel === 'medium'
                            ? 'bg-yellow-500/10 border-yellow-500/20'
                            : 'bg-slate-800 border-slate-700'
                        }`}
                      >
                        <span className="font-mono text-slate-400 w-16 flex-shrink-0">{actor.id}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-white truncate">{actor.name}</span>
                            {actor.weapon !== 'None' && (
                              <span className="text-[9px] px-1 bg-red-600/30 text-red-300 rounded">
                                {actor.weapon}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 truncate block">{actor.behavior}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${
                          actor.threatLevel === 'critical' ? 'bg-red-600 text-white' :
                          actor.threatLevel === 'high' ? 'bg-orange-600 text-white' :
                          actor.threatLevel === 'medium' ? 'bg-yellow-600 text-white' :
                          'bg-slate-600 text-white'
                        }`}>
                          {actor.threatLevel.toUpperCase()}
                        </span>
                      </div>
                    ))}
                    <div className="text-center py-1">
                      <span className="text-[10px] text-slate-500">
                        + {actors.length - 12} more actors tracked...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weapon Detection */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                    <Crosshair className="w-4 h-4 text-red-400" />
                    Weapons Detected
                  </h3>
                  <div className="space-y-2">
                    {weaponSummary.map((w) => (
                      <div key={w.weapon} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div>
                          <p className="text-xs font-medium text-white">{w.weapon}</p>
                          <p className="text-[10px] text-slate-400">{w.type} • {w.count} holder{w.count > 1 ? 's' : ''}</p>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
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
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Threat Distribution</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Critical', val: threatStats.critical, color: 'bg-red-500', textColor: 'text-red-300' },
                      { label: 'High', val: threatStats.high, color: 'bg-orange-500', textColor: 'text-orange-300' },
                      { label: 'Medium', val: threatStats.medium, color: 'bg-yellow-500', textColor: 'text-yellow-300' },
                      { label: 'Low', val: threatStats.low, color: 'bg-green-500', textColor: 'text-green-300' },
                    ].map((t) => (
                      <div key={t.label} className="bg-slate-800/50 rounded-lg p-2 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${t.color}`} />
                          <span className="text-[10px] text-slate-400">{t.label}</span>
                        </div>
                        <p className={`text-lg font-bold ${t.textColor}`}>{t.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM: Automatic Captions */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  Automatic Captions — Violence Detection Feed
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">
                    {visibleCaptions.length} / {captions.length} captions
                  </span>
                  <button
                    onClick={() => {
                      setVisibleCaptions(captions);
                      setCurrentCaptionIdx(captions.length - 1);
                    }}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Show All
                  </button>
                </div>
              </div>
              <div ref={captionRef} className="space-y-1.5 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                {visibleCaptions.map((cap, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs transition-all ${
                      captionTypeBg[cap.type]
                    } ${i === visibleCaptions.length - 1 ? 'ring-1 ring-indigo-500/50' : ''}`}
                  >
                    <span className="text-slate-500 font-mono w-10 flex-shrink-0 pt-0.5">{cap.timestamp}</span>
                    <span className="text-slate-600 font-mono w-12 flex-shrink-0 pt-0.5">F{String(cap.frameNum).padStart(4, '0')}</span>
                    <span className={`flex-1 leading-relaxed ${captionTypeColor[cap.type]}`}>
                      {cap.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================ */}
        {/* TAB: ACTOR REGISTRY */}
        {/* ================================================ */}
        {activeTab === 'actors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Actor Registry — DeepSORT Tracking</h2>
                <p className="text-sm text-slate-400 mt-1">All {actors.length} actors tracked with consistent IDs across frames</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-red-600/20 text-red-300 px-3 py-1 rounded-full border border-red-600/30">
                  {threatStats.critical} Critical
                </span>
                <span className="text-xs bg-orange-600/20 text-orange-300 px-3 py-1 rounded-full border border-orange-600/30">
                  {threatStats.high} High
                </span>
              </div>
            </div>

            {/* Protagonist Card */}
            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-700/30 p-5">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold">
                  01
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-white">Oh Dae-su</h3>
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">PROTAGONIST</span>
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">CRITICAL THREAT</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">Role: Attacker / Victim — Primary Combatant</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-[10px] text-slate-400">Weapon</p>
                      <p className="text-sm font-semibold text-orange-400">🔨 Claw Hammer</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-[10px] text-slate-400">Behavior</p>
                      <p className="text-sm font-semibold text-red-400">Aggressive / Striking</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-[10px] text-slate-400">Confidence</p>
                      <p className="text-sm font-semibold text-green-400">97%</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2">
                      <p className="text-[10px] text-slate-400">Skeletal Status</p>
                      <p className="text-sm font-semibold text-yellow-400">Fatigue Building</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actors Table */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800/50 border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">ID</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Role</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Label</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Weapon</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Behavior</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Threat</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Confidence</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Bbox</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actors.map((actor) => (
                      <tr key={actor.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-4 font-mono text-indigo-400 text-xs">{actor.id}</td>
                        <td className="py-2.5 px-4 font-medium text-white text-xs">{actor.name}</td>
                        <td className="py-2.5 px-4 text-slate-300 text-xs">{actor.role}</td>
                        <td className="py-2.5 px-4">
                          <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                            {actor.label}
                          </span>
                        </td>
                        <td className="py-2.5 px-4">
                          {actor.weapon !== 'None' ? (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              actor.weaponType === 'edged' ? 'bg-red-600/20 text-red-300' :
                              actor.weaponType === 'blunt' ? 'bg-orange-600/20 text-orange-300' :
                              'bg-slate-700 text-slate-400'
                            }`}>
                              {actor.weapon}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500">Unarmed</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-xs text-slate-300">{actor.behavior}</td>
                        <td className="py-2.5 px-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            actor.threatLevel === 'critical' ? 'bg-red-600 text-white' :
                            actor.threatLevel === 'high' ? 'bg-orange-600 text-white' :
                            actor.threatLevel === 'medium' ? 'bg-yellow-600 text-white' :
                            'bg-green-600 text-white'
                          }`}>
                            {actor.threatLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${actor.confidence * 100}%` }} />
                            </div>
                            <span className="text-[10px] text-slate-400">{(actor.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-[10px] text-slate-500">
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

        {/* ================================================ */}
        {/* TAB: VIOLENCE EVENTS */}
        {/* ================================================ */}
        {activeTab === 'violence' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">Violence Events Timeline</h2>
              <p className="text-sm text-slate-400 mt-1">
                {violenceEvents.length} violence events detected across {captorInfo.duration}
              </p>
            </div>

            {/* Severity Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Critical Events', count: violenceEvents.filter(e => e.severity === 'critical').length, color: 'bg-red-500/10 border-red-500/30 text-red-400' },
                { label: 'High Events', count: violenceEvents.filter(e => e.severity === 'high').length, color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
                { label: 'Medium Events', count: violenceEvents.filter(e => e.severity === 'medium').length, color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
                { label: 'Total Weapons Used', count: 3, color: 'bg-purple-500/10 border-purple-500/30 text-purple-400' },
              ].map((s) => (
                <div key={s.label} className={`rounded-lg p-4 border ${s.color}`}>
                  <p className="text-2xl font-bold">{s.count}</p>
                  <p className="text-xs opacity-80">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {violenceEvents.map((event, idx) => (
                <div key={event.id} className="relative">
                  <div className={`bg-slate-900 rounded-xl border overflow-hidden ${
                    event.severity === 'critical' ? 'border-red-700/40' :
                    event.severity === 'high' ? 'border-orange-700/40' :
                    'border-slate-700'
                  }`}>
                    {/* Event Header */}
                    <div className={`px-5 py-3 flex items-center gap-3 flex-wrap ${
                      event.severity === 'critical' ? 'bg-red-900/20' :
                      event.severity === 'high' ? 'bg-orange-900/20' :
                      'bg-slate-800/30'
                    }`}>
                      <span className="text-white text-xs font-mono bg-slate-700 px-2 py-0.5 rounded">
                        Event #{event.id}
                      </span>
                      <span className="text-white font-semibold text-sm">{event.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        event.severity === 'critical' ? 'bg-red-600 text-white' :
                        event.severity === 'high' ? 'bg-orange-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {event.timestamp}
                        <span className="text-slate-600">|</span>
                        <Film className="w-3 h-3" />
                        {event.frameRange}
                      </div>
                    </div>

                    {/* Event Body */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-sm text-slate-300 leading-relaxed">{event.description}</p>

                      {/* Involved Actors */}
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Involved Actors</p>
                        <div className="flex flex-wrap gap-1.5">
                          {event.involvedActors.map((actorId) => {
                            const actor = actors.find(a => a.id === actorId);
                            return (
                              <span key={actorId} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 font-mono">
                                {actorId} {actor ? `(${actor.name})` : ''}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Weapons */}
                      <div>
                        <p className="text-[10px] text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Weapons Used</p>
                        <div className="flex flex-wrap gap-1.5">
                          {event.weaponsUsed.map((w) => (
                            <span key={w} className="text-[10px] bg-red-900/30 text-red-300 px-2 py-1 rounded border border-red-700/30">
                              ⚔️ {w}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Caption */}
                      <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                        event.severity === 'critical' ? 'bg-red-900/10 border-red-700/20 text-red-300' :
                        event.severity === 'high' ? 'bg-orange-900/10 border-orange-700/20 text-orange-300' :
                        'bg-yellow-900/10 border-yellow-700/20 text-yellow-300'
                      }`}>
                        <p className="text-[10px] text-slate-500 mb-1 font-medium">📝 AUTO-CAPTION:</p>
                        {event.captionText}
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  {idx < violenceEvents.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ChevronRight className="w-5 h-5 text-slate-700 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================ */}
        {/* TAB: PREDICTIONS */}
        {/* ================================================ */}
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">LSTM Next-Move Predictions</h2>
              <p className="text-sm text-slate-400 mt-1">
                Bi-directional LSTM model analyzing skeletal tracking data to predict actor movements
              </p>
            </div>

            {/* Model Info */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-700/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">Prediction Engine</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Model', value: 'Bi-LSTM (3-layer)' },
                  { label: 'Input', value: 'Skeletal Keypoints (33)' },
                  { label: 'Sequence Length', value: '30 frames' },
                  { label: 'Prediction AUC', value: `${modelInfo.violencePredictionAUC}` },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-[10px] text-slate-400">{m.label}</p>
                    <p className="text-sm font-semibold text-purple-300">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictions Cards */}
            <div className="space-y-3">
              {predictions.map((pred, idx) => (
                <div key={idx} className={`bg-slate-900 rounded-xl border overflow-hidden ${
                  pred.riskLevel === 'critical' ? 'border-red-700/40' :
                  pred.riskLevel === 'high' ? 'border-orange-700/40' :
                  'border-slate-700'
                }`}>
                  <div className={`px-5 py-3 flex items-center gap-3 flex-wrap ${
                    pred.riskLevel === 'critical' ? 'bg-red-900/15' :
                    pred.riskLevel === 'high' ? 'bg-orange-900/15' :
                    'bg-slate-800/30'
                  }`}>
                    <span className="text-white font-mono text-xs bg-slate-700 px-2 py-0.5 rounded">
                      ⏱ {pred.timestamp}
                    </span>
                    <span className="text-white font-medium text-sm">{pred.actor}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-auto ${
                      pred.riskLevel === 'critical' ? 'bg-red-600 text-white' :
                      pred.riskLevel === 'high' ? 'bg-orange-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {pred.riskLevel.toUpperCase()} RISK
                    </span>
                    <span className="text-xs text-green-400 font-mono">
                      {(pred.confidence * 100).toFixed(0)}% conf
                    </span>
                  </div>

                  <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Current Action</p>
                      <p className="text-sm text-slate-300">{pred.currentAction}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">⚡ Predicted Next Move</p>
                      <p className="text-sm text-white font-semibold">{pred.predictedNextMove}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">LSTM Output</p>
                      <p className="text-xs text-purple-300 font-mono bg-slate-800/50 rounded p-2">{pred.lstmOutput}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Reasoning</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{pred.reasoning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================ */}
        {/* TAB: ANALYTICS */}
        {/* ================================================ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Analytics & Model Performance</h2>
              <p className="text-sm text-slate-400 mt-1">
                Comprehensive analysis of the Oldboy hallway scene surveillance data
              </p>
            </div>

            {/* Model Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Accuracy', value: `${modelInfo.accuracy}%`, icon: Target, color: 'text-green-400' },
                { label: 'Precision', value: `${modelInfo.precision}%`, icon: Zap, color: 'text-blue-400' },
                { label: 'Recall', value: `${modelInfo.recall}%`, icon: TrendingUp, color: 'text-purple-400' },
                { label: 'F1 Score', value: `${modelInfo.f1Score}%`, icon: BarChart3, color: 'text-indigo-400' },
              ].map((s) => (
                <div key={s.label} className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Violence & Fatigue Over Time */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Violence Score & Fatigue Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesAnalysis}>
                      <defs>
                        <linearGradient id="violGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="fatGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }} />
                      <Area type="monotone" dataKey="violence" stroke="#ef4444" fill="url(#violGrad)" strokeWidth={2} name="Violence Score" />
                      <Area type="monotone" dataKey="fatigue" stroke="#f59e0b" fill="url(#fatGrad)" strokeWidth={2} name="Fatigue Level" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Mob Cohesion vs Active Actors */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Mob Cohesion & Active Actors</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }} />
                      <Line type="monotone" dataKey="mobCohesion" stroke="#8b5cf6" strokeWidth={2} name="Mob Cohesion %" dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="actorsActive" stroke="#06b6d4" strokeWidth={2} name="Active Actors" dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Weapon Distribution */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Weapon Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={weaponTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      >
                        {weaponTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }} />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Behavior Distribution */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Actor Behavior Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={behaviorData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} width={120} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Count">
                        {behaviorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Model Performance Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Model Performance Radar</h3>
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
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748b' }} />
                      <Radar name="Performance" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Threat Over Time */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Threat Level Timeline</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timeSeriesAnalysis}>
                      <defs>
                        <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }} />
                      <Area type="monotone" dataKey="threat" stroke="#dc2626" fill="url(#threatGradient)" strokeWidth={2} name="Threat Level" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================ */}
        {/* TAB: ABOUT */}
        {/* ================================================ */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-bold text-white">About This Project</h2>
              <p className="text-sm text-slate-400 mt-1">
                Final Year B.Tech Thesis — Video Surveillance Predictive Analysis
              </p>
            </div>

            {/* Core Objective */}
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-700/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Core Objective</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Predict human activity and violence in surveillance data using <strong className="text-white">Computer Vision (CV)</strong> and <strong className="text-white">Artificial Intelligence (AI)</strong>. 
                The system processes video feeds in real-time to detect, track, label, and predict mob violence scenarios 
                before they escalate into dangerous situations.
              </p>
            </div>

            {/* Case Study */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">Primary Dataset Case Study</h3>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700">
                <h4 className="font-bold text-white text-lg">Oldboy (2003) — Hallway Fight Scene</h4>
                <p className="text-sm text-slate-400 mt-1">Director: Park Chan-wook | Cinematographer: Chung Chung-hoon</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Setting', value: 'Narrow corridor/hallway — one-take side-view shot', icon: MapPin },
                  { label: 'Scale', value: '1 Protagonist (Oh Dae-su) vs. ~30 Opponents', icon: Users },
                  { label: 'Capture Type', value: captorInfo.captureType, icon: Camera },
                  { label: 'Duration', value: captorInfo.duration, icon: Clock },
                  { label: 'Total Frames', value: captorInfo.totalFrames, icon: Layers },
                  { label: 'Processing FPS', value: captorInfo.fps + ' fps', icon: Monitor },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <item.icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Pipeline */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Technical Pipeline</h3>
              </div>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Person Detection', desc: 'YOLOv8x detects all persons in each frame with bounding boxes.', tech: 'YOLOv8x' },
                  { step: '2', title: 'Multi-Object Tracking', desc: 'DeepSORT assigns consistent IDs (ACTOR-01 through ACTOR-31) across frames.', tech: 'DeepSORT' },
                  { step: '3', title: 'Skeletal Pose Estimation', desc: 'MediaPipe extracts 33 skeletal keypoints per actor for pose analysis.', tech: 'MediaPipe' },
                  { step: '4', title: 'Weapon Detection', desc: 'Custom-trained YOLOv8 model detects weapons (hammer, sticks, knives).', tech: 'YOLOv8-custom' },
                  { step: '5', title: 'Action Recognition', desc: 'Real-time behavior labeling: Striking, Defensive, Fleeing, etc.', tech: 'CNN + LSTM' },
                  { step: '6', title: 'Violence Classification', desc: 'Classify violence events by type and severity. Generate captions.', tech: 'CNN + Temporal' },
                  { step: '7', title: 'Next-Move Prediction', desc: 'Bi-directional LSTM predicts next moves based on skeletal tracking history.', tech: 'Bi-LSTM (3-layer)' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center flex-shrink-0 border border-indigo-600/40">
                      <span className="text-xs font-bold text-indigo-300">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <span className="text-[9px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-mono">{item.tech}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weapons Reference */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Weapons Detected in Scene</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Weapon</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Type</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Count</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Danger Level</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weaponSummary.map((w) => (
                      <tr key={w.weapon} className="border-b border-slate-800">
                        <td className="py-3 px-4 font-medium text-white">{w.weapon}</td>
                        <td className="py-3 px-4 text-slate-300">{w.type}</td>
                        <td className="py-3 px-4 text-slate-300">{w.count}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            w.dangerLevel === 'Critical' ? 'bg-red-600 text-white' :
                            w.dangerLevel === 'High' ? 'bg-orange-600 text-white' :
                            'bg-yellow-600 text-white'
                          }`}>{w.dangerLevel}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-400">{w.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Python', 'PyTorch', 'YOLOv8', 'DeepSORT', 'LSTM', 'MediaPipe',
                  'OpenCV', 'TensorFlow', 'CNN', 'React', 'Tailwind CSS', 'Vite',
                  'NumPy', 'Pandas', 'Matplotlib', 'CUDA', 'FFmpeg', 'Scikit-learn'
                ].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 px-4 py-4 mt-8">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © 2024 B.Tech Final Year Thesis — Prediction of Mob Violence Scene Using Surveillance Data
          </p>
          <p className="text-xs text-slate-500">
            {modelInfo.name} | {modelInfo.framework}
          </p>
        </div>
      </footer>
    </div>
  );
}
