class InscriptionUserService {

    url = "http://localhost:8080/register";

    postUser = ((callBack, errorCallBack, firstName, lasttName, mail, password) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": mail,
        "password": password,
        "firstname": firstName,
        "lastname": lasttName
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(this.url, requestOptions)
        .then(response => response.json())
        .then(result => callBack(result))
        .catch(error => errorCallBack(error));
            })

}

export const inscriptionUserService = new InscriptionUserService();