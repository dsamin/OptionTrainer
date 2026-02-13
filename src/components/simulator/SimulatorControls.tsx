import type { OptionContract } from '../../lib/options/types'

interface SimulatorControlsProps {
    contract: OptionContract
    onChange: (contract: OptionContract) => void
}

export function SimulatorControls({ contract, onChange }: SimulatorControlsProps) {
    const handleChange = (field: keyof OptionContract, value: number | 'call' | 'put') => {
        onChange({ ...contract, [field]: value })
    }

    return (
        <div className="space-y-6">
            {/* Option Type Toggle */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Option Type</label>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleChange('type', 'call')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${contract.type === 'call'
                            ? 'bg-success-600 text-white border-2 border-success-400'
                            : 'bg-gray-800 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                            }`}
                    >
                        Call
                    </button>
                    <button
                        onClick={() => handleChange('type', 'put')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${contract.type === 'put'
                            ? 'bg-warning-600 text-white border-2 border-warning-400'
                            : 'bg-gray-800 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                            }`}
                    >
                        Put
                    </button>
                </div>
            </div>

            {/* Stock Price Slider */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Stock Price: <span className="text-primary-400 font-bold">${contract.stockPrice}</span>
                </label>
                <input
                    type="range"
                    min="10"
                    max="500"
                    step="1"
                    value={contract.stockPrice}
                    onChange={(e) => handleChange('stockPrice', Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$10</span>
                    <span>$500</span>
                </div>
            </div>

            {/* Strike Price Slider */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Strike Price: <span className="text-primary-400 font-bold">${contract.strikePrice}</span>
                </label>
                <input
                    type="range"
                    min={Math.max(10, contract.stockPrice - 100)}
                    max={contract.stockPrice + 100}
                    step="5"
                    value={contract.strikePrice}
                    onChange={(e) => handleChange('strikePrice', Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>${Math.max(10, contract.stockPrice - 100)}</span>
                    <span>${contract.stockPrice + 100}</span>
                </div>
            </div>

            {/* Days to Expiration Slider */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Days to Expiration: <span className="text-primary-400 font-bold">{contract.daysToExpiration}</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="90"
                    step="1"
                    value={contract.daysToExpiration}
                    onChange={(e) => handleChange('daysToExpiration', Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 day</span>
                    <span>90 days</span>
                </div>
            </div>

            {/* Implied Volatility Slider */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Implied Volatility: <span className="text-primary-400 font-bold">{(contract.impliedVolatility * 100).toFixed(0)}%</span>
                </label>
                <input
                    type="range"
                    min="0.10"
                    max="1.00"
                    step="0.01"
                    value={contract.impliedVolatility}
                    onChange={(e) => handleChange('impliedVolatility', Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    )
}
