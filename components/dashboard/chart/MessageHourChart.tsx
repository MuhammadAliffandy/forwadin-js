import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    zoomPlugin
);
const MessageHourChart = () => {
    const options = {
        responsive: true,

        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    pinch: {
                        enabled: true       // Enable pinch zooming
                    },
                    wheel: {
                        enabled: true       // Enable wheel zooming
                    },
                    mode: 'x',
                }
            }
        },
    };
    const labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:200'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: [10, 66, 90, 43, 102, 90, 43, 102, 90, 43, 102, 90, 43, 102, 43, 102, 90, 43, 102, 43, 102, 90, 43, 102, 43, 102, 90, 43, 102, 43, 102, 90, 43, 102],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
            },
        ],
    };
    return (
        <>
            <Line width={'100%'} options={options} data={data} />
        </>
    )
}

export default MessageHourChart