
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: './google.json', 
    scopes: ['https://www.googleapis.com/auth/documents'] 
});

async function writeGoogleDocs(documentId, requests) {
    try {
        const docs = google.docs({ version: 'v1', auth }); 

      
        const writer = await docs.documents.batchUpdate({
            documentId, 
            requestBody: {
                requests
            }
        });
        return writer; 
    } catch (error) {
        console.error('error', error); 
    }
}


async function readGoogleDocs(documentId) {
    try {
        const docs = google.docs({ version: 'v1', auth }); 

       
        const response = await docs.documents.get({ documentId }); 
        return response.data 
    } catch (error) {
        console.error('error', error);
    }
}


(async () => {
    
    const writer = await writeGoogleDocs('14b1bQ6YcgZYgWGFWW3w936u1raKrQ4y-73hKVDZ9Vos', [{
        insertText: {
            location: {
                index: 1 
            },
            text: "Hello saha welcome !\n" 
        }
    }]);
    console.log(writer); 

   
    const data = await readGoogleDocs('14b1bQ6YcgZYgWGFWW3w936u1raKrQ4y-73hKVDZ9Vos');
  
    console.log(data.body.content.map(d => d.paragraph?.elements[0]['textRun']));
})()