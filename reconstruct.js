const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\nurdi\\.gemini\\antigravity\\brain\\5c33e6d2-d7cb-45eb-8bf0-6f2582bac6cc\\.system_generated\\logs\\overview.txt';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

function extractCode(stepIndex, targetFile) {
    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const data = JSON.parse(line);
            if (data.step_index === stepIndex && data.tool_calls) {
                for (const call of data.tool_calls) {
                    if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
                        const fileArg = call.args.TargetFile || '';
                        if (fileArg.toLowerCase().includes(targetFile.toLowerCase())) {
                            let content = call.args.CodeContent || call.args.ReplacementContent;
                            if (!content && call.name === 'multi_replace_file_content') {
                                // multi_replace is harder, but we usually used write_to_file for initial setup
                                continue;
                            }
                            return content;
                        }
                    }
                }
            }
        } catch (e) {}
    }
    return null;
}

// Reconstruct files
const filesToReconstruct = [
    { step: 174, file: 'HeroCarousel.js', dest: 'src/components/HeroCarousel.js' },
    { step: 180, file: 'HeroCarousel.css', dest: 'src/components/HeroCarousel.css' },
    { step: 59, file: 'Navbar.js', dest: 'src/components/Navbar.js' },
    { step: 62, file: 'Navbar.css', dest: 'src/components/Navbar.css' },
    { step: 48, file: 'cars.js', dest: 'src/data/cars.js' },
    { step: 75, file: 'BookingBar.js', dest: 'src/components/BookingBar.js' },
    { step: 75, file: 'BookingBar.css', dest: 'src/components/BookingBar.css' },
    { step: 91, file: 'Stats.js', dest: 'src/components/Stats.js' },
    { step: 91, file: 'Stats.css', dest: 'src/components/Stats.css' },
    { step: 91, file: 'BestDeals.js', dest: 'src/components/BestDeals.js' },
    { step: 91, file: 'BestDeals.css', dest: 'src/components/BestDeals.css' },
    { step: 97, file: 'Services.js', dest: 'src/components/Services.js' },
    { step: 97, file: 'Services.css', dest: 'src/components/Services.css' },
    { step: 97, file: 'Locations.js', dest: 'src/components/Locations.js' },
    { step: 97, file: 'Locations.css', dest: 'src/components/Locations.css' },
    { step: 103, file: 'Testimonials.js', dest: 'src/components/Testimonials.js' },
    { step: 141, file: 'Testimonials.css', dest: 'src/components/Testimonials.css' },
    { step: 141, file: 'Footer.js', dest: 'src/components/Footer.js' },
    { step: 141, file: 'Footer.css', dest: 'src/components/Footer.css' },
    { step: 146, file: 'App.js', dest: 'src/App.js' },
    { step: 146, file: 'App.css', dest: 'src/App.css' },
    { step: 146, file: 'index.css', dest: 'src/index.css' }
];

filesToReconstruct.forEach(f => {
    const code = extractCode(f.step, f.file);
    if (code) {
        // CodeContent might be double-escaped in the log string
        let cleanCode = code;
        if (code.startsWith('"') && code.endsWith('"')) {
            try {
                cleanCode = JSON.parse(code);
            } catch (e) {
                // If it fails, maybe it's just a quoted string with literal escapes
                cleanCode = code.substring(1, code.length - 1).replace(/\\n/g, '\n').replace(/\\"/g, '"');
            }
        } else {
             // It might just be the raw content if the log parser was smart
             cleanCode = code.replace(/\\n/g, '\n').replace(/\\"/g, '"');
        }
        
        const destPath = path.join('c:\\Users\\nurdi\\Desktop\\web dev\\personael\\myApp\\CAR\\therain', f.dest);
        fs.writeFileSync(destPath, cleanCode);
        console.log(`RECONSTRUCTED: ${f.dest}`);
    } else {
        console.log(`FAILED: ${f.file} at step ${f.step}`);
    }
});

// Delete Hero3DCar.js if it exists
const hero3dPath = 'c:\\Users\\nurdi\\Desktop\\web dev\\personael\\myApp\\CAR\\therain\\src\\components\\Hero3DCar.js';
if (fs.existsSync(hero3dPath)) {
    fs.unlinkSync(hero3dPath);
    console.log('DELETED: Hero3DCar.js');
}
