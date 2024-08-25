import {useState , useEffect} from 'react'


// Custom hook for managing state synchronized with local storage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)){

    // Initialize the state with a value from local storage or the initial value
    const [value , setValue] = useState<T>(() => {

        // Retrieve the current value from local storage
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

   // If the initialValue is a function, call it to get the initial value
        if( typeof initialValue === 'function'){
            return (initialValue as () => T)()
        }
        else{
            return initialValue
        }
    })

    // Effect hook to update local storage whenever the state changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue] as [typeof value, typeof setValue]
}