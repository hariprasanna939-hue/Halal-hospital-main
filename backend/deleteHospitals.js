const mongoose = require("mongoose");
require("dotenv").config();

const deleteHospitals = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const Hospital = require("./models/Hospital");

        const targetNames = [
            "hari medi",
            "success hospital",
            "test hospital",
            "halamedi general hospital"
        ];

        // Case-insensitive deletion
        const result = await Hospital.deleteMany({
            name: { $in: targetNames.map(name => new RegExp(`^${name}$`, 'i')) }
        });

        console.log(`Deleted ${result.deletedCount} hospitals.`);
        process.exit(0);
    } catch (err) {
        console.error("Error deleting hospitals:", err);
        process.exit(1);
    }
};

deleteHospitals();
