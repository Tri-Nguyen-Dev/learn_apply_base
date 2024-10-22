function downloadFiles(fileUrls) {
    const downloadFile = (url) => {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to download file: ${url}`);
                }
                return response.blob();
            })
            .then((blob) => {
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                const fileName = url.split('/').pop();
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(blobUrl);
            });
    };

    return Promise.all(fileUrls.map(downloadFile))
        .then(() => {
            console.log('All files downloaded successfully.');
        })
        .catch((error) => {
            console.error('Error downloading files:', error);
        });
}
