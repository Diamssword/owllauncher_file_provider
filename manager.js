
const fs= require('fs');
const path= require('path');
const filesWatcher= require('./filesWatcher');
module.exports={update:updatePacks,getPack:fillPackInfos};

var packs=[];
function fillPackInfos(id,req)
{
        var d=getPackInfos(id)
        var res= {
            install:{
                name:d.name,
                minecraft:d.minecraft,
                forge:d.forge,
                desc:d.desc,
                icon:d.icon,
                syncUrl:"http://"+req.headers.host+"/"+d.id+"/sync/",
                JVMarg:d.JVMarg
            },
            profile:{
                id:d.id
            }
        }
        return res;
}
function getPackInfos(pack)
{
    for(k in packs)
    {
        if(packs[k].id==pack)
            return Object.assign({},packs[k]);
    }
    return Object.assign({},packs[0]);
}
function initBaseFiles()
{
        fs.writeFileSync(path.join('.','configs.json'),defaultConfig());    
}

function defaultConfig()
{
return JSON.stringify([{name:"The pack name",
      desc:"a descritpion of the pack"    ,
      icon:"an url to an icon",
      id:"ThePackID_MustBeUnique",
      minecraft:"1.12.2",
      forge: "14.23.5.2855",
      JVMarg:""
}])

}

function updatePacks()
{
 
    if(!fs.existsSync(path.join('.','configs.json')))
        initBaseFiles();
    else
    {
        packs=JSON.parse(fs.readFileSync(path.join('.','configs.json')).toString())
    }
    for(k in packs)
    {
        
        if(!fs.existsSync(packs[k].id))
            fs.mkdirSync(packs[k].id);
        filesWatcher.list(packs[k].id);
    }

}
var interval=process.env.checkinterval;
if(isNaN(interval))
{
interval=10;    
}

setInterval(()=>{updatePacks()},interval*1000);


/*
  name:res1.install.name,
               minecraft:res1.install.minecraft,
               desc:res1.install.desc,
               icon:res1.install.icon,
               id:res1.profile.id,

*/