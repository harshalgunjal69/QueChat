import getPrismaInstance from "../utils/PrismaClient"

export const checkUser = async (req, res, next) => {
    try {
        const {email} = req.body
        if(!email) {
            return res.status(400).json({message: 'Email is required', status:false})
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({where:{email}});
        if (!user) {
            return res.status(400).json({message: 'User not found', status:false})
        }
        else {
            return res.status(200).json({message: 'User found', status:true, data:user})
        }
    } catch (err) {
        next(err)
    }
}