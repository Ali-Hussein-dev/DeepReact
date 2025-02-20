"use server"
import type { ActionResponse } from '@/types/action-response';
import { Redis } from "@upstash/redis";
import * as z from 'zod';

const formSchema = z.object({
    email: z.string().email(),
})


const redis = Redis.fromEnv();

export const earlyAccessAction = async (_prvState: ActionResponse | null, data: FormData): Promise<ActionResponse> => {

    const entries = data.entries()
    const rawData = Object.fromEntries(entries) as Record<string, unknown>

    // convert 'on' values to boolean
    for (const key in rawData) {
        if (rawData[key] === 'on') {
            rawData[key] = true
        }
    }

    // validate inputs data with zod schema
    const validatedData = formSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            success: false,
            message: 'Invalid data',
            errors: validatedData.error.flatten().fieldErrors,
            inputs: rawData,
        }
    }
    // store email in redis set
    await redis.sadd('early-access-emails', validatedData.data)

    return {
        success: true,
        message: 'Email added to waiting list',
    }
}