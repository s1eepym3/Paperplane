'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Invitation, InvitationScene } from '../types';
import { GreetingScene } from './GreetingScene';
import { QuestionScene } from './QuestionScene';
import { CelebrationScene } from './CelebrationScene';
import { EnvelopeScene } from './EnvelopeScene';
import { DatePlanScene } from './DatePlanScene';
import { AmbientSky } from './AmbientSky';
import { useTilt } from './motion/useTilt';
import { HeartTrailLayer } from './motion/HeartTrailLayer';
import { PaperplaneMascot } from './motion/PaperplaneMascot';

export function InvitationExperience({ invitation }: { invitation: Invitation }) {
  const [scene, setScene] = useState<InvitationScene>('greeting');
  const { rotateX, rotateY } = useTilt();

  async function acceptInvitation() {
    try {
      await fetch(`/api/invitations/${invitation.token}/accept`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to persist invitation acceptance:', error);
    }

    setScene('celebration');
    window.setTimeout(() => setScene('envelope'), 1800);
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 isolate"
      style={{ isolation: 'isolate' }}
    >
      {/* Living Sky Ambient Background Layer (z-0) */}
      <div className="z-0">
        <AmbientSky scene={scene} />
      </div>

      {/* Story Card & Mascot Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Main Story Card (Preserving overflow-hidden for button physics & crisp WebKit clipping) */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          }}
          className="relative z-10 w-full overflow-hidden rounded-[2rem] border border-stone-300/70 bg-paper/90 p-6 shadow-lift backdrop-blur-md md:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sunset-peach/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-accent-rose/25 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={scene}
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              {scene === 'greeting' && <GreetingScene invitation={invitation} onOpen={() => setScene('question')} />}
              {scene === 'question' && <QuestionScene invitation={invitation} onAccept={acceptInvitation} />}
              {scene === 'celebration' && <CelebrationScene receiverName={invitation.receiverName} />}
              {scene === 'envelope' && <EnvelopeScene onOpen={() => setScene('plan')} />}
              {scene === 'plan' && <DatePlanScene invitation={invitation} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Choreographed Paperplane Mascot Layer (z-30: sibling rendered AFTER the card in DOM) */}
        <AnimatePresence mode="wait">
          <PaperplaneMascot key={scene} scene={scene} />
        </AnimatePresence>
      </div>

      {/* Global tap/pointerdown heart trail layer (z-50) */}
      <HeartTrailLayer />
    </main>
  );
}



