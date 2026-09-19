import { motion } from 'framer-motion';
import { Eye, Users } from 'lucide-react';
import { useViewTracker } from '../hooks/useViewTracker';

export const LiveViewPill = () => {
  const { views, liveViewers, isUpdating } = useViewTracker();

  return (
    <div
      title={`Live View Tracker: ${views.toLocaleString()} Total Impressions · ${liveViewers} Active Viewers Online`}
      className="flex items-center gap-2.5 px-3 py-1.5 bg-surface/90 border border-border-subtle rounded-full font-code text-[11px] text-text-muted hover:border-accent-cyan/50 transition-all shadow-sm"
    >
      <div className="flex items-center gap-1 text-text-primary">
        <Eye className={`w-3.5 h-3.5 text-accent-cyan ${isUpdating ? 'animate-bounce' : ''}`} />
        <motion.span
          key={views}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-text-primary"
        >
          {views.toLocaleString()}
        </motion.span>
        <span className="text-[10px] text-text-muted hidden sm:inline">views</span>
      </div>

      <span className="w-1 h-1 rounded-full bg-border-subtle" />

      <div className="flex items-center gap-1.5 text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="font-semibold text-[10px]">{liveViewers} online</span>
      </div>
    </div>
  );
};

export const LiveViewTelemetryCard = () => {
  const { views, liveViewers } = useViewTracker();

  return (
    <div className="p-4 bg-obsidian/70 rounded-xl border border-border-subtle/70 flex items-center justify-between font-code text-xs">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-surface rounded-lg border border-border-subtle text-accent-cyan">
          <Eye className="w-4 h-4" />
        </div>
        <div>
          <span className="text-text-muted text-[11px] block">Live Profile Telemetry</span>
          <span className="text-text-primary font-bold">{views.toLocaleString()} Total Impressions</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px]">
        <Users className="w-3 h-3" />
        <span className="font-bold">{liveViewers} active now</span>
      </div>
    </div>
  );
};
