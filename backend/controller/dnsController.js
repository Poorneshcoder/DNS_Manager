const Data = require('../models/dnsModel');

const fetchedDatas = async (req,res)=> {
    // find the data
    const data = await Data.find();
    // respond with them
    res.json(data);
};

const fetchedData = async (req,res)=>{

    // get the id off the url
    const dataId = req.params.id;

    // find the data using that id
    const data = await Data.findById(dataId);

    // respond with the data
    res.json(data);

};

const createData = async (req,res)=>{
    //get the sent in data off request body
    const {domain, recordType, ipAddress} = req.body;

    // create dns data with it
    const data = await Data.create({domain, recordType, ipAddress});

    // respond with the new data
    res.json(data);
};

const updateData =  async(req,res)=>{
    // get the id of the url
    const dataId = req.params.id;

    // get the data of the req body
    const {domain, recordType, ipAddress} = req.body;

    // find and update the record
    await Data.findByIdAndUpdate(dataId,{domain,recordType, ipAddress});


    // find update data
    const data = await Data.findById(dataId);

    // respond with it
    res.json(data);
};

const deleteData = async (req, res) => {
    try {
        // get the id from the URL parameters
        const dataId = req.params.id;

        // delete the record based on the id
        const result = await Data.deleteOne({ _id: dataId });

        // check if the record was found and deleted
        if (result.deletedCount === 1) {
            // Respond with success message if the record was deleted
            res.json({ success: "Data successfully deleted" });
        } else {
            // Respond with an error message if the record was not found
            res.status(404).json({ error: "Data not found" });
        }
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {fetchedDatas, fetchedData, createData, updateData, deleteData}