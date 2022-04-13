const path =require("path");
const md5Check =require("md5-file");
const fs=require("fs");
const glob=require("glob");
module.exports={list:listAllFileFor,files:getFiles}

var files={};
function getFiles(id)
{
    if(files[id])
        return files[id]
    return [];  
}
function listAllFileFor(id)
{
    var dir=path.join(".",id)
    if(fs.existsSync(dir))
    {
        glob(id+"/**/*",{dot:true},(er,fil)=>{
            files[id]=[];
            for(k in fil)
            {
                let p1=path.join(dir,fil[k].replace(id+"/",""))
               if(fs.existsSync(p1))
               {

               
                var stats = fs.statSync(p1);
                if(stats.isFile())
                { 
                    files[id].push({
                        name:fil[k].replace(id+"/",""),
                        md5:md5Check.sync(p1),
                        size:stats.size
                    })
                }
                else
                {
                    files[id].push({
                        name:fil[k].replace(id+"/",""),
                        md5:"",
                        size:0
                    })  
                }
            }
            }
            
        })
    }
}