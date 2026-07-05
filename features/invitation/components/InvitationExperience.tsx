'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Invitation, InvitationScene } from '../types';
import { GreetingScene } from './GreetingScene';
import { QuestionScene } from './QuestionScene';
import { CelebrationScene } from './CelebrationScene';
import { EnvelopeScene } from './EnvelopeScene';
import { DatePlanScene } from './DatePlanScene';

export function InvitationExperience({ invitation }: { invitation: Invitation }) {
  const [scene, setScene] = useState<InvitationScene>('greeting');

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
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border-2 border-ink bg-white p-6 shadow-brutalInkLg md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-roseSoft/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-linen blur-3xl" />

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
      </div>
    </main>
  );
}
