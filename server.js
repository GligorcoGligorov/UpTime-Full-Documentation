const express = require('express')
const cors = require('cors')

const axios = require('axios');

const app = express()
const port = 3000

app.use(cors());


app.get('/api/getData', async (req, res) => {
    const url = req.query.url;

    const response =
        await fetch(url)
            .then(async response => {
                if (response.status === 200) {
                    const html = await response.text();
                    res.send({ status: response.status, html });
                   
                    
                } else {
                    res.send({ status: 'Bad Request' });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(400).send({ status: "Bad Request", error: error.message });
            });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})