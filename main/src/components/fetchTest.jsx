import { useState, useEffect } from "react"

const FetchTest = (props) => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])


    // sets states from the api call result
    // items initialzed with [] such that useEffect will run once
    useEffect(() => {
        fetch("https://eldenring.fanapis.com/api/items?limit=2")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return <div>Success!
            <>{items.data[0].name}</>
            <>{items.data[1].name}</>
        </div>
    }
}

export default FetchTest
