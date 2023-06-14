const root = "192.168.120.29:3000/upload"
export const upload = (uri)=> {
    console.log(uri)
    const data = new FormData();
    data.append('photo', {
        uri: uri,
        type: 'image/jpeg',
        name: uri.split("/").pop()
     });
     console.log(JSON.stringify(data))
    fetch(root, {
                method: 'POST',
                body: data
    }).then(
        alert("Zapisano")
    )
}

export const uploadMultiple = (selected)=> {
   for(let uri of selected) {

    const data = new FormData();
    data.append('photo', {
        uri: uri,
        type: 'image/jpeg',
        name: uri.split("/").pop()
     });

    fetch(root, {
                method: 'POST',
                body: data
    }).then(
        alert("Zapisano")
    )
   }
  
}