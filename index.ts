import connectDB from './src/config/index.config';
import app from './src/server'

const port = 3000



app.listen(port, async() => {
    await connectDB().then(() => {
        console.log('DB Connected');
    }).catch((err) => {
        console.log(err);
    });
    console.log(`server running on port ${port}`);
})

