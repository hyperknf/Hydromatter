const fs = require("fs")

module.exports = class Database {
    static fs = fs
    
    constructor() {
        this.directory = "./assets/database.json"
        this.data = {}
        if (!fs.existsSync(this.directory)) {
            fs.writeFileSync(this.directory, "{}", "utf-8")
        } else {
            this.data = JSON.parse(fs.readFileSync(this.directory).toString())
        }
    }

    check() {
        const data = JSON.parse(fs.readFileSync(this.directory).toString())
        if (typeof data != "object") {
            this.data = {}
            this.save(this.data)
        }
    }

    save(data) {
        fs.writeFileSync(this.directory, JSON.stringify(data, null, 4), "utf-8")
    }

    get(item) {
        this.check()
        let object = this.data
        const properties = item.split('.')
        let index = 0
        for (; index < properties.length; ++index) {
            object = object && object[properties[index]]
        }
        return object
    }

    has(item) {
        this.check()
        return !(typeof this.get(item) == "undefined")
    }

    set(item, value) {
        this.check()
        let object = this.data
        const properties = item.split('.')
        let index = 0
        for (; index < properties.length - 1; ++index) {
            object = object[properties[index]]
        }
        object[properties[index]] = value
        this.save(this.data)
    }

    delete(item) {
        this.check()
        delete this.data[item]
        this.save(this.data)
    }

    clear() {
        this.data = {}
        this.save(this.data)
    }

    getRawJSON() {
        this.check()
        return this.data
    }

    getStringJSON() {
        this.check()
        return JSON.stringify(this.data)
    }
}