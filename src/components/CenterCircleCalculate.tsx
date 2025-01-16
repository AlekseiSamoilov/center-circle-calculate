import { useCallback, useState } from 'react'

const CenterCircleCalculate = () => {
    const [points, setPoints] = useState<Array<{ x: string, y: string }>>([
        { x: '', y: '' },
        { x: '', y: '' },
        { x: '', y: '' },
    ]);

    const [center, setCenter] = useState<{ x: number, y: number } | null>(null);

    const calculateCenter = useCallback((currentPoints: Array<{ x: string, y: string }>) => {
        const numericPoints = currentPoints.map(p => ({
            x: parseFloat(p.x.replace(',', '.')),
            y: parseFloat(p.y.replace(',', '.'))
        }));

        const validPoints = numericPoints.every(p => !isNaN(p.x) && !isNaN(p.y));

        if (!validPoints) {
            setCenter(null);
            return;
        }

        const centerX = numericPoints.reduce((sum, p) => sum + p.x, 0) / 3;
        const centerY = numericPoints.reduce((sum, p) => sum + p.y, 0) / 3;

        setCenter({
            x: parseFloat(centerX.toFixed(3)),
            y: parseFloat(centerY.toFixed(3))
        });
    }, []);

    const handleInputChange = (index: number, coord: 'x' | 'y', value: string) => {
        if (!/^-?\d*[.,]?\d*$/.test(value)) {
            return
        }

        const newPoints = [...points];
        newPoints[index] = {
            ...newPoints[index],
            [coord]: value,
        };
        setPoints(newPoints);
        calculateCenter(newPoints);
    }
    return (
        <div className='min-h-screen bg-slate-100 py-8 px-4'>
            <div className='max-w-md mx-auto bg-white rounded-xl shadow-lg p-6'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-center text-gray-800'>
                        Калькулятор центра круга
                    </h1>
                </div>
                <div className='space-y-6'>
                    {points.map((point, index) => (
                        <div key={index} className='space-y-2'>
                            <label className='block text-sm font-medium text-gray-700'>
                                Точка {index + 1}
                            </label>
                            <div className='flex flex-col sm:flex-row gap-2'>
                                <input
                                    type='text'
                                    value={point.x}
                                    onChange={(e) => handleInputChange(index, 'x', e.target.value)}
                                    className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-blue-500 focus:border-transparent'
                                    placeholder='X'
                                />
                                <input
                                    type="text"
                                    value={point.y}
                                    onChange={(e) => handleInputChange(index, 'y', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Y"
                                />
                            </div>
                        </div>
                    ))}

                    {center && (
                        <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
                            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                Усредненный центр
                            </h3>
                            <div className='flex justify-center gap-4 text-blue-600 font-medium'>
                                <span>X: {center.x}</span>
                                <span>Y: {center.y}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CenterCircleCalculate
