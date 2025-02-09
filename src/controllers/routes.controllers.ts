import { Request, Response } from "express";
import User from "../models/User.models";
import authSchema from "../schema/auth.schema";

export const sayHola = (req: Request, res: Response) => {
    res.json('Hola from express and Bun')
}

export const handleSignUp = async (req: Request, res: Response): Promise<any> => {
    try {
        const validatedData = authSchema.SignUpSchema.safeParse(req.body);
        
        if (!validatedData.success) {
            return res.status(403).json({ message: validatedData.error?.issues });
        }
            
        const { username, email, password, confirmPassword } = validatedData.data;
            
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Fields cannot be empty.' });
        }

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use, pick another' });
        }

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ username, email, password });
    
        await user.save();
        return res.status(201).json({ message: 'User created successfully.' });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const handleSignIn = async(req: Request, res: Response): Promise<any> => {
    try {
        const validatedData = authSchema.SignInSchema.safeParse(req.body)
        if(!validatedData.success){
            return res.status(403).json({ errors: validatedData.error?.issues})
        }

        const { identifier, password } = validatedData.data;

        const user = await User.findOne({
            $or: [{username: identifier}, { email: identifier}]
        })

        if(!user){
            res.status(403).json({ message: 'Incorrect username/email or password'})
        }

        const isPasswordCorrect = await user?.comparePassword(password)

        if(!isPasswordCorrect){
            res.status(403).json({ message: 'Incorrect username/email or password'})
        }

        return res.status(200).json({ message: 'Login Successful, Redirecting to Dashboard'})

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error ", error })
    }
}
