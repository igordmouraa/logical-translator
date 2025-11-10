'use client'

import {motion} from 'framer-motion';
import {IoMdHeart} from 'react-icons/io';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="h-24 w-full flex items-center justify-center bg-gradient-to-r from-gray-950 via-purple-950 to-gray-950 bg-gradient-animated"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.5}}
            viewport={{once: true}}
        >
            <div className="flex flex-col items-center gap-2 text-xs sm:text-sm font-mono text-gray-400">
                <div className="flex items-center gap-1.5">
                    <span>Feito com</span>
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            transition: {duration: 2.5, repeat: Infinity, ease: 'easeInOut'}
                        }}
                    >
                        <IoMdHeart size={14} className="text-primary"/>
                    </motion.div>
                    <span>por</span>
                    <a
                        href="https://github.com/igordmouraa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-300 hover:text-primary transition-colors"
                    >
                        Igor Moura
                    </a>
                </div>
                <span>© {currentYear} Todos os direitos reservados.</span>
            </div>
        </motion.footer>
    )
}