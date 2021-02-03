const { Seeder } = require('mongo-seeding');
const path = require('path');

const url = 'mongodb://localhost:27017/etsy';

const config = {
  database: process.env.MONGO_URL || url,
  dropDatabase: !process.env.MONGO_URL,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve(__dirname));

const seed = async () => seeder.import(collections);
seed();
