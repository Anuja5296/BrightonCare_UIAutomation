const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Get the absolute path more reliably
const projectRoot = path.resolve(__dirname, '..');
const reportPath = path.join(projectRoot, 'playwright-report', 'index.html');

console.log('===== Debug Info =====');
console.log('__dirname:', __dirname);
console.log('Project root:', projectRoot);
console.log('Looking for report at:', reportPath);
console.log('Report exists?', fs.existsSync(reportPath));
console.log('====================\n');

// Check if the report exists
if (!fs.existsSync(reportPath)) {
    console.error('❌ Report file not found at:', reportPath);
    
    // List what's actually in the project root
    console.log('\nFiles in project root:');
    console.log(fs.readdirSync(projectRoot));
    
    process.exit(1);
}

// Read the HTML content
const reportHtml = fs.readFileSync(reportPath, 'utf-8');

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anuja.satpute@thinkitive.com',
        pass: 'magj tsuj xlbi pags' // Use Gmail App Password!
    }
});

// Mail options
const mailOptions = {
    from: '"Playwright Automation" <anuja.satpute@thinkitive.com>',
    to: 'anuja.satpute@thinkitive.com',
    subject: 'Playwright Test Report ✅',
    html: `<h2>Playwright Test Report</h2><hr/>${reportHtml}`,
    attachments: [
        { filename: 'index.html', path: reportPath }
    ]
};

// Send email (no type annotations needed with require)
transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
        console.error('❌ Error sending email:', error);
    } else {
        console.log('📧 Email sent successfully:', info.response);
    }
});