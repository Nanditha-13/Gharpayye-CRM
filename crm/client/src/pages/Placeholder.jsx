import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Placeholder({ title = 'Coming Soon', description = 'This section is under construction.' }) {
  const navigate = useNavigate();
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="font-display text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-500 mb-6">{description}</p>
        <button onClick={() => navigate(-1)} className="btn-ghost flex items-center gap-2 mx-auto">
          <ArrowLeft size={14} /> Go back
        </button>
      </motion.div>
    </div>
  );
}
