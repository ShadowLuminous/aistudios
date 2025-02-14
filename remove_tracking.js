const fs = require('fs');
const path = require('path');

function removeTrackingScripts(directory) {
    // Get all files in directory
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            // Recursively process subdirectories
            removeTrackingScripts(filePath);
        } else if (file.endsWith('.html')) {
            // Process HTML files
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove Microsoft Clarity tracking
            content = content.replace(
                /<script type="text\/javascript">\s*\(function\s*\(c,\s*l,\s*a,\s*r,\s*i,\s*t,\s*y\)[\s\S]*?clarity[\s\S]*?<\/script>/gm,
                ''
            );
            
            // Remove Google Analytics tracking
            content = content.replace(
                /<script async src="https:\/\/www\.googletagmanager\.com[\s\S]*?<\/script>\s*<script>\s*window\.dataLayer[\s\S]*?<\/script>/gm,
                ''
            );
            
            // Write cleaned content back to file
            fs.writeFileSync(filePath, content);
            console.log(`Processed: ${filePath}`);
        }
    });
}

// Start processing from current directory
removeTrackingScripts('.'); 