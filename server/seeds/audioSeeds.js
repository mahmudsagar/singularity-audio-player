import dotenv from 'dotenv';

import {AudioModel} from '../model/audio.js';
import files from './audio/data.js';
import connect from '../db/dbConfig.js';
// const emails = require('./email/data');
// const mongo = require('../model/mongo');
// const Email = require('../model/email').schema;
dotenv.config();
async function seed(){

  try {

    await connect();
    await AudioModel.insertMany(files);
    console.log('✅ Database seeded')
    return process.exit(0)

  }
  catch (err){

    console.error(err);
    return process.exit(1)

  }
}

seed();