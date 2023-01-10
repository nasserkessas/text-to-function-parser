const math_text = "cos(3(x+2)) + (2x+4)/3";

// const findMaxLevel = (chars: string[]): number {
//     let maxLevel: number = 0;
//     let level: number = 0;
//     for (let char of chars) {
//         if (char == "(") {
//             level++;
//             if (level > maxLevel) maxLevel = level;
//         }
//         else if (char == ")") { level--; }
//     }
//     return maxLevel;
// }

type Section = {
    thisLevel: string[];
    aboveSections: string[][] | null;
}

const splitSection = (chars: string[]): Section => {
    let aboveSections: string[][] = [];
    let level: number = 0;
    let aboveLevel: boolean = false;
    let captureGroup: number = 0;
    let thisLevel: string[] = [];

    for (let char of chars) {
        if (char == "(") {
            level++;
            if (level == 1) {
                captureGroup++;
                thisLevel.push(char);
                continue;
            }
        }
        else if (char == ")") {
            level--;
            if (level == 0) {
                thisLevel.push(char);
                continue;
            }
        }

        if (level >= 1) {
            if (!aboveLevel) { aboveSections.push([]); thisLevel.push(`\\${captureGroup}`)}
            aboveLevel = true;
        }
        else aboveLevel = false

        if (aboveLevel) {
            aboveSections[captureGroup - 1].push(char);
        }
        else {
            thisLevel.push(char)
        }
    }

    return { thisLevel, aboveSections };  
}

const parse = (text: string): void => {

    const chars = text.split("").filter(c => c !== " ");
    const out = parse_level(chars)

    // return out;

}

const parse_level = (chars: string[]): void => {

    const { thisLevel, aboveSections }: Section = splitSection(chars)
    console.log(thisLevel);

    if (aboveSections){
        for (let section of aboveSections) {
            parse_level(section);
        }
    }

}

console.log(`${JSON.stringify(parse(math_text))}`);