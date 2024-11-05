
let task = [
    {
        "id": "1",
        "name": "rety1",
        "description": "3456 ghf"
    },
    {
        "id": "2",
        "name": "rety2",
        "description": "3456 ghf"
    },
    {
        "id": "3",
        "name": "rety3",
        "description": "3456 ghf"
    },
    {
        "id": "4",
        "name": "rety4",
        "description": "3456 ghf"
    }
]
// let task = []

let taskI = {
        "id": 90,
        "name": "rety90",
        "description": "3456 ghf"
    }


function add (idItem, tas, tasI) {

    let item = tas.find((elem) => elem.id === idItem)

    if (!item) {tas.push(tasI)}

    else
        item.name += "489tru"

    console.log(tas, 'pol=',tasI)


}

add('2', task, taskI)



