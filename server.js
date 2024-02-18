const express = require('express');
const { ReclaimClient } = require('@reclaimprotocol/js-sdk');

const app = express();
const port = 3000;

// Create Reclaim client instance
const reclaimClient = new ReclaimClient("0xf18F39F750Fb27c895ECf72aF778A9a9391b538D");

// Route to fetch data from the provider
app.get('/fetchData', async (req, res) => {
    try {
        const providers = [
            '226c9a5c-e093-497f-b32a-921d6e42b671', // LeetCode proofCheck
        ];
        const APP_SECRET = "0x47aab178d15f42aa9f437e711d60744454778cfd28a577027d5af920cb24579a"; // your app secret key.
        const providerV2 = await reclaimClient.buildHttpProviderV2ByID(providers);
        const requestProofs = reclaimClient.buildRequestedProofs(providerV2, reclaimClient.getAppCallbackUrl());
        reclaimClient.setSignature(await reclaimClient.getSignature(requestProofs, APP_SECRET));
        const reclaimReq = await reclaimClient.createVerificationRequest(providers);
        const url = await reclaimReq.start();
        
        res.json({ url }); // Send the URL back to the client
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data from the provider' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
