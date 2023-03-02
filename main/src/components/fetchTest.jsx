import { useState, useEffect } from "react"

const FetchTest = (props) => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])


    // sets states from the api call result
    // items initialzed with [] such that useEffect will run once
    useEffect(() => {
        fetch("https://eldenring.fanapis.com/api/items?limit=2")    // makes api call
            .then(res => res.json())                                // parses completed promise data as json
            .then(
                (result) => {                             // load all data into state of items
                    setIsLoaded(true)
                    setItems(result)
                },
                (error) => {                              // set state of error to the error msg
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])  // this useEffect is not dependent on state, for the purpose of this example should run every time when component is present in APP

    if (error) {
        return <div>Error: {error.message}</div>        // error DOM elements
    } else if (!isLoaded) {
        return <div>Loading...</div>                    // pending/loading endpoint elements
    } else {                                                
        return <div>                                                               
            <>{items.data[0].name}</>
            <>{items.data[1].name}</>
        </div>
    }
}

export default FetchTest
