import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Masked word-by-word reveal: each word sits in an overflow-hidden box and
 * slides up from below, so the line wipes in rather than fading.
 *
 * The in-view check lives on the un-clipped root, not on the words. A word
 * starts fully outside its own mask, so its clipped intersection area is zero
 * and an observer attached to it would never fire — it could never reveal
 * itself. Watching the root and driving the words through variants avoids that.
 */
export default function Reveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.85,
  once = true,
}) {
  const words = String(text).split(' ')
  const MotionTag = motion[Tag] ?? motion.span

  const container = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  }

  const word = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration, ease: EASE } },
  }

  return (
    <MotionTag
      className={`reveal ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
    >
      {words.map((w, i) => (
        <span className="reveal__mask" key={`${w}-${i}`}>
          <motion.span className="reveal__word" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
