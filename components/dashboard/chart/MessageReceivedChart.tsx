import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)
const MessageReceivedChart = () => {
    const messageData: ChartData = {
        labels: ['Total Pesan Keluar', 'Total Pesan Masuk', 'Total Pesan Gagal'],
        datasets: [{
            data: [24, 8, 12],
            backgroundColor: [
                '#3366FF',
                '#4FBEAB',
                '#F3F5F8'
            ],
        }]
    }
    const chartOptions: ChartOptions = {
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let sum = 0
                        context.dataset.data.map(data => sum += data)
                        let label = (context.parsed / sum * 100).toFixed(0) + '%'
                        return label;
                    }
                }
            },
        },
    }
    return (
        <>
            <Doughnut width={'100%'} data={messageData} options={chartOptions} />
        </>
    )
}

export default MessageReceivedChart