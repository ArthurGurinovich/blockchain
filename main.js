 const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.nonce + this.previousHash).toString();
    }

    mineBlock(diff){
        while(this.hash.toString().substring(0, diff) !== Array(diff + 1).join('0')){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block is mined:' + this.hash);
    }

}

class Blockchain{
    constructor(){
        this.chain = [this.createInitialBlock()];
        this.diff = 3;
    }

    createInitialBlock(){
        return new Block(0, '01/01/2019', 'Initial Block Symposium', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.diff);
        this.chain.push(newBlock);
    }

    checkChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            
            const currentBlock  = this.chain[i];
            const previousBlock  = this.chain[i - 1];
            console.log(currentBlock);


            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log('Checking calcualtion hash function...');
                return false;
            }


            if(currentBlock.previousHash !== previousBlock.hash){
                console.log('Checking related hash for the blocks...');
                return false;
            }
        }

        return true; 
    }
}


let blocks = new Blockchain();

console.log('Mine block ...');
blocks.addBlock( new Block(1, '13/03/1990', { name: 'Arthur' }) );
console.log('Mine block ...');
blocks.addBlock( new Block(2, '23/04/1991', { name: 2 }) );


console.log('Is Blockchain valid?: ' + blocks.checkChainValid());

blocks.chain[1].data = { name: 5 };

console.log('Is Blockchain valid?: ' + blocks.checkChainValid());

// console.log(JSON.stringify(blocks, null, 4));
