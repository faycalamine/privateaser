'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
var bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
var events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
var actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

function booker()
{
 
  for(var i in events)
  {
    var temp_id= events[i].barId;
    var temp_price=0;
    for(var j in bars)
    {
      if( bars[j].id === temp_id  )
      {
        temp_price = (bars[j].pricePerHour)*events[i].time + (bars[j].pricePerPerson)*events[i].persons;
        events[i].price = temp_price;
      }

    }

  }
  return;
}
function discount()
{
  for(var i in events)
  {
    var nbs_personnes = events[i].persons;
    if(nbs_personnes>=10 && nbs_personnes<20 ){ events[i].price=events[i].price*0.9;}
    if(nbs_personnes>=20 && nbs_personnes<60){ events[i].price=events[i].price*0.7;}
    if(nbs_personnes>=60){events[i].price=events[i].price*0.5;}
  }
  return;
}
function give_money()
{
  for(var i in events)
  {
    var original_price = events[i].price;
    events[i].commission.insurance = 0.15*original_price;
    events[i].commission.treasury = events[i].persons;
    events[i].commission.privateaser = original_price - events[i].commission.insurance -  events[i].commission.treasury;

  }
  return;
}
function applyDeductible()
{
  for(var i of events)
  {
    if(i.options.deductibleReduction === true)
      {
          i.commission.privateaser = i.persons;
      }
   
  }
  return;
}
/*
function PayActors()
{
  for(var i of events)
  {
    for(var j of actors)
    {
      if(i.id===j.eventId)
      {
        
      }
    }
  }
  return;
}*/
booker();
discount();
give_money();
applyDeductible();


console.log(bars);
console.log(events);
console.log(actors);