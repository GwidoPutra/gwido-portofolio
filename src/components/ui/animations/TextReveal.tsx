import { motion } from 'framer-motion';

export function TextReveal({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
