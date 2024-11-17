// dataWorker.js
onmessage = function(e) {
    const processedData = Array.from({ length: 1000 }, (_, i) => {
        return Array.from({ length: 10 }, (_, i2) => {
            return{
                dataPoint: Array.from({ length: 10 }, (_, i3) => {
                    return { time: i3, value: Math.random() * 100 }
                }),
                title: `Line ${i2}`
            }
        })
    })
    postMessage(processedData);
};
