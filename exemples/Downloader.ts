import * as fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

// Import the Progress class
import { Progress } from "loggings";
import { ReadableStream } from 'stream/web';

// Create a new instance of Progress
const progressBar = new Progress({
    progress_format: " {progress}% [{bar}].red | [{current}].blue MB/[{total}].green MB TIME:[{progress_time}].gray|ETA:[{progress_eta}].red - {message}",
    progress_fixed: 2,
    progress_mili: false
});

// Download function with progress
const download = async (url: string, fileName: string): Promise<void> => {
    if(!fs.existsSync(fileName)){
        try {
            // Start the download
            const res = await fetch(url);
            const fileStream = fs.createWriteStream(`./${fileName}`, { flags: 'wx' });
    
            // Get the total file size in bytes
            const totalBytes = Number(res.headers.get('content-length'));
            // Convert bytes to megabytes
            const totalMB = totalBytes / (1024 * 1024);
    
            // Add total megabytes to progress
            progressBar.add(totalMB);
    
            // Calculate download progress in downloaded megabytes
    
            // Start read and write stream
            const downloadStream = Readable.from(res.body as ReadableStream<Uint8Array>);
    
            downloadStream.on('data', (chunk) => {
                // Add chunk size to total bytes downloaded
                // Update progress bar based on megabytes downloaded
                const progress = chunk.length / (1024 * 1024);
                progressBar.msg(`Downloading...`)
                progressBar.cmt(progress);
    
                // Write chunk to file
                fileStream.write(chunk);
            });
    
            // Wait for download stream to finish
            await finished(downloadStream);
            progressBar.msg("Completed Download");
        } catch (error) {
            console.error('Error during download:', error);
    
            // Error message
            console.error('Error during download!');
        } finally {
            // Finish progress bar
            progressBar.end();
        }
    } else {
        console.warn(fileName + ' already exists');

    }
};

// Example usage
const url = 'https://github.com/drylian/Eggs/raw/main/Connect/MTA/Accelerator-Application/build/mta-accelerator';
const fileName = 'mta-accelerator-update';
download(url, fileName);
