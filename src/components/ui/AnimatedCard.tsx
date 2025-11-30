import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

const AnimatedCard = ({ children, className }: AnimatedCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={cn("p-6 h-full border-0 bg-gradient-to-br from-card/50 to-card shadow-xl hover:shadow-2xl transition-shadow", className)}>
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
