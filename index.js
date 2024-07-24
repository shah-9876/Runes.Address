const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const apiKey = process.env.UNISAT_API_KEY;

app.use(express.json());

app.get('/api/runes', async (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.status(400).json({ code: 1, msg: 'Address is required' });
    }

    const url = `https://open-api.unisat.io/v1/indexer/address/${address}/runes/balance-list`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching runes balance list:', error);
        res.status(500).json({ code: 1, msg: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
