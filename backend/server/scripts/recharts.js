const moment = require('moment')

class recharts {
    sortObject(obj) {
        let footerArr = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                footerArr.push({
                    'key': prop,
                    'value': obj[prop]
                });
            }
        }
        return footerArr.sort((a, b) => { return b.value - a.value; });
    }
    sortMonth(arr) {
        let correntMonth;
        for (let i in arr) {
            correntMonth = `6 ${arr[i].key} 17 21:22 UT `
            arr[i].num = moment(correntMonth).format('L').split('/')[0]
        }
        return arr.sort((a, b) => { return a.num - b.num; });
    }
    sortDays(arr) {
        for (let i in arr) { arr[i].num = arr[i].key.split('-')[1] }
        return arr.sort((a, b) => { return a.num - b.num; });
    }
    getRecharts(client) {
        let topEmployees = {};
        let salesBy = {
            country: {},
            email: {},
            month: {},
            owner: {},
        };
        let salesSince = {};
        let clientAcquisitions = {
            corrntMonths: 0,
            lastSixMonths: 0,
            moreThanSixMonths: 0,
        }
        client.map(c => {

            c.sold ? topEmployees[c.owner] ? topEmployees[c.owner]++ : topEmployees[c.owner] = 1 : null

            c.sold ? salesBy.country[c.country] ? salesBy.country[c.country]++ : salesBy.country[c.country] = 1 : null
            c.emailType ? salesBy.email[c.emailType] ? salesBy.email[c.emailType]++ : salesBy.email[c.emailType] = 1 : null

            salesBy.month[moment(c.firstContact).format("MMM")] ? salesBy.month[moment(c.firstContact).format("MMM")]++ : salesBy.month[moment(c.firstContact).format("MMM")] = 1

            moment(c.firstContact).format("MMM YY") === moment("20180609T08").format("MMM YY") ? salesSince[moment(c.firstContact).format("MMM-D")] ?
                salesSince[moment(c.firstContact).format("MMM-D")]++ : salesSince[moment(c.firstContact).format("MMM-D")] = 1 : null

            if (moment(c.firstContact).format("MMM YY") === moment().format("MMM YY")) {
                clientAcquisitions.corrntMonths++;
            }
            else if (moment(c.firstContact).format("l").split("/")[2] === moment().subtract(6, 'month').format("l").split("/")[2] &&
                moment(c.firstContact).format("l").split("/")[0] > moment().subtract(6, 'month').format("l").split("/")[0]) {
                clientAcquisitions.lastSixMonths++
            }
            else if (moment(c.firstContact).format("l").split("/")[2] > moment().subtract(6, 'month').format("l").split("/")[2] &&
                moment(c.firstContact).format("l").split("/")[0] < moment().subtract(6, 'month').format("l").split("/")[0]) {
                clientAcquisitions.lastSixMonths++
            }
            else if (moment(c.firstContact).format("l").split("/")[2] === moment().subtract(6, 'month').format("l").split("/")[2]) {
                clientAcquisitions.moreThanSixMonths++
            }
        })

        salesBy.country = this.sortObject(salesBy.country)
        salesBy.email = this.sortObject(salesBy.email)
        salesBy.owner = this.sortObject(topEmployees)
        salesBy.month = this.sortMonth(this.sortObject(salesBy.month))

        return {
            clientAcquisitions: this.sortObject(clientAcquisitions),
            salesBy: salesBy,
            salesSince: this.sortDays(this.sortObject(salesSince)),
            topEmployees: this.sortObject(topEmployees).slice(0, 3)
        }
    }
}

module.exports = recharts