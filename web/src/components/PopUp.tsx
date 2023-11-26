import '../styles/popup.css';

interface Button {
    text: string;
    onClick: () => void;
}

export interface PopupSchema {
    text: string;
    buttons: Button[];
    isOpen: boolean
}

export default function Popup({ text, buttons, isOpen}: PopupSchema) {
    return (
        <div className="popup-wrapper">
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <p className="popup-text">{text}</p>
                        <div className="popup-buttons">
                        {buttons.map((button, index) => (
                            <button
                                className="popup-button"
                                key={index}
                                onClick={button.onClick}
                            >
                                {button.text}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
