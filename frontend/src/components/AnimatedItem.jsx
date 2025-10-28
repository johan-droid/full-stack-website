import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const AnimatedItem = ({ children, delay = 0 }) => {
  const ref = useRef(null)

  // Set triggerOnce: true so it only animates once
  // amount: 0.5 means it will consider in view when 50% is visible
  const inView = useInView(ref, { amount: 0.5, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedItem
