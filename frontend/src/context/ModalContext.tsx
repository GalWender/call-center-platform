import React, { createContext, useCallback, useContext, useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface ModalContextValue {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const closeModal = useCallback(() => setModalContent(null), []);
  const openModal = useCallback((content: React.ReactNode) => setModalContent(content), []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ReactModal
        isOpen={modalContent !== null}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        {modalContent}
      </ReactModal>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};
