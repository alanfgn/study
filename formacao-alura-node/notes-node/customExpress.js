import consign from "consign"
import express from "express"

module.exports = () => {
    const app = express()

    consign()
        .include('controllers')
        .into(app)

    return app

}