const mongoose = require('mongoose');

const dnsSchema = new mongoose.Schema({
    domain: String,
    recordType: String,
    ipAddress: String
});

module.exports = mongoose.model("DNSRecord", dnsSchema);