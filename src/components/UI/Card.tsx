import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaChevronRight, FaTerminal } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    tags?: string[];
}

const Card: React.FC<CardProps> = ({ title, description, image, link, tags }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative h-[320px] w-64 rounded-[1.5rem] glass p-[1px] shadow-3xl transition-all duration-500 hover:shadow-warning/10 cursor-pointer overflow-hidden border border-theme group"
        >
            <Link to={link} className="block w-full h-full">
                <div
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                    className="absolute inset-0 bg-page/40 overflow-hidden"
                >
                    {/* Background Image Layer */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <motion.img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-page via-page/80 to-transparent" />
                    </div>

                    {/* Content Layer */}
                    <div
                        style={{
                            transform: "translateZ(40px)",
                        }}
                        className="relative z-10 p-4 flex flex-col h-full justify-end"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-wrap gap-2">
                                {tags?.map(tag => (
                                    <span key={tag} className="text-[9px] font-black px-3 py-1 glass text-muted rounded-full uppercase tracking-widest backdrop-blur-xl">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="text-warning/20 group-hover:text-warning transition-colors duration-500">
                                <FaTerminal />
                            </div>
                        </div>

                        <h3 className="text-lg font-black mb-1.5 leading-none tracking-tighter uppercase italic group-hover:text-warning transition-colors duration-500">
                            {title}
                        </h3>

                        <p className="text-muted text-[11px] font-medium line-clamp-2 mb-4 group-hover:text-inherit transition-colors duration-500">
                            {description}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black text-muted uppercase tracking-[0.3em]">
                                Status: Active
                            </span>
                            <div className="flex items-center gap-2 text-warning text-[10px] font-black uppercase tracking-widest bg-warning/10 px-3 py-1.5 rounded-full border border-warning/20">
                                View Case <FaChevronRight size={8} />
                            </div>
                        </div>
                    </div>

                    {/* Technical HUD Overlays */}
                    <div className="absolute top-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="w-6 h-[1px] bg-warning/50 mb-1" />
                        <div className="w-3 h-[1px] bg-warning/30" />
                    </div>
                    <div className="absolute top-4 right-4 text-[7px] font-black text-muted uppercase tracking-[0.4em] pointer-events-none">
                        [ DATA_SCAN ]
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Card;
