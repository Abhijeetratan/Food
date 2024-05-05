const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://doctor123:doctor123@cluster0.nnxbqud.mongodb.net/your_database_name`;

module.exports = function () {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("Connected to MongoDB");
                const foodCollection = mongoose.connection.db.collection("food_items");
                const categoryCollection = mongoose.connection.db.collection("Categories");

                Promise.all([foodCollection.find({}).toArray(), categoryCollection.find({}).toArray()])
                    .then(([foodData, categoryData]) => {
                        resolve({ foodData, categoryData });
                    })
                    .catch((err) => {
                        console.error("Error fetching data from collections:", err);
                        reject(err);
                    });
            })
            .catch((err) => {
                console.error("Error connecting to MongoDB:", err);
                reject(err);
            });
    });
};
