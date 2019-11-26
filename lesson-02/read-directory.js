(dir => {
  const fs = require("fs")
  const readDir = path => new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
    })
  })

  const stat = path => new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
          if(err){
              reject(err)
          }else{
              resolve(stats)
          }
      })
  })

  const isDirectory = async file => {
      const stats = await stat(file)
      return stats.isDirectory() ? file : false      
  }
  
  const execute = async () =>{
      const files = await readDir(dir);
      const possibleDirectories = await Promise.all(files.map(file => isDirectory(file)))
      const directories = possibleDirectories.filter(val => val)
      console.log(directories)
  }
  execute()
})(".");
