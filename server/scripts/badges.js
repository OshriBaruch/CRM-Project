const moment = require('moment')

class badges {
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
    getClientBadges(client) {
        let NewClients = 0;
        let EmailSent = 0;
        let Outstanding = 0;
        let HottestCountries = {}
        client.map(c => {
            moment(c.firstContact).format("MMM YY") === moment().format("MMM YY") ? NewClients++ : null
            c.emailType ? EmailSent++ : null
            c.sold ? Outstanding++ : null
            HottestCountries[c.country] ? HottestCountries[c.country]++ : HottestCountries[c.country] = 1
        })
        let HottestCountry = this.sortObject(HottestCountries)[0];
        return {
            NewClients: NewClients,
            EmailSent: EmailSent,
            Outstanding: Outstanding,
            HottestCountry: HottestCountry
        }
    }
}

module.exports = badges