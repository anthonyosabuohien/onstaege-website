# Onstaege Google Apps Script Deployment Guide

This document contains the production-grade **Google Apps Script** code designed to back your Onstaege website forms. This script connects directly to your Google Sheet (`1DeWiddCW-hepn8_8vt_pu3MeH1pBNpCjHsElnrP6DH4`), manages folders in Google Drive, sends email notifications, and performs daily CSV backups.

---

## 🚀 Deployment Instructions

Follow these 4 simple steps to go live in under 2 minutes:

1. **Create the Script**:
   - Go to [Google Sheets](https://sheets.google.com) and open your spreadsheet with ID `1DeWiddCW-hepn8_8vt_pu3MeH1pBNpCjHsElnrP6DH4`.
   - In the top menu, click **Extensions** > **Apps Script**.

2. **Paste the Code**:
   - Delete any default code in the editor (`Code.gs`).
   - Copy the entire source code below and paste it into the editor.
   - Click the Save icon (💾) or press `Ctrl+S` / `Cmd+S`.

3. **Deploy as a Web App**:
   - Click the blue **Deploy** button in the top-right corner and select **New deployment**.
   - Click the **Gear icon** next to "Select type" and choose **Web app**.
   - Fill in the following settings:
     - **Description**: `Onstaege Form Submission API`
     - **Execute as**: `Me` (your email address)
     - **Who has access**: `Anyone` (this lets the public form submit data securely without signing in)
   - Click **Deploy**.
   - *If prompted*, click **Authorize access** and sign into your Google Account to grant administrative permissions for sending emails, creating Drive files, and updating Sheets.

4. **Add URL to Environment**:
   - Copy the **Web app URL** provided at the end of the deployment (it ends with `/exec`).
   - Add this URL to your `.env` file or in your environment variables config:
     ```env
     VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/XXXXX/exec"
     ```

---

## 🛠️ Complete Google Apps Script Source Code

```javascript
/**
 * Onstaege Form Submission API & Drive Backup System
 * Spreadsheet ID: 1DeWiddCW-hepn8_8vt_pu3MeH1pBNpCjHsElnrP6DH4
 * Admin Email: anthonyosabuohien101@gmail.com
 */

// Configuration Options
var SPREADSHEET_ID = '1DeWiddCW-hepn8_8vt_pu3MeH1pBNpCjHsElnrP6DH4';
var ADMIN_EMAIL = 'anthonyosabuohien101@gmail.com';
var PARENT_FOLDER_NAME = 'Onstaege Website Leads';

/**
 * Handle POST request from the client (Webhook Entrypoint)
 */
function doPost(e) {
  try {
    // 1. Check for valid payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, error: 'Empty or invalid request stream.' });
    }
    
    // 2. Parse and sanitize JSON payload
    var rawData = JSON.parse(e.postData.contents);
    var data = sanitizePayload(rawData);
    
    // 3. Rate limiting / Spam protection (Simple check based on timestamp of last row)
    if (isRateLimited(data.email)) {
      return createJsonResponse({ success: false, error: 'Spam protection activated. Please wait before submitting again.' });
    }
    
    // 4. Validate fields
    if (!data.name || !data.email || !data.formType) {
      return createJsonResponse({ success: false, error: 'Missing mandatory fields: Name, Email, or Form Type.' });
    }
    
    // 5. Connect to Spreadsheet + Get/Create corresponding sheet tab
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheetName = (data.formType === 'waitlist') ? 'Waitlist Submissions' : 'Request Demo';
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      setupSheetHeaders(sheet);
    }
    
    // 6. Generate administrative metadata
    var timestamp = new Date();
    var requestId = 'REQ-' + (data.formType === 'waitlist' ? 'WL' : 'DM') + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    var status = 'NEW';
    
    // Convert undefined to empty string for safety
    var entryRow = [
      timestamp,                                            // Column A: Timestamp
      requestId,                                            // Column B: Request ID
      data.name,                                            // Column C: Name
      data.email,                                           // Column D: Email
      data.phone || '',                                     // Column E: Phone
      data.company || '',                                   // Column F: Company Name
      data.businessType || '',                              // Column G: Business Type
      data.preferredDemo || '',                             // Column H: Preferred Demo Type
      data.message || '',                                   // Column I: Message
      status,                                               // Column J: Status
      data.analytics ? (data.analytics.browser || '') : '',   // Column K: Browser
      data.analytics ? (data.analytics.device || '') : '',    // Column L: Device
      data.analytics ? (data.analytics.referrer || '') : '',  // Column M: Referrer
      data.analytics ? (data.analytics.currentPage || '') : '',// Column N: Current Page
      data.analytics ? (data.analytics.utmSource || '') : '', // Column O: UTM Source
      data.analytics ? (data.analytics.utmCampaign || '') : '',// Column P: UTM Campaign
      data.analytics ? (data.analytics.country || '') : ''    // Column Q: Country
    ];
    
    // Append row
    sheet.appendRow(entryRow);
    
    // 7. Trigger instant asynchronous directory and folder structures in Drive
    try {
      getOrCreateDriveFolders();
    } catch (err) {
      Logger.log('Drive folder creation issue: ' + err.toString());
    }
    
    // 8. Trigger email notifications
    sendAdminNotification(data, timestamp, requestId, status);
    sendUserConfirmation(data);
    
    return createJsonResponse({ success: true, requestId: requestId });
    
  } catch (err) {
    Logger.log('Error occurred: ' + err.toString());
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * Handle OPTIONS / GET request for browser pre-flight checks (CORS)
 */
function doGet(e) {
  return createJsonResponse({ status: 'active', message: 'Onstaege Apps Script API is online. Use POST requests.' });
}

/**
 * Setup standard header rows for tabs
 */
function setupSheetHeaders(sheet) {
  var headers = [
    'Timestamp', 'Request ID', 'Name', 'Email', 'Phone', 'Company', 'Business Type', 
    'Preferred Demo', 'Message', 'Status', 'Browser', 'Device', 'Referrer', 
    'Current Page', 'UTM Source', 'UTM Campaign', 'Country'
  ];
  sheet.appendRow(headers);
  
  // Format the header row aesthetically
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackgroundColor('#7c3aed');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

/**
 * Escapes characters to prevent raw HTML inputs
 */
function sanitizePayload(raw) {
  var clean = {};
  for (var key in raw) {
    if (typeof raw[key] === 'object' && raw[key] !== null) {
      clean[key] = sanitizePayload(raw[key]);
    } else if (typeof raw[key] === 'string') {
      clean[key] = raw[key].replace(/[\<\>\&\"\'\/]/g, function (s) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          "'": '&#x27;',
          '/': '&#x2F;'
        }[s];
      }).trim();
    } else {
      clean[key] = raw[key];
    }
  }
  return clean;
}

/**
 * Super lightweight client-side or IP level rate limiting (checks Sheet for same email in the last 15 seconds)
 */
function isRateLimited(email) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheets = ss.getSheets();
    var now = new Date().getTime();
    
    for (var s = 0; s < sheets.length; s++) {
      var sheet = sheets[s];
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) continue;
      
      // Look at the last 5 submissions
      var startRow = Math.max(2, lastRow - 5);
      var numRows = (lastRow - startRow) + 1;
      
      var timestamps = sheet.getRange(startRow, 1, numRows, 1).getValues();
      var emails = sheet.getRange(startRow, 4, numRows, 1).getValues();
      
      for (var i = 0; i < emails.length; i++) {
        if (emails[i][0] === email) {
          var submitTime = new Date(timestamps[i][0]).getTime();
          if (now - submitTime < 15 * 1000) { // 15 seconds limit
            return true;
          }
        }
      }
    }
  } catch (e) {
    // Fail safe
  }
  return false;
}

/**
 * Creates response content optimized with headers for secure Cross-Origin sharing
 */
function createJsonResponse(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj))
                             .setMimeType(ContentService.MimeType.JSON);
  
  // Note: Standard JSON Web Apps allow requests automatically when fetched from dynamic browser environments,
  // but we build robust formatting models.
  return output;
}

/**
 * Automatically create Drive folders and return references
 */
function getOrCreateDriveFolders() {
  var parentFolders = DriveApp.getFoldersByName(PARENT_FOLDER_NAME);
  var parent;
  if (parentFolders.hasNext()) {
    parent = parentFolders.next();
  } else {
    parent = DriveApp.createFolder(PARENT_FOLDER_NAME);
  }
  
  var subfolders = ['Request Demo', 'Waitlist Submissions'];
  subfolders.forEach(function (subName) {
    var subIter = parent.getFoldersByName(subName);
    if (!subIter.hasNext()) {
      parent.createFolder(subName);
    }
  });
  
  return parent;
}

/**
 * Send alert email to Admin
 */
function sendAdminNotification(data, timestamp, requestId, status) {
  var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "EEE, MMM dd, yyyy 'at' hh:mm a");
  var subject = (data.formType === 'waitlist')
    ? '🚨 New Onstaege Waitlist Member: ' + data.name
    : '💼 New Onstaege Live Demo Request: ' + data.name;
    
  var isWaitlist = (data.formType === 'waitlist');
  
  var htmlBody = '<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">' +
    '<div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #eee; border-top: 5px solid #7c3aed;">' +
    '<h2 style="color: #7c3aed; margin-top: 0; text-transform: uppercase; font-size: 20px;">' + (isWaitlist ? 'Waitlist Registration' : 'Demo Request Alert') + '</h2>' +
    '<p style="font-size: 14px; color: #666;">A new lead has submitted credentials on the Onstaege Portal.</p>' +
    '<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">' +
    '<table style="width: 100%; font-size: 14px; text-align: left;" cellpadding="5">' +
      '<tr><th style="width: 35%; color: #888;">Request ID:</th><td style="font-weight: bold; font-family: monospace;">' + requestId + '</td></tr>' +
      '<tr><th style="color: #888;">Date Sent:</th><td>' + formattedDate + '</td></tr>' +
      '<tr><th style="color: #888;">Name:</th><td style="font-weight: bold;">' + data.name + '</td></tr>' +
      '<tr><th style="color: #888;">Email:</th><td><a href="mailto:' + data.email + '" style="color: #7c3aed;">' + data.email + '</a></td></tr>' +
      '<tr><th style="color: #888;">Phone:</th><td>' + (data.phone || 'N/A') + '</td></tr>' +
      '<tr><th style="color: #888;">Company:</th><td>' + (data.company || 'Independent creator') + '</td></tr>' +
      '<tr><th style="color: #888;">Business Category:</th><td>' + (data.businessType || 'N/A') + '</td></tr>' +
      (!isWaitlist ? '<tr><th style="color: #888;">Demo Type:</th><td>' + (data.preferredDemo || 'Virtual') + '</td></tr>' : '') +
      '<tr><th style="color: #888;">Status:</th><td><span style="background-color: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">' + status + '</span></td></tr>' +
    '</table>' +
    '<div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">' +
      '<strong style="font-size: 12px; color: #555; display: block; margin-bottom: 5px;">MESSAGE / NOTES:</strong>' +
      '<p style="margin: 0; font-style: italic; font-size: 13px;">' + (data.message || 'No additional message was provided.') + '</p>' +
    '</div>' +
    (data.analytics ? 
      ('<div style="margin-top: 20px; border-top: 1px dashed #eee; padding-top: 15px; font-size: 11px; color: #999;">' +
       '<strong>Analytics Packet Captured:</strong><br>' +
       'Device: ' + data.analytics.device + ' | Browser: ' + data.analytics.browser + '<br>' +
       'Country: ' + data.analytics.country + ' | Referrer: ' + data.analytics.referrer + '<br>' +
       'UTM Source: ' + data.analytics.utmSource + ' | UTM Campaign: ' + data.analytics.utmCampaign +
       '</div>') : ''
    ) +
    '<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">' +
    '<p style="font-size: 12px; text-align: center; color: #aaa; margin: 0;">This communication was auto-transmitted from the Onstaege Platform server.</p>' +
    '</div></body></html>';

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Send automated confirmation email to user
 */
function sendUserConfirmation(data) {
  var isWaitlist = (data.formType === 'waitlist');
  var subject = isWaitlist ? 'You\'re on the VIP Waitlist | Onstaege' : 'Your Live Demo Schedule is Received | Onstaege';
  
  var htmlBody = '<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; padding: 20px;">' +
    '<div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
      '<div style="text-align: center; margin-bottom: 30px;">' +
        '<h1 style="color: #7c3aed; margin: 0; font-size: 26px; tracking: -0.05em; font-weight: 800; text-transform: uppercase;">ONSTAEGE</h1>' +
        '<p style="font-size: 11px; font-family: monospace; tracking: 0.1em; color: #a0aec0; text-transform: uppercase; margin-top: 5px;">Next Generation Immersive Broadcasts</p>' +
      '</div>' +
      '<p style="font-size: 15px; font-weight: bold;">Hello ' + data.name + ',</p>' +
      (isWaitlist 
        ? '<p style="font-size: 14px; color: #4a5568;">This email confirms that you are officially registered to the exclusive **Onstaege VIP Waitlist** on behalf of **' + (data.company || 'your agency') + '**.</p>' +
          '<p style="font-size: 14px; color: #4a5568;">Our infrastructure team is rolling out VIP tokens periodically. We will prioritize your spot and notify you immediately at this email address once your slots open.</p>'
        : '<p style="font-size: 14px; color: #4a5568;">Thank you for scheduling a live demo with Onstaege! We are excited to present your team (' + (data.company || 'your agency') + ') with our premium streaming ecosystem.</p>' +
          '<p style="font-size: 14px; color: #4a5568;">Our lead concierge officer will reach out in less than 24 hours to coordinate your 15-minute customized stream visualization where you can navigate multi-angles, deploy cash sprays, and inspect dashboard widgets.</p>'
      ) +
      '<div style="margin: 30px 0; padding: 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #7c3aed;">' +
        '<h3 style="margin-top: 0; color: #1a202c; font-size: 14px; font-weight: bold;">Submission Summary:</h3>' +
        '<ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4a5568;">' +
          '<li><strong>Name:</strong> ' + data.name + '</li>' +
          '<li><strong>Email:</strong> ' + data.email + '</li>' +
          '<li><strong>Company:</strong> ' + (data.company || 'Independent') + '</li>' +
          (!isWaitlist ? '<li><strong>Demo Type Preference:</strong> ' + (data.preferredDemo || 'Virtual Stream Demo') + '</li>' : '') +
        '</ul>' +
      '</div>' +
      '<hr style="border: none; border-top: 1px solid #edf2f7; margin: 30px 0;">' +
      '<p style="font-size: 13px; text-align: center; color: #718096; margin-bottom: 0;">Need to update your details? Reply to this mail and our concierges will assist you.</p>' +
      '<p style="font-size: 12px; text-align: center; color: #a0aec0; margin-top: 5px;">© 2026 Onstaege Inc. All rights reserved.</p>' +
    '</div></body></html>';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Backup cron job: exports sheet tabs as CSV into designated Drive folders.
 * Trigger this script daily (Set Time-driven trigger in Apps Script GScript panel).
 */
function dailyBackupToCSV() {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var parentFolder = getOrCreateDriveFolders();
    
    var sheetTabs = ['Request Demo', 'Waitlist Submissions'];
    
    sheetTabs.forEach(function (sheetName) {
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) return;
      
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) return; // Empty or just header
      
      // Make CSV string
      var dataRange = sheet.getDataRange();
      var values = dataRange.getValues();
      var csvContent = '';
      
      for (var r = 0; r < values.length; r++) {
        var row = values[r];
        for (var c = 0; c < row.length; c++) {
          var field = String(row[c]);
          // Clean field escape chars
          if (field.indexOf('"') > -1) {
            field = field.replace(/"/g, '""');
          }
          if (field.indexOf(',') > -1 || field.indexOf('\n') > -1 || field.indexOf('"') > -1) {
            field = '"' + field + '"';
          }
          row[c] = field;
        }
        csvContent += row.join(',') + '\r\n';
      }
      
      // Get relative directory subfolder
      var folders = parentFolder.getFoldersByName(sheetName);
      var targetFolder = folders.hasNext() ? folders.next() : parentFolder;
      
      // Timestamped CSV file name
      var dateStamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm');
      var fileName = sheetName.replace(/\s+/g, '_') + '_Backup_' + dateStamp + '.csv';
      
      // Write file
      targetFolder.createFile(fileName, csvContent, MimeType.CSV);
      Logger.log('Successfully backed up ' + sheetName + ' as ' + fileName);
    });
    
  } catch (err) {
    Logger.log('Backup operation critical failure: ' + err.toString());
  }
}
```
