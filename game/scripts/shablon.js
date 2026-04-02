let player =[{
    name: "",
    hp:true,
    position_x: 0,
    position_y: 0,
    speed: 1,
    skin:"../",
}];

let enemy =[
{
    type: "boulder",   
    physics: falls,
    speed: 2,
    speed_attack: 2,
    skin:"../",
},
{
    type: "spike",   
    physics: block,
    speed: 0,
    speed_attack: 0,
    skin:"../",
},
{
    type: "shooter",   
    physics: block,
    speed: 0,
    speed_attack: 0.25,
    skin:"../",
},
{
    type: "arrow",   
    physics: fly,
    speed: 0.75,
    speed_attack: 0,
    skin:"../",
},
{
    type: "spike",   
    physics: block,
    speed: 0,
    speed_attack: 0,
    skin:"../",
}
];





