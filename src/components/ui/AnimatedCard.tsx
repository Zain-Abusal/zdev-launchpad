import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AnimatedCard = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof motion.div>, 'ref'> & AnimatedCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative rounded-2xl bg-gradient-to-br from-white/80 to-muted/40 dark:from-card dark:to-muted/30 border border-border shadow-lg overflow-hidden backdrop-blur-lg group transition-all duration-300',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="400" height="400" rx="32" fill="url(#cardGradient)" fillOpacity="0.08" />
          <defs>
            <linearGradient id="cardGradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#fca5a5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 p-8">{children}</div>
    </motion.div>
  );
};

export default AnimatedCard;
