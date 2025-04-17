import { motion } from 'framer-motion'
const OrderLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <motion.div className="w-16 h-16 border-8 border-amazonOrangeDark rounded-full border-t-transparent"
        animate={{rotate:360}}
        transition={{duration:1,repeat:Infinity,ease:'linear'}}

        >
            
        </motion.div>
    </div>
  )
}

export default OrderLoader