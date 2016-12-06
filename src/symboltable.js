class ItemTable {
    constructor() {
        this.items = new Object();
    }

    putItem(item, property) {
        this.items[item] = property;
    }

    removeItem(item) {
        delete this.items[item];
    }

    hasItem(item) {
        return item in this.items;
    }

    getProperty(item) {
        if (hasItem(item)) {
            return this.items[item];
        }
        return null;
    }
}

class SymbolTable {
    constructor() {
        this.constants = new ItemTable();
        this.functions = new ItemTable();
    }
}

export default SymbolTable;