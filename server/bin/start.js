import fs from 'fs'
import concurrently from 'concurrently'

async function run(){

  const params = ['npm run server'];

  if (fs.existsSync('../client')) 
    params.push('npm run client');
    
  concurrently(params);

}

run();