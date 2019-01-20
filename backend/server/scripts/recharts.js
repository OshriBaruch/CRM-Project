const moment = require('moment')

class recharts {
    sortObject(obj) {
        let footerArr = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                footerArr.push({
                    'key': prop,
                    'value' : obj[prop]
                });
            }
        }
        return footerArr.sort((a, b) => { return b.value - a.value; });
    }
    getRecharts(client) {
        let topEmployees = {};
        let salesBy = {};
        let salesSince = {};
        let clientAcquisitions = {
            corrntMonths: 0,
            lastSixMonths: 0,
            moreThanSixMonths: 0,
        }
        client.map(c => {

            c.sold ? topEmployees[c.owner] ? topEmployees[c.owner]++ : topEmployees[c.owner] = 1 : null

            salesBy[c.country] ? salesBy[c.country]++ : salesBy[c.country] = 1

            moment(c.firstContact).format("MMM YY") === "Jun 17" ? salesSince[moment(c.firstContact).format("MMM-D")] ?
                salesSince[moment(c.firstContact).format("MMM-D")]++ : salesSince[moment(c.firstContact).format("MMM-D")] = 1 : null

            if (moment(c.firstContact).format("MMM YY") === moment().format("MMM YY")) {
                clientAcquisitions.corrntMonths++
            }
            else if (moment(c.firstContact).format("l").split("/")[2] === moment().subtract(6, 'month').format("l").split("/")[2] &&
                moment(c.firstContact).format("l").split("/")[0] > moment().subtract(6, 'month').format("l").split("/")[0]) {
                clientAcquisitions.lastSixMonths++
                
            }
            else if (moment(c.firstContact).format("l").split("/")[2] > moment().subtract(6, 'month').format("l").split("/")[2] &&
                moment(c.firstContact).format("l").split("/")[0] < moment().subtract(6, 'month').format("l").split("/")[0]) {
                clientAcquisitions.lastSixMonths++
            }
            else {
                clientAcquisitions.moreThanSixMonths++
            }
        })
        return {
            clientAcquisitions: this.sortObject(clientAcquisitions),
            salesBy: this.sortObject(salesBy).slice(0, 7),
            salesSince: this.sortObject(salesSince),
            topEmployees: this.sortObject(topEmployees).slice(0, 3)
        }
    }
}

module.exports = recharts