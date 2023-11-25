import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { AppointmentSchema } from '../schemas/Appointment';
import "../styles/dashboard.css";

interface BarChartProps {
    data: AppointmentSchema[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        const canvas = chartRef.current;
        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        // Limpar instância anterior ao montar ou quando os dados mudam
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (!data || data.length === 0) {
            return;
        }

        // Inicializar o contador para todas as horas do dia
        const hoursWorkedCounts: { [key: string]: number } = {};
        for (let i = 0; i < 24; i++) {
            const key = `${i.toString().padStart(2, '0')}:00`;
            hoursWorkedCounts[key] = 0;
        }

        // Loop através dos dados para contabilizar as horas trabalhadas por hora do dia
        data.forEach((appointment) => {
            const startDate = new Date(appointment.startDate);
            const endDate = new Date(appointment.endDate);

            let currentHour = startDate.getHours();

            // Incrementa a contagem para cada hora do período
            while (currentHour <= endDate.getHours()) {
                const key = `${currentHour.toString().padStart(2, '0')}:00`;
                hoursWorkedCounts[key]++;
                currentHour++;
            }
        });

        console.log('hoursWorkedCounts:', hoursWorkedCounts);

        const transformedData = {
            labels: Object.keys(hoursWorkedCounts),
            datasets: [
                {
                    label: 'Horas Trabalhadas',
                    data: Object.values(hoursWorkedCounts),
                    backgroundColor: 'rgba(255, 179, 0, 1)',
                    borderColor: 'rgba(255, 179, 0, 1)',
                },
                
            ],
        };

        const sortedLabels = transformedData.labels.slice().sort();

        const newChartInstance = new Chart(context, {
            type: 'bar',
            data: {
                ...transformedData,
                labels: sortedLabels,
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Quantidade de Horas Trabalhadas por Hora do Dia",
                        font: {
                            size: 18,
                        }
                    },
                },
                scales: {
                    x: {
                        type: 'category',
                        position: 'bottom',
                        labels: sortedLabels,
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    },
                },
                datasets: {
                    bar: {
                        categoryPercentage: 0.8,
                        barPercentage: 0.9,
                    },
                },
            },
        });

        // Atualizar a referência da instância
        chartInstance.current = newChartInstance;

        // Limpar instância ao desmontar
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="barChartHours"
        >
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;
