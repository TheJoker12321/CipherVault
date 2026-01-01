export function atbashEncript(text) {

    const realLetter = ['A', 'B', 'C', 'D',
                        'E', 'F', 'G', 'H', 
                        'I', 'J', 'K', 'L', 
                        'M', 'N', 'O', 'P', 
                        'Q', 'R', 'S', 'T', 
                        'U', 'V', 'W', 'X', 
                        'Y', 'Z']

    let newText = ""
    for (let char of text) {
        

        if (char === " ") {

            newText += char

        } else if (char === char.toUpperCase() && !Number(char)) {

            const indexChar = realLetter.indexOf(char)
            newText += realLetter[realLetter.length - 1 - indexChar]
        
        } else if (char === char.toLowerCase() && !Number(char)) {
            
            const indexChar = realLetter.indexOf(char.toUpperCase())
            newText += realLetter[realLetter.length - 1 - indexChar].toLowerCase()

        } else {
            
            newText += char
        
        }

    }

    return newText

}


