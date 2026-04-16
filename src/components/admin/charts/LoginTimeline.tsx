import { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { motion } from 'framer-motion'

interface TimelineEntry {
    date: string
    count: number
}

export default function LoginTimeline({ data }: { data: TimelineEntry[] }) {
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chartRef.current || !data.length) return

        const chart = createChart(chartRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#12121f' },
                textColor: '#94a3b8',
            },
            grid: {
                vertLines: { color: 'rgba(99,102,241,0.1)' },
                horzLines: { color: 'rgba(99,102,241,0.1)' },
            },
            width: chartRef.current.clientWidth,
            height: 280,
            rightPriceScale: {
                borderColor: 'rgba(99,102,241,0.15)',
            },
            timeScale: {
                borderColor: 'rgba(99,102,241,0.15)',
            },
            crosshair: {
                horzLine: { color: 'rgba(99,102,241,0.3)' },
                vertLine: { color: 'rgba(99,102,241,0.3)' },
            },
        })

        const areaSeries = chart.addAreaSeries({
            lineColor: '#6366f1',
            topColor: 'rgba(99, 102, 241, 0.4)',
            bottomColor: 'rgba(99, 102, 241, 0.02)',
            lineWidth: 2,
        })

        areaSeries.setData(
            data.map(d => ({
                time: d.date,
                value: d.count,
            }))
        )

        chart.timeScale().fitContent()

        const handleResize = () => {
            if (chartRef.current) {
                chart.applyOptions({ width: chartRef.current.clientWidth })
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove()
        }
    }, [data])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden"
            style={{
                background: '#12121f',
                border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
        >
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <h3 className="text-base font-semibold" style={{ color: '#e2e8f0' }}>Login Activity (30 Days)</h3>
            </div>
            <div className="p-2">
                <div ref={chartRef} />
            </div>
        </motion.div>
    )
}
