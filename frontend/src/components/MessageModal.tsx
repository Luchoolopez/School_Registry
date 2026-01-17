import React from 'react';

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

const MessageModal: React.FC<Props> = ({ isOpen, title = 'Información', message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 whitespace-pre-wrap">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg">OK</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
