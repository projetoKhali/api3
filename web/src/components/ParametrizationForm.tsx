import { useEffect, useState } from "react";

interface ParametrizationFormProps {
    errorCallback: () => void;
}

export default function ParametrizationForm ({errorCallback}: ParametrizationFormProps) {
    const [postNightShiftStart, setNightShiftStart] = useState<string>();
    const [postNightShiftEnd, setNightShiftEnd] = useState<string>();
    const [postClosingDayOfMonth, setClosingDayOfMonth] = useState<number>();

    useEffect(() => {
        })

        

}