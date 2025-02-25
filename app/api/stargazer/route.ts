import { NextResponse} from 'next/server'
import { getStargazers } from '@/features/stargazer/lib/get-stargazer';

export const GET = async () => {
    const data = await getStargazers({owner: "ali-hussein-dev", repo: "deepreact"}).catch(console.error)
    return NextResponse.json(data)
}