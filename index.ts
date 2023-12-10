import * as fs from 'fs';
export class ErroJsonTalieh {

    private createFile() {
        let obj = Object.create({})
        fs.writeFileSync(`${process.cwd()}/err.json`, JSON.stringify(obj))
        // console.log('sakhte shud ')
    }

    private checkJsonErrfileHasExist() {
        return !!fs.readdirSync(`${process.cwd()}`).includes('err.json')
    }
    private writeToFile(errJson: string) {
        let errjsonfile = fs.readFileSync(`${process.cwd()}/err.json`, 'utf-8')
        let file = JSON.parse(errjsonfile)
        console.log(file)
        let newOBJ = Object.assign(file, JSON.parse(errJson))
        console.log(newOBJ)
        return fs.writeFileSync(`${process.cwd()}/err.json`, JSON.stringify(newOBJ))


    }

    public addErr(stausCode: number, info: string) {

    }
    public checkFront(responseCode?: number, message?: string) {
        if (this.checkJsonErrfileHasExist()) {
            let errjson = fs.readFileSync('./err.json', 'utf-8')
            if (errjson) {
                let erfile = JSON.parse(errjson)
                console.log(erfile)
                for (let i in erfile) {
                    if (responseCode === +i) {
                        console.debug("Has Exsit")
                        return (erfile[i])
                    } else {
                        let obj = {
                            [String(responseCode)]: {
                                info: message,
                                message: ''
                            }
                        }
                        this.writeToFile(JSON.stringify(obj))
                    }
                }
            }
        } else {
            this.createFile()
        }
    }

}
let err = new ErroJsonTalieh()
err.checkFront(10010, 'asd')