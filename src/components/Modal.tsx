import { useEffect, useRef } from 'react';
import styles from '../scss/components/_modal.module.scss';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        dialogRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();

            // Trap focus inside modal
            if (e.key === 'Tab' && dialogRef.current) {
                const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const elements = Array.from(focusableElements);
                const first = elements[0];
                const last = elements[elements.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocusedElement.current?.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className={styles['modal-overlay']}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            <div
                className={styles['modal-content']}
                ref={dialogRef}
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
            >
                <h2 id="modal-title" className={styles['modal-title']}>
                    {title}
                </h2>
                <div className={styles['modal-body']}>{children}</div>
                <button className={styles['modal-close']} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
