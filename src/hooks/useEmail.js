import {useApolloLocalStorage} from "./apolloLocalStorage"
import {emailKey} from "apollo/cacheKeyFunctions"
import { useCallback } from "react"
 
export const useEmail = () => {
    const [storageEmail, setStorageEmail] = useApolloLocalStorage(emailKey)
    const email = storageEmail.email
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setEmail = useCallback((value) => setStorageEmail({email: value}))
    return [email, setEmail]
}