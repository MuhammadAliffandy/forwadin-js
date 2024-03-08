import { Doughnut } from 'react-chartjs-2'
import { useState, useEffect } from 'react';
const MessageReceivedChart = () => {
    const messageData = {
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
    const dataOption = {
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let sum = 0
                        context.dataset.data.map(data => {
                            if (data)
                                sum += data
                        })
                        let label = (context.parsed / sum * 100).toFixed(0) + '%'
                        return label;
                    }
                }
            },
        },
    }
    useEffect(() => {

    }, [])
    return (
        <>
            <Doughnut width={'100%'} data={messageData} options={dataOption} />
        </>
    )
}

export default MessageReceivedChart