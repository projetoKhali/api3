import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { AppointmentSchema } from '../schemas/Appointment';
import "../styles/dashboard.css";

interface DayChartProps {
    data: AppointmentSchema[];
}

const DayChart: React.FC<DayChartProps> = ({ data }) => {
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

        // Inicializar o contador para todos os dias do mês
        const daysWorkedCounts: { [key: string]: number } = {};
        for (let i = 1; i <= 31; i++) {
            const key = i.toString();
            daysWorkedCounts[key] = 0;
        }

        // Loop através dos dados para contabilizar os dias trabalhados por dia do mês
        data.forEach((appointment) => {
            const startDate = new Date(appointment.startDate);
            const endDate = new Date(appointment.endDate);

            let currentDate = startDate.getDate();

            // Incrementa a contagem para cada dia do período
            while (currentDate <= endDate.getDate()) {
                const key = currentDate.toString();
                daysWorkedCounts[key]++;
                currentDate++;
            }
        });

        const transformedData = {
            labels: Object.keys(daysWorkedCounts),
            datasets: [
                {
                    label: 'Dias Trabalhados',
                    data: Object.values(daysWorkedCounts),
                    backgroundColor: 'rgba(255, 0, 111, 1)',
                    borderColor: 'rgba(255, 0, 111, 1)',
                },
            ],
        };

        const newChartInstance = new Chart(context, {
            type: 'bar',
            data: transformedData,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: 1, // Início do eixo X
                        max: 31, // Fim do eixo X
                        ticks: {
                            stepSize: 1,
                        },
                        
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: "Quantidade de Dias Trabalhados por Dia do Mês",
                        font: {
                            size: 16, // Ajuste o tamanho da fonte do título conforme necessário
                        },
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
        <div className="barChartDays" >
            <canvas ref={chartRef}  style={{ width: '800px' }}/>
        </div>
    );
};

export default DayChart;
