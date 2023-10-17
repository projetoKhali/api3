import { ChangeEvent, useState } from 'react';

interface FeedbackPopupProps {
    onConfirm: (feedback: string) => void;
    onCancel: () => void;
}

export default function FeedbackPopup({ onConfirm, onCancel }: FeedbackPopupProps) {
    const [localFeedback, setLocalFeedback] = useState<string>('');

    const handleFeedbackChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newFeedback = event.target.value;
        setLocalFeedback(newFeedback);
    };

    const handleConfirm = () => {
        onConfirm(localFeedback);
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
                <textarea
                    placeholder="Digite o feedback"
                    value={localFeedback}
                    onChange={handleFeedbackChange}
                />
                <button type="submit">Confirmar</button>
                <button onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}
