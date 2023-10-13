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
        <div>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{text}</p>
                        {buttons.map((button, index) => (
                            <button key={index} onClick={button.onClick}>
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
