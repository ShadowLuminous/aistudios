const fs = require('fs');
const path = require('path');

function removeHTTrackComments(directory) {
    // Get all files in directory
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            // Recursively process subdirectories
            removeHTTrackComments(filePath);
        } else if (file.endsWith('.html')) {
            // Process HTML files
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove HTTrack comments
            content = content.replace(/<!-- Mirrored from[\s\S]*?-->\n?/g, '');
            content = content.replace(/<!-- Added by HTTrack[\s\S]*?-->\n?/g, '');
            
            // Write cleaned content back to file
            fs.writeFileSync(filePath, content);
            console.log(`Processed: ${filePath}`);
        }
    });
}

// Start processing from current directory
removeHTTrackComments('.'); 