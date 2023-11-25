// Importando o Chart do pacote chart.js
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { AppointmentSchema } from '../schemas/Appointment';
import "../styles/dashboard.css";

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
                    backgroundColor: ['#ff006f', '#ffb300', '#fff538'],
                    hoverBackgroundColor: ['#ff006f', '#ffb300', '#fff538'],
                },
            ],
        };

        // Cria um novo gráfico
        const newChart = new Chart(chartRef.current, {
            type: 'doughnut',
            data: transformedData,
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'top', // ou 'bottom' ou outra posição desejada
                        labels: {
                            font: {
                                size: 10, // Ajuste o tamanho da fonte da legenda aqui
                            },
                        },
                        title: {
                            display: true,
                            text: "Status dos seus apontamentos", // Utilizando o título passado como propriedade
                            font: {
                                size: 18, // Ajuste o tamanho da fonte do título conforme necessário
                                weight: 'bold',
                            },
                        },
                    },
                },
            },
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
        <div className="pieChart" >
            <canvas ref={chartRef} />
        </div>
    );
};

export default PieChart;
