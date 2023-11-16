// Importando o Chart do pacote chart.js
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { AppointmentSchema } from '../schemas/Appointment';

interface PieChartProps {
    data: AppointmentSchema[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartRef = useRef<any>(null);

    useEffect(() => {
        // Verifica se o gráfico anterior  existe e o destroi
        if (chartRef.current) {
            const oldChart = chartRef.current.chart;
            if (oldChart) {
                oldChart.destroy();
            }
        }

        if (!data || data.length === 0) {
            return;
        }

        const statusCounts: { [key: string]: number } = {};
        data.forEach((appointment) => {
            const status = appointment.status;
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        const transformedData = {
            labels: Object.keys(statusCounts),
            datasets: [
                {
                    data: Object.values(statusCounts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        };

        // Cria um novo gráfico
        const newChart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: transformedData,
        });

        // Adiciona o novo gráfico ao ref
        chartRef.current.chart = newChart;

        return () => {
            // Garante que o gráfico seja destruído ao desmontar o componente
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }, [data]);

    return (
        <div>
            <h2> Status dos seus apontamentos </h2>
            <canvas ref={chartRef} />
        </div>
    );
};

export default PieChart;
