import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaTags, FaBook, FaClock, FaChevronLeft, FaChevronRight, FaCopy, FaCheckCircle, FaInfoCircle, FaTerminal } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getProcedureById, procedures } from '../../data/procedures';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

const ProcedureDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const procedure = getProcedureById(id || '');
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [copied, setCopied] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (procedure) {
            // Generate TOC from markdown headings
            const headings = procedure.content.match(/^#{1,3}\s+.+$/gm) || [];
            const items = headings.map((heading, index) => {
                const level = heading.match(/^#+/)?.[0].length || 1;
                const text = heading.replace(/^#+\s+/, '');
                const id = `heading-${index}`;
                return { id, text, level };
            });
            setTocItems(items);
        }
    }, [procedure]);

    const handleCopy = (code: string, blockId: string) => {
        navigator.clipboard.writeText(code);
        setCopied(blockId);
        setTimeout(() => setCopied(null), 2000);
    };

    if (!procedure) {
        return (
            <div className="min-h-screen bg-page flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-[2rem] p-12 text-center max-w-md"
                >
                    <div className="text-6xl text-muted/20 mb-4 flex justify-center">
                        <FaBook />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Procédure non trouvée</h2>
                    <p className="text-muted mb-8">Cette procédure n'existe pas ou a été supprimée.</p>
                    <button
                        onClick={() => navigate('/procedures')}
                        className="px-6 py-3 rounded-xl bg-warning text-bg font-black text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all"
                    >
                        Retour aux procédures
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentIndex = procedures.findIndex(p => p.id === procedure.id);
    const prevProcedure = currentIndex > 0 ? procedures[currentIndex - 1] : null;
    const nextProcedure = currentIndex < procedures.length - 1 ? procedures[currentIndex + 1] : null;

    const getCategoryColor = (category: string) => {
        const colors: Record<string, { gradient: string; glow: string; bg: string; border: string }> = {
            'Réseau': { gradient: 'from-blue-500 to-cyan-500', glow: 'rgba(59, 130, 246, 0.3)', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
            'Système': { gradient: 'from-green-500 to-emerald-500', glow: 'rgba(34, 197, 94, 0.3)', bg: 'bg-green-500/10', border: 'border-green-500/30' },
            'Développement': { gradient: 'from-purple-500 to-pink-500', glow: 'rgba(168, 85, 247, 0.3)', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
            'Sécurité': { gradient: 'from-red-500 to-orange-500', glow: 'rgba(239, 68, 68, 0.3)', bg: 'bg-red-500/10', border: 'border-red-500/30' },
            'Base de données': { gradient: 'from-yellow-500 to-amber-500', glow: 'rgba(234, 179, 8, 0.3)', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
        };
        return colors[category] || { gradient: 'from-warning to-orange-500', glow: 'rgba(251, 191, 36, 0.3)', bg: 'bg-warning/10', border: 'border-warning/30' };
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Réseau': '🌐',
            'Système': '⚙️',
            'Développement': '💻',
            'Sécurité': '🔒',
            'Base de données': '🗄️',
        };
        return icons[category] || '📋';
    };

    const categoryStyle = getCategoryColor(procedure.category);

    return (
        <div className="pt-20 pb-24 px-4 min-h-screen bg-page relative overflow-hidden">
            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
                    >
                        <motion.img
                            src={selectedImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
                            alt="Full screen view"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated background effects */}
            <div
                className="absolute inset-0 z-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, var(--color-text-muted) 0.5px, transparent 0.5px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <motion.div
                animate={{
                    top: ["0%", "100%"],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] z-[1] pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, transparent, ${categoryStyle.glow}, transparent)`,
                    boxShadow: `0 0 20px ${categoryStyle.glow}`
                }}
            />

            <div className="container mx-auto max-w-[1600px] relative z-10">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate('/procedures')}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl glass hover:border-warning/50 text-muted hover:text-inherit transition-all group shadow-lg"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-sm">Retour aux procédures</span>
                    </button>
                </motion.div>

                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-[2rem] overflow-hidden shadow-2xl mb-8 relative"
                >
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${categoryStyle.gradient}`} style={{ boxShadow: `0 0 20px ${categoryStyle.glow}` }} />

                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <motion.div
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${categoryStyle.gradient} text-white text-sm font-black uppercase tracking-wider shadow-lg`}
                                whileHover={{ scale: 1.05 }}
                                style={{ boxShadow: `0 4px 20px ${categoryStyle.glow}` }}
                            >
                                <span className="text-lg">{getCategoryIcon(procedure.category)}</span>
                                {procedure.category}
                            </motion.div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                                <FaClock className="text-warning" />
                                <span className="text-xs text-muted">Màj: {new Date(procedure.lastUpdated).toLocaleDateString('fr-FR')}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                            {procedure.title}
                        </h1>

                        <p className="text-muted text-xl leading-relaxed mb-8 max-w-4xl">
                            {procedure.description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4">
                            <div className={`px-5 py-3 rounded-xl ${categoryStyle.bg} border ${categoryStyle.border} backdrop-blur`}>
                                <div className="flex items-center gap-3">
                                    <FaCalendar className="text-warning text-xl" />
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-muted font-bold">Créé</div>
                                        <div className="font-bold text-sm">{new Date(procedure.createdDate).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`px-5 py-3 rounded-xl ${categoryStyle.bg} border ${categoryStyle.border} backdrop-blur`}>
                                <div className="flex items-center gap-3">
                                    <FaTags className="text-warning text-xl" />
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-muted font-bold">Tags</div>
                                        <div className="font-bold text-sm">{procedure.tags.length} tags</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-6">
                            {procedure.tags.map((tag, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.08, y: -2 }}
                                    className={`px-4 py-2 rounded-lg ${categoryStyle.bg} border ${categoryStyle.border} text-xs font-bold uppercase tracking-wide hover:shadow-lg transition-all cursor-default`}
                                >
                                    #{tag.toLowerCase().replace(/\s+/g, '-')}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>



                {/* Main Content - Centered & Simple */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="container mx-auto"
                >
                    <div className="glass rounded-[1.5rem] overflow-hidden shadow-2xl p-8 md:p-10">
                        <div className="prose prose-invert prose-base max-w-none columns-1 xl:columns-2 gap-16 space-y-0
                xl:[column-rule:1px_solid_var(--rule-color)]
                [&>*:first-child]:mt-0
                [&>h1]:break-inside-avoid-column [&>h1]:break-after-avoid
                [&>h2]:break-inside-avoid-column [&>h2]:break-after-avoid
                [&>h3]:break-inside-avoid-column [&>h3]:break-after-avoid
                [&>p]:break-inside-avoid-column
                [&>ul]:break-inside-avoid-column
                [&>ol]:break-inside-avoid-column
                [&>blockquote]:break-inside-avoid-column
                [&>figure]:break-inside-avoid-column
                [&>pre]:break-inside-avoid-column
                [&>div]:break-inside-avoid-column
                prose-headings:font-black prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b-2 prose-h1:border-warning/30
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/20
                prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-warning
                prose-p:text-muted prose-p:leading-snug prose-p:mb-3 prose-p:text-sm
                prose-li:text-muted prose-li:leading-snug prose-li:my-1 prose-li:text-sm
                prose-strong:text-inherit prose-strong:font-black prose-strong:text-warning
                prose-code:text-warning prose-code:bg-warning/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono prose-code:border prose-code:border-warning/20
                prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
                prose-a:text-warning prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-warning prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted/90 prose-blockquote:bg-warning/5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                prose-ul:my-2 prose-ol:my-2
              " style={{ '--rule-color': categoryStyle.glow } as any}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ children, ...props }) => {
                                        const index = tocItems.findIndex(item => item.text === String(children));
                                        return <h1 id={tocItems[index]?.id} {...props}>{children}</h1>;
                                    },
                                    h2: ({ children, ...props }) => {
                                        const index = tocItems.findIndex(item => item.text === String(children));
                                        return (
                                            <h2 id={tocItems[index]?.id} {...props}>
                                                <span className="inline-flex items-center gap-3">
                                                    <span className={`w-8 h-1 rounded-full bg-gradient-to-r ${categoryStyle.gradient}`} />
                                                    {children}
                                                </span>
                                            </h2>
                                        );
                                    },
                                    h3: ({ children, ...props }) => {
                                        const index = tocItems.findIndex(item => item.text === String(children));
                                        return <h3 id={tocItems[index]?.id} {...props}>→ {children}</h3>;
                                    },
                                    code({ node, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const codeString = String(children).replace(/\n$/, '');
                                        const blockId = `code-${Math.random().toString(36).substr(2, 9)}`;
                                        const isInline = !match;

                                        return !isInline ? (
                                            <div className="relative group my-4">
                                                <div className="absolute top-4 right-4 z-10">
                                                    <button
                                                        onClick={() => handleCopy(codeString, blockId)}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${copied === blockId
                                                            ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                                            : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-warning/50 opacity-0 group-hover:opacity-100'
                                                            }`}
                                                        title="Copier le code"
                                                    >
                                                        {copied === blockId ? (
                                                            <>
                                                                <FaCheckCircle className="text-sm" />
                                                                <span className="text-xs font-bold">Copié!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaCopy className="text-warning text-sm" />
                                                                <span className="text-xs font-bold">Copier</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                    <div className={`bg-gradient-to-r ${categoryStyle.gradient} px-6 py-3 flex items-center gap-3`}>
                                                        <FaTerminal className="text-white text-sm" />
                                                        <span className="text-xs font-black uppercase tracking-wider text-white">
                                                            {match[1]}
                                                        </span>
                                                    </div>
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus as any}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        customStyle={{
                                                            margin: 0,
                                                            padding: '1.5rem',
                                                            background: 'rgba(0, 0, 0, 0.3)',
                                                            fontSize: '0.875rem',
                                                            lineHeight: '1.8',
                                                            borderRadius: 0,
                                                        }}
                                                        showLineNumbers
                                                        {...(props as any)}
                                                    >
                                                        {codeString}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    table: ({ children }) => (
                                        <div className="my-8 overflow-x-auto rounded-2xl border border-white/10 shadow-xl glass">
                                            <table className="w-full text-left border-collapse">
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    thead: ({ children }) => (
                                        <thead className={`bg-gradient-to-r ${categoryStyle.gradient} text-white`}>
                                            {children}
                                        </thead>
                                    ),
                                    th: ({ children }) => (
                                        <th className="px-6 py-4 text-xs font-black uppercase tracking-widest border-b border-r border-white/20 last:border-r-0 text-white">
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children }) => (
                                        <td className="px-6 py-4 text-sm text-muted border-b border-r border-white/10 last:border-r-0 font-medium whitespace-pre-wrap">
                                            {children}
                                        </td>
                                    ),
                                    tr: ({ children }) => (
                                        <tr className="hover:bg-white/5 transition-colors group">
                                            {children}
                                        </tr>
                                    ),
                                    blockquote: ({ children }) => (
                                        <div className={`flex gap-3 p-4 my-3 rounded-lg border-l-4 border-l-warning ${categoryStyle.bg} border ${categoryStyle.border}`}>
                                            <FaInfoCircle className="text-warning text-2xl flex-shrink-0 mt-1" />
                                            <div className="flex-1 text-sm text-muted italic">
                                                {children}
                                            </div>
                                        </div>
                                    ),
                                    img: ({ src, alt, ...props }) => {
                                        const getCleanAlt = (text: string = '') => {
                                            return text ? text.replace(/\[(S|M|L|Mob)\]\s*/g, '').trim() : '';
                                        };
                                        const cleanAlt = getCleanAlt(alt);
                                        return (
                                            <figure className={`my-6 flex flex-col items-center group w-full`}>
                                                <div
                                                    className={`rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black/20 transition-all duration-300 inline-block max-w-full hover:border-white/20 cursor-zoom-in`}
                                                    onClick={() => setSelectedImage(src || '')}
                                                >
                                                    <img
                                                        src={src}
                                                        alt={cleanAlt}
                                                        className="h-auto max-h-[300px] w-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
                                                        loading="lazy"
                                                        {...(props as any)}
                                                    />
                                                </div>
                                                {cleanAlt && (
                                                    <figcaption className={`text-xs text-muted/60 mt-2 font-medium flex items-center gap-2 justify-center`}>
                                                        <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${categoryStyle.gradient} opacity-70`} />
                                                        {cleanAlt}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        );
                                    },
                                }}
                            >
                                {procedure.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>

                {/* Explore More Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 container mx-auto"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight mb-2">Découvrir d'autres procédures</h2>
                            <p className="text-muted text-sm">Continuez votre lecture avec des guides similaires.</p>
                        </div>
                        <button
                            onClick={() => navigate('/procedures')}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:border-warning/50 text-muted hover:text-inherit transition-all group"
                        >
                            <FaBook className="text-warning" />
                            <span className="font-bold text-sm">Toutes les procédures</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {procedures
                            .filter(p => p.id !== procedure.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 3)
                            .map((otherProc) => {
                                const otherStyle = getCategoryColor(otherProc.category);
                                return (
                                    <Link
                                        key={otherProc.id}
                                        to={`/procedures/${otherProc.id}`}
                                        className="glass rounded-2xl p-6 hover:border-warning/50 transition-all group shadow-lg flex flex-col"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl">{getCategoryIcon(otherProc.category)}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-gradient-to-r ${otherStyle.gradient} text-white`}>
                                                {otherProc.category}
                                            </span>
                                        </div>
                                        <h3 className="font-bold mb-3 group-hover:text-warning transition-colors line-clamp-2 min-h-[3rem]">
                                            {otherProc.title}
                                        </h3>
                                        <div className="mt-auto flex items-center gap-2 text-[10px] text-muted font-bold uppercase tracking-wider">
                                            <FaClock className="text-warning/50" />
                                            {new Date(otherProc.lastUpdated).toLocaleDateString('fr-FR')}
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </motion.div>

                {/* Bottom Pagination */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6 container mx-auto"
                >
                    {prevProcedure ? (
                        <Link
                            to={`/procedures/${prevProcedure.id}`}
                            className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-all"
                        >
                            <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:border-warning/5a0 transition-all">
                                <FaChevronLeft className="text-muted group-hover:-translate-x-1 group-hover:text-warning transition-all" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted/60 mb-1">Précédent</div>
                                <div className="font-bold text-sm line-clamp-1">{prevProcedure.title}</div>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextProcedure ? (
                        <Link
                            to={`/procedures/${nextProcedure.id}`}
                            className="flex items-center flex-row-reverse gap-4 group p-4 rounded-xl hover:bg-white/5 transition-all text-right"
                        >
                            <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:border-warning/50 transition-all">
                                <FaChevronRight className="text-muted group-hover:translate-x-1 group-hover:text-warning transition-all" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted/60 mb-1">Suivant</div>
                                <div className="font-bold text-sm line-clamp-1">{nextProcedure.title}</div>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}
                </motion.div>
            </div >
        </div >
    );
};

export default ProcedureDetail;
