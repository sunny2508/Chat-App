import "dotenv/config";
import connectDB from "./database/db.js";
import app from "./app.js";
const port = process.env.PORT || 5000;
const getConnection = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server started at port ${port}`);
        });
    }
    catch (error) {
        console.log("Error occured in starting server", error);
    }
};
getConnection();
//# sourceMappingURL=index.js.map