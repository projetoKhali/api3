import { useEffect, useState } from 'react';

export default function PopUpMensagem({ text }: { text: string }) {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsOpen(false);
        }, 5000); // Fechar o Popup após 5 segundos

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
