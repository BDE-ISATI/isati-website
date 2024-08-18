export let apiUri = "https://eqf8l881oc.execute-api.eu-west-3.amazonaws.com/Prod/"
export let bucket = "https://isati-website-s3.s3.eu-west-3.amazonaws.com"

export function getCookies(){

    let cookies = document.cookie.split(";")

    let params:{[key:string]:string} = {}
  
    for (let cookie of cookies){
        let cookiesplit = cookie.replaceAll(" ","").split("=")
        params[cookiesplit[0]] = cookiesplit[1]
    }

    return params
}

export function getIdToken(){
    return getCookies()["IdToken"]
}