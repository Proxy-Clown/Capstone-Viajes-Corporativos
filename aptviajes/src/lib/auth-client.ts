import{ createAuthClient} from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})
const session = await authClient.getSession()
console.log(session)