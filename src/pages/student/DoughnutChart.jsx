import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AspectRatio } from '@mui/icons-material';


ChartJS.register(ArcElement, Tooltip, Legend);

const  options={
        // maintainAspectRatio:false,
        AspectRatio:1
    }


    export const data = {
        // labels: ['Red', 'Green'],
        datasets: [
            {
                // label: '# of Votes',
                data: [12, 19],
                backgroundColor: [
                    'rgba(0, 255, 0,1)',
                    'rgba(254, 78, 78, 1)',
                            ],
         
                borderColor: [
                    'rgba(0, 255, 0,1)',
                    'rgba(255, 0, 0, 1)'
                   
                ],
                borderWidth: 0,
                cutout:'80%',
                hoverOffset: 4
            },
            
        ],
    };
    

const DoughnutChart = (chartdata) => {
  return (
    <Doughnut  options={options} data={data} />
)
}

export default DoughnutChart