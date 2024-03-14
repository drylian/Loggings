import { Progress } from "loggings";

// Create a new instance of Progress
const progressBar = new Progress();

// Add a total of 100 units to the progress bar
progressBar.add(100);

// Set a message for the progress bar
progressBar.msg("Processing...");

// Show the progress bar and update it for each completed unit
const interval = setInterval(() => {
    // Update the progress bar

    // Check if the progress bar has reached 100%
    if (progressBar.meta.current >= progressBar.meta.total - 1) {
        // Finish the interval
        clearInterval(interval);
        progressBar.msg("Complete!");

        // Finish the progress bar and get the data
        progressBar.end();
    } else {
        progressBar.cmt();
    }
}, 100);
