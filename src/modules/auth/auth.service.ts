import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createUser = async (data: any) => {
    const result = await prisma.users.create(
        {
            data,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                contact_no: true,
                about_user: true,
                profile_img: true,
            },
        }

    );
    return result
}

export const authService = { createUser }