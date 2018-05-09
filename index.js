var events         = require('events'),
    counterService = require('./services/counter_service'),
    express        = require('express'),
    app            = express(),
    port           = process.env.PORT  || 8080;



app.all('*',(req,res) => {

    

    var vote1 =  counterService(10,'club',[ 'cat', 'rat', 'bat' ]);
    vote1.add_vote("cat");
    vote1.add_vote("cat");
    vote1.add_vote("rat");
    vote1.add_vote("cat");
  

    var vote2 =  counterService(10,'resturant',[ 'catar', 'ratar', 'batar' ]);
    vote2.add_vote("catar");
    vote2.add_vote("catar");
    vote2.add_vote("catar");
    vote2.add_vote("ratar");
    vote2.add_vote("batar");

    var votes = [];
    votes.push(vote1);
    votes.push(vote2)

    res.send(votes);
    


});

app.listen(port)
console.log('listening on port 8080');





