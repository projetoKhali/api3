import React, { useState } from 'react';

interface PopupProps {
    text: string;
    buttons: { text: string; onClick: () => void }[];
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ text, buttons, onClose }) => {
    const handlePopupClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <p>{text}</p>
                {buttons.map((button, index) => (
                    <button key={index} onClick={button.onClick}>
                        {button.text}
                    </button>
                ))}
                <button onClick={handlePopupClose}>Fechar</button>
            </div>
        </div>
    );
}

export default function Appointments() {
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState<PopupProps | null>(null);

    const showPopupWithOptions = (data: Omit<PopupProps, 'onClose'>) => {
        setPopupData({ ...data, onClose: handleClose });
        setShowPopup(true);
    }

    const handleClose = () => {
        setShowPopup(false);
    }

    return (
        <div>
            <button
                onClick={() =>
                    showPopupWithOptions({
                        text: 'Este é um pop-up informativo.',
                        buttons: [{ text: 'Fechar', onClick: handleClose }],
                    })
                }
            >
                Mostrar Pop-up Informativo
            </button>
            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
}
