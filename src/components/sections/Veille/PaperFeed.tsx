import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';

interface Build {
  build: number;
  time: string;
  changes: {
    commit: string;
    summary: string;
    message: string;
  }[];
}

const PaperFeed: React.FC = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await fetch(
          'https://api.papermc.io/v2/projects/paper/versions/1.21/builds'
        );
        const data = await response.json();
        // On prend les 6 derniers builds
        setBuilds(data.builds.reverse().slice(0, 6));
      } catch (error) {
        console.error('Erreur lors de la récupération des builds PaperMC:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-warning"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {builds.map((build, index) => (
        <motion.div
          key={build.build}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass border border-theme rounded-xl p-5 hover:border-warning/50 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="bg-warning/10 text-warning text-xs font-bold px-3 py-1 rounded-full border border-warning/20">
              Build #{build.build}
            </div>
            <div className="text-muted text-xs flex items-center gap-1">
              <FaClock size={10} />
              {new Date(build.time).toLocaleDateString()}
            </div>
          </div>

          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <FaGithub className="opacity-60" /> Changes
          </h4>

          <div className="space-y-3 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
            {build.changes.length > 0 ? (
              build.changes.map((change, i) => (
                <div key={i} className="text-xs text-muted/60 border-l-2 border-theme pl-3 py-1">
                  <p className="line-clamp-2">{change.summary || 'No summary available'}</p>
                  <span className="text-warning/50 font-mono text-[10px] mt-1 block">
                    {change.commit.substring(0, 7)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted/30 italic text-center py-4">
                No specific changes listed
              </p>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-theme flex justify-end">
            <a
              href={`https://github.com/PaperMC/Paper/commit/${build.changes[0]?.commit}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-warning hover:underline flex items-center gap-1"
            >
              View on GitHub <FaExternalLinkAlt size={10} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PaperFeed;
