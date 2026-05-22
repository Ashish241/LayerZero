import React, { useState } from 'react';
import { RfceItem, EventItem } from '../types';
import { MessageSquare, ThumbsUp, ThumbsDown, Award, Calendar, HelpCircle, Users, CheckCircle2, ChevronRight, MapPin, Video, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommunityViewProps {
  theme: 'dark' | 'light';
  openGrantModal: () => void;
}

const INITIAL_RFCES: RfceItem[] = [
  {
    id: 'rfce-12',
    title: 'Dynamic Validation Model for high-frequency chains',
    status: 'In Review',
    votesUp: 142,
    votesDown: 8,
    description: 'Pitching lightweight validator checkpoint sequences optimized for L3 application nets to minimize routing gas overhead.'
  },
  {
    id: 'rfce-14',
    title: 'Standardizing cross-chain payload compressions',
    status: 'Draft',
    votesUp: 98,
    votesDown: 3,
    description: 'Proposing standard compression formats for byte message structures passed between EVM endpoints to save ~24% gas overhead.'
  }
];

const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    month: 'JUN',
    day: '14',
    title: 'Omnichain Security Framework Deepdive',
    location: 'Discord Developer Stage',
    type: 'videocam',
    registered: false
  },
  {
    id: 'ev-2',
    month: 'JUL',
    day: '02',
    title: 'LayerZero Tokyo Hacker Space meetup',
    location: 'Shibuya Center Arcade, Tokyo',
    type: 'location_on',
    registered: true
  }
];

export default function CommunityView({ theme, openGrantModal }: CommunityViewProps) {
  const [rfcs, setRfcs] = useState<RfceItem[]>(INITIAL_RFCES);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [activeDiscussionRfc, setActiveDiscussionRfc] = useState<string | null>('rfce-12');
  
  // Dynamic comments state
  const [comments, setComments] = useState<Record<string, { author: string; text: string; time: string }[]>>({
    'rfce-12': [
      { author: 'LambdaNinja', text: 'Integrating modular checkpoint periods on L3 nets makes a lot of sense.', time: '2 hours ago' },
      { author: 'ContractDev7', text: 'Will this dynamic model guarantee transaction settlement instantly?', time: '40 mins ago' }
    ],
    'rfce-14': [
      { author: 'ByteDoctor', text: 'A compression protocol is exactly what we need to minimize mainnet relay expenses.', time: '1 day ago' }
    ]
  });
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleVote = (rfcId: string, direction: 'up' | 'down') => {
    setRfcs(prev => prev.map(rfc => {
      if (rfc.id === rfcId) {
        let upDiff = 0;
        let downDiff = 0;

        if (rfc.userVote === direction) {
          // Undo vote
          if (direction === 'up') upDiff = -1;
          else downDiff = -1;
          return { ...rfc, userVote: undefined, votesUp: rfc.votesUp + upDiff, votesDown: rfc.votesDown + downDiff };
        } else {
          // Switch or add vote
          if (direction === 'up') {
            upDiff = 1;
            if (rfc.userVote === 'down') downDiff = -1;
          } else {
            downDiff = 1;
            if (rfc.userVote === 'up') upDiff = -1;
          }
          return { ...rfc, userVote: direction, votesUp: rfc.votesUp + upDiff, votesDown: rfc.votesDown + downDiff };
        }
      }
      return rfc;
    }));
  };

  const handleToggleRsvp = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return { ...ev, registered: !ev.registered };
      }
      return ev;
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDiscussionRfc || !commentAuthor.trim() || !commentText.trim()) return;

    const newComment = {
      author: commentAuthor.trim(),
      text: commentText.trim(),
      time: 'Just now'
    };

    setComments(prev => ({
      ...prev,
      [activeDiscussionRfc]: [...(prev[activeDiscussionRfc] || []), newComment]
    }));

    setCommentAuthor('');
    setCommentText('');
  };

  // Styling selectors
  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-950';
  const subtextColor = theme === 'dark' ? 'text-gray-400' : 'text-zinc-650';
  const sectionBg = theme === 'dark' ? 'bg-dark-surface' : 'bg-white';
  const borderCol = theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest';
  const innerBg = theme === 'dark' ? 'bg-dark-surface-lowest' : 'bg-[#fbfaf7]';
  const innerBorder = theme === 'dark' ? 'border-dark-surface-highest/40' : 'border-light-surface-lowest';
  const inputClass = theme === 'dark' 
    ? 'bg-dark-surface-lowest border-dark-surface-highest text-white focus:ring-brand-primary' 
    : 'bg-[#fbfaf7] border-light-surface-lowest text-zinc-900 focus:ring-brand-primary';

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header & Quick Accelerator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Intro context */}
        <div className={`p-6 sm:p-8 rounded-xl border lg:col-span-2 flex flex-col justify-between ${sectionBg} ${borderCol}`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-brand-secondary w-5 h-5 animate-pulse" />
              <h2 className={`text-xl font-extrabold font-headline tracking-tight ${textColor}`}>
                Decentralized Governance & Hub
              </h2>
            </div>
            <p className={`text-sm leading-relaxed mb-6 ${subtextColor}`}>
              LayerZero is maintained by thousands of developers, researchers, and validator nodes worldwide. Our public RFC voting portal gives anyone the opportunity to pitch architectural adjustments, coordinate integrations, and request program funds.
            </p>
          </div>

          <div className={`flex flex-wrap gap-4 pt-4 border-t ${theme === 'dark' ? 'border-dark-surface-highest/40' : 'border-light-surface-lowest'}`}>
            <div className={`flex items-center gap-1.5 text-xs font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-zinc-600'}`}>
              <Users className="w-4 h-4 text-brand-secondary" /> <strong className={theme === 'dark' ? 'text-white' : 'text-zinc-950'}>4.2k</strong> Dev Node Operators
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-zinc-600'}`}>
              <MessageSquare className="w-4 h-4 text-brand-primary" /> <strong className={theme === 'dark' ? 'text-white' : 'text-zinc-950'}>184</strong> active proposals
            </div>
          </div>
        </div>

        {/* Foundation Grants CTA Block */}
        <div className={`p-6 rounded-xl border flex flex-col justify-between relative overflow-hidden ${sectionBg} ${borderCol}`}>
          {/* Subtle neon bloom detail */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-secondary/5 blur-2xl rounded-full" />
          
          <div>
            <span className="p-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 mb-3 inline-block border border-brand-secondary/20">
              GRANTS PROGRAM
            </span>
            <h4 className={`font-bold font-headline text-base mb-2 ${textColor}`}>LayerZero Accelerator</h4>
            <p className={`text-xs leading-relaxed mb-6 ${subtextColor}`}>
              We match, secure, and accelerate proposals that provide core infrastructure utilities or telemetry analyzers. Submit specs for instant consideration.
            </p>
          </div>

          <button
            onClick={openGrantModal}
            className="w-full bg-brand-secondary text-black font-extrabold font-mono py-2.5 px-4 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-secondary/95 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" /> Apply for Foundation Funding
          </button>
        </div>

      </div>

      {/* 2. Main content block: Left: Vote / Comment RFCs, Right: RSVP Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Requests for Comment (RFCE) Portal */}
        <div className={`p-6 rounded-xl border lg:col-span-2 space-y-6 ${sectionBg} ${borderCol}`}>
          <div className={`flex items-center justify-between border-b pb-4 ${theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest'}`}>
            <h3 className={`font-extrabold font-headline text-md ${textColor}`}>
              Active Community RFC Voting
            </h3>
            <span className="text-xs font-mono text-gray-400">Submit Vote directly below</span>
          </div>

          <div className="space-y-4">
            {rfcs.map(rfc => {
              const activeDisc = activeDiscussionRfc === rfc.id;
              return (
                <div 
                  key={rfc.id}
                  className={`p-5 rounded-lg border transition-all ${
                    activeDisc 
                      ? 'border-brand-primary/30 bg-black/15 shadow-inner' 
                      : theme === 'dark' ? 'border-dark-surface-highest/60' : 'border-light-surface-lowest'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="p-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-mono tracking-wider uppercase font-bold px-2 mb-1 inline-block">
                        {rfc.id} • {rfc.status}
                      </span>
                      <h4 className={`font-headline font-bold text-sm leading-tight ${textColor}`}>{rfc.title}</h4>
                    </div>

                    {/* Interactive vote counters */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleVote(rfc.id, 'up')}
                        className={`flex items-center gap-1.5 py-1 px-3 rounded-full border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                          rfc.userVote === 'up'
                            ? 'bg-brand-secondary text-black border-brand-secondary font-extrabold'
                            : theme === 'dark' ? 'border-dark-surface-highest/80 text-gray-400 hover:text-white' : 'border-light-surface-lowest text-zinc-650 hover:text-zinc-950'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {rfc.votesUp}
                      </button>

                      <button
                        onClick={() => handleVote(rfc.id, 'down')}
                        className={`flex items-center gap-1.5 py-1 px-3 rounded-full border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                          rfc.userVote === 'down'
                            ? 'bg-brand-primary text-black border-brand-primary font-extrabold'
                            : theme === 'dark' ? 'border-dark-surface-highest/80 text-gray-400 hover:text-white' : 'border-light-surface-lowest text-zinc-650 hover:text-zinc-950'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        {rfc.votesDown}
                      </button>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 ${subtextColor}`}>{rfc.description}</p>
                  
                  <div className={`flex items-center justify-between border-t pt-3 ${theme === 'dark' ? 'border-dark-surface-highest/40' : 'border-light-surface-lowest'}`}>
                    <button
                      onClick={() => setActiveDiscussionRfc(rfc.id)}
                      className={`text-xs font-mono font-semibold flex items-center gap-1.5 transition-all text-brand-primary hover:neon-glow-primary cursor-pointer`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> 
                      Discussion Logs ({comments[rfc.id]?.length || 0})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connected comments panel */}
          {activeDiscussionRfc && (
            <div className="border-t border-gray-500/10 pt-6 space-y-4">
              <h4 className={`font-bold font-headline text-xs tracking-wider uppercase text-gray-400`}>
                Discussions: {activeDiscussionRfc}
              </h4>

              <div className="space-y-3 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                {comments[activeDiscussionRfc]?.map((comment, index) => (
                  <div key={index} className={`p-3 rounded border-l-2 border-brand-primary text-xs font-mono space-y-1 ${innerBg} ${innerBorder}`}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-brand-secondary font-bold">@{comment.author}</span>
                      <span className="text-gray-500">{comment.time}</span>
                    </div>
                    <p className={subtextColor}>{comment.text}</p>
                  </div>
                ))}
              </div>              {/* Form to submit comment inline */}
              <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  required
                  type="text"
                  placeholder="Author tag"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-brand-primary border focus:outline-none placeholder-gray-500 font-mono sm:w-1/4 ${inputClass}`}
                />
                <input
                  required
                  type="text"
                  placeholder="Add your input to the RFC dockets..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-brand-primary border focus:outline-none placeholder-gray-500 font-mono flex-1 ${inputClass}`}
                />
                <button
                  type="submit"
                  disabled={!commentAuthor.trim() || !commentText.trim()}
                  className="bg-brand-primary hover:bg-brand-primary/95 text-black font-extrabold rounded-full text-xs py-2 px-4 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shrink-0 font-mono"
                >
                  <Send className="w-3.5 h-3.5" /> Submit
                </button>
              </form>
            </div>
          )}
        </div>

        {/* DevOps Upcoming Events (Interactive RSVPs) */}
        <div className={`p-6 rounded-xl border flex flex-col justify-between ${sectionBg} ${borderCol}`}>
          
          <div>
            <div className={`flex items-center gap-2 border-b pb-4 mb-5 ${theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest'}`}>
              <Calendar className="text-brand-primary w-5 h-5 animate-pulse" />
              <h3 className={`font-extrabold font-headline text-md ${textColor}`}>
                DevOps Events
              </h3>
            </div>

            <div className="space-y-4">
              {events.map(ev => (
                <div key={ev.id} className={`flex gap-4 items-start border-b pb-4 last:border-none ${theme === 'dark' ? 'border-zinc-800/10' : 'border-zinc-200/50'}`}>
                  {/* Calendar block */}
                  <div className={`flex flex-col items-center justify-center w-12 h-12 rounded border ${innerBg} ${innerBorder}`}>
                    <span className="text-[9px] font-mono text-gray-500 font-bold tracking-wider">{ev.month}</span>
                    <span className="text-sm font-bold font-headline text-brand-primary leading-tight">{ev.day}</span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className={`text-xs font-bold font-headline leading-tight truncate ${textColor}`}>{ev.title}</h4>
                    
                    <div className="flex items-center gap-1 text-[10px] font-mono text-gray-450">
                      {ev.type === 'videocam' ? <Video className="w-3.5 h-3.5 text-sky-400" /> : <MapPin className="w-3.5 h-3.5 text-brand-secondary" />}
                      <span className="truncate">{ev.location}</span>
                    </div>

                    <button
                      onClick={() => handleToggleRsvp(ev.id)}
                      className={`text-[10px] font-mono font-bold tracking-wider block transition-colors cursor-pointer capitalize ${
                        ev.registered 
                          ? 'text-brand-secondary neon-glow-secondary font-extrabold' 
                          : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-zinc-650 hover:text-zinc-950'
                      }`}
                    >
                      {ev.registered ? '✔ RSVP CONFIRMED' : '+ RSVP FOR EVENT'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg border mt-6 ${innerBorder} ${innerBg}`}>
            <h4 className={`font-bold font-headline text-xs mb-1.5 flex items-center gap-1 ${textColor}`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" /> Active RSVP Status
            </h4>
            <p className="text-[10px] text-gray-450 font-mono leading-relaxed">
              Confirmed RSVPs receive secure calendar invites and cryptographically signed check-in credentials for exclusive hacker perks.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
