export const fetchData = async (endpoint: string) => {
    const res = await  fetch(endpoint,{
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }
    return data
}