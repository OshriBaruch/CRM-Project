const moment = require('moment')

class recharts {
    constructor(clients) {
        this.clients = clients
        this.topEmployees = {};
        this.salesSince = {};
        this.salesBy = {
            country: {},
            email: {},
            month: {},
            owner: {},
        };
        this.clientAcquisitions = {
            corrntMonths: 0,
            lastSixMonths: 0,
            moreThanSixMonths: 0,
        }
    }
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
    generateTopEmployees(c) {
        c.sold ? this.topEmployees[c.owner] ? this.topEmployees[c.owner]++ : this.topEmployees[c.owner] = 1 : null
    }
    generateSalesBy(c) {
        c.sold ? this.salesBy.country[c.country] ? this.salesBy.country[c.country]++ : this.salesBy.country[c.country] = 1 : null

        c.sold ? this.salesBy.owner[c.owner] ? this.salesBy.owner[c.owner]++ : this.salesBy.owner[c.owner] = 1 : null

        c.emailType ? this.salesBy.email[c.emailType] ? this.salesBy.email[c.emailType]++ : this.salesBy.email[c.emailType] = 1 : null

        this.salesBy.month[moment(c.firstContact).format("MMM")] ?
            this.salesBy.month[moment(c.firstContact).format("MMM")]++ : this.salesBy.month[moment(c.firstContact).format("MMM")] = 1
    }
    generateSalesSince(c) {
        moment(c.firstContact).format("MMM YY") === moment("20180609T08").format("MMM YY") ? this.salesSince[moment(c.firstContact).format("MMM-D")] ?
            this.salesSince[moment(c.firstContact).format("MMM-D")]++ : this.salesSince[moment(c.firstContact).format("MMM-D")] = 1 : null
    }

    generateClientAcquisitions(c) {
        const iמTheLastMonth = () => moment(c.firstContact).format("MMM YY") === moment().format("MMM YY")
        const inSixMonthsAndSameYear = () => moment(c.firstContact).format("l").split("/")[2] === moment().subtract(6, 'month').format("l").split("/")[2] &&
            moment(c.firstContact).format("l").split("/")[0] > moment().subtract(6, 'month').format("l").split("/")[0]
        const inSixMonthsAndNotSameYear = () => moment(c.firstContact).format("l").split("/")[2] > moment().subtract(6, 'month').format("l").split("/")[2] &&
            moment(c.firstContact).format("l").split("/")[0] < moment().subtract(6, 'month').format("l").split("/")[0]
        const moreThenSixMonths = () => moment(c.firstContact).format("l").split("/")[2] === moment().subtract(6, 'month').format("l").split("/")[2]

        if (iמTheLastMonth()) this.clientAcquisitions.corrntMonths++;
        else if (inSixMonthsAndSameYear()) this.clientAcquisitions.lastSixMonths++
        else if (inSixMonthsAndNotSameYear()) this.clientAcquisitions.lastSixMonths++
        else if (moreThenSixMonths()) this.clientAcquisitions.moreThanSixMonths++
    }

    getRecharts() {
        this.clients.map(client => {
            this.generateTopEmployees(client)
            this.generateSalesBy(client)
            this.generateSalesSince(client)
            this.generateClientAcquisitions(client)
        })
        return {
            clientAcquisitions: this.sortObject(this.clientAcquisitions),
            salesBy: {
                country: this.sortObject(this.salesBy.country),
                email: this.sortObject(this.salesBy.email),
                owner: this.sortObject(this.salesBy.owner),
                month: this.sortObject(this.salesBy.month)
            },
            salesSince: this.sortDays(this.sortObject(this.salesSince)),
            topEmployees: this.sortObject(this.topEmployees).slice(0, 3)
        }
    }
}

module.exports = recharts