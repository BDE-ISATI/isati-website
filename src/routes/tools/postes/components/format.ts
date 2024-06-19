let formatting1 = (input:string) => {
    return {
        fontSize:105,
        fontWeight:500,
        color:"#1d1d1d",
        specialColor:"#dc2323",
        fontFamily:'AzoSansUber',
        textAlign:"left",
        output:input,
        letterSpacing:-6
    }
}    

let formatting2 = (input:string) => {
    return {
            fontSize:44,
            fontWeight:500,
            color:"#ffffff",
            specialColor:"#ffffff",
            fontFamily:'AzoSansBlack',
            textAlign:"left",
            output:input,
            letterSpacing:-3.5
        }
}

let formatting3 = (input:string) => {
    return {
            fontSize:33,
            fontWeight:500,
            color:"#ffffff",
            specialColor:"#ffffff",
            fontFamily:'AzoSansBold',
            textAlign:"left",
            output:input,
            letterSpacing:-2
        }
}

let formatting4 = (input:string) => {
    return {
            fontSize:50,
            fontWeight:500,
            color:"#1d1d1d",
            specialColor:"#dc2323",
            fontFamily:'AzoSansBold',
            textAlign:"left",
            output:input,
            letterSpacing:-2
        }
}

let formatting5 = (input:string) => {
    return {
            fontSize:160,
            fontWeight:500,
            color:"#1d1d1d",
            specialColor:"#dc2323",
            fontFamily:'AzoSansUber',
            textAlign:"left",
            output:input,
            letterSpacing:-6
        }
}

let formatting6 = (input:string) => {
    return {
            fontSize:44,
            fontWeight:500,
            color:"#1d1d1d",
            specialColor:"#dc2323",
            fontFamily:'AzoSansBold',
            textAlign:"left",
            output:input,
            letterSpacing:-2
        }
}

export let formatting = {
    f1 : formatting1,
    f2 : formatting2,
    f3 : formatting3,
    f4 : formatting4,
    f5 : formatting5,
    f6 : formatting6,
}