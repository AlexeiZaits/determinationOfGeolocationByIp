async function handleRequest(link, request, json=undefined){

    return fetch(link, {
        method: request,
        body: JSON.stringify(json),
        headers: {"Content-Type": 'application/json; charset=UTF-8'},
    })
    .then(response =>{
        if (response.ok){
           return response.json()
        }
        else{
            alert(`Не выполнен ${request}`)
            throw(`Failed in ${request} request ${link}`)
        }
    })
    .catch(error => {
        console.log(`Ошибка: ${error}`)
    })
}

export {handleRequest}