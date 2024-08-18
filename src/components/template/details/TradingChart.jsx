import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';



const TradingChart = ({data, isFetching}) => {
    
    const chartContainerRef = useRef();
    // const { data, isFetching } = useChartInfoQuery(contract);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            watermark: false,
            height: 400,
            
            layout: {
                backgroundColor: '#1A103D',
                background: '#1A103D',
                textColor: '#fff',

            },
            grid: {
                vertLines: {
                    color: '#363c4e',
                },
                horzLines: {
                    color: '#363c4e',
                },
            },

            priceScale: {
                borderColor: '#485c7b',
            },
            timeScale: {
                borderColor: '#485c7b',
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        if (!isFetching && data) {
            let chartData = data.map(item => ({
                time: item.date,  
                open: parseFloat(item.open),
                high: parseFloat(item.high),
                low: parseFloat(item.low),
                close: parseFloat(item.close),
            }));
            chartData = chartData
                .sort((a, b) => a.time - b.time)
                .filter((value, index, self) =>
                    index === 0 || value.time !== self[index - 1].time
                );

            try {
                candlestickSeries.setData(chartData);
            } catch (error) {
                console.error('Error setting data on candlestick series:', error);
            }
        }

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, isFetching]);

    return <div ref={chartContainerRef} style={{ borderRadius: '12px', width: '100%' }} />;
};

export default TradingChart;
