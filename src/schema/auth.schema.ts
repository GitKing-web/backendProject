import { z } from 'zod'

const SignUpSchema = z.object(
    {
        username: z.string().min(3, 'Username must be more than 3 characters.').max(50),
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters or more'),
        confirmPassword: z.string().min(8)
    }
).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

const SignInSchema = z.object(
    {
        identifier: z.string().min(3),
        password: z.string().min(8)
    }
).refine(data => {
    return data.identifier.includes('@') ? z.string().email().safeParse(data.identifier) : data.identifier.length >= 3
}
)

export default { SignInSchema, SignUpSchema}