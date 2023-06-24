import express from "express";
import cors from "cors";

import { swaggerUI, swaggerSpecs } from "./config/swagger.js";

import { currencyList, withdrawConfig, oneDay } from "./assets/dataChunk.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

const PORT = 3000;

app.listen(3000, () => {
    console.log(`port: ${PORT} express init`)
});

app.get("/currencyPairs", (_, response) => {
    response.send(currencyList);
});

app.get("/24hr/:symbol", (request, response) => {
    let result = oneDay;
    const { params: { symbol } } = request;
    if (!/^(all)$/ig.test(symbol)) {
        result = result.filter(info => info.symbol === symbol);
    }
    response.send(result);
});

app.get("/withdrawConfigs", (request, response) => {
    let result = withdrawConfig;
    const { query: { assetCode } } = request;
    if (assetCode) {
        result = result.filter(info => info.assetCode === assetCode);
    }
    response.send(result);
});