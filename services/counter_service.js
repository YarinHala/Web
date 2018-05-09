var events = require('events');

class counter_Services extends events.EventEmitter {
    constructor(max,sub,categories){
        super();
        this.max_vote = max;
        this.cur_vote = 0;
        this.vote_sub = sub;
        this.sub_categories = [];
        this.vote_log = "Fire Events:start ,";
        for(var i = 0; i < categories.length ; i++) {
            this.sub_categories.push([categories[i],0]);      
        }
        
    }
    add_vote(categorie){
        for(var i = 0; i <  this.sub_categories.length ; i++) {
            if(this.sub_categories[i][0] == categorie && this.max_vote >= this.cur_vote){
                this.sub_categories[i][1] = this.sub_categories[i][1] + 1;   
                this.cur_vote = this.cur_vote + 1;
                this.emit('changeAccourd');
            } 
            else{
                this.emit('not_vote');
            }
        }
        
    }
    reset_vote(){
        for(var i = 0; i <  this.sub_categories.length ; i++) {
                this.sub_categories[i][1] = 0;   
        } 
        this.emit('changeAccourd');
    }
    show_all_vote(){
        this.emit('showAll');
    }

    getSub(){
        return this.sub;
    }

    /*callback FireEvents*/
    displaySub(){
        console.log(`Fire Events:start ,\n`);
        console.log(`subject:${this.vote_sub}`);
        this.vote_log += `subject:${this.vote_sub} ,\n`
    
    }
    displayVotes(){
        console.log(`subject:${this.sub_categories}`);
        this.vote_log += `subject:${this.sub_categories} ,\n`
    }
    checkMaxVotes(){
        if(this.max_vote == this.cur_vote){
            console.log(`Reach Max Votes ${this.max_vote} == ${this.cur_vote}`);
            this.vote_log = `Reach Max Votes ${this.max_vote} == ${this.cur_vote} ,\n`
        }
        else{
            console.log(`Max Votes ${this.max_vote} > ${this.cur_vote}`);
            this.vote_log += `Max Votes ${this.max_vote} > ${this.cur_vote} ,\n`
        }
        console.log(`Fire Events:end`);
        this.vote_log += `Fire Events:end ,\n`
    }
}

/*createing and exporting an Enstances*/
module.exports = (max,sub,categories) => {
    var vote = new counter_Services(max,sub,categories);
        vote.on("changeAccourd",vote.displaySub);
        vote.on("changeAccourd",vote.displayVotes);
        vote.on("changeAccourd",vote.checkMaxVotes);
        return vote;
}

