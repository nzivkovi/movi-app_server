import fs from "fs";
import { getDatabase } from '../db/mongo.js';
import { ObjectId } from 'mongodb';

const collectionName = 'movies';
var moviesLimit = 20;
const options1 = { sort: {"title": 1}};
const options2 = { sort: {"year": -1}};
var sortedByTitleAlphabetically = false;
var sortedByPublicationYearDescending = false;

// function that initially load movies from /resources/movies.json to db
export async function insertMovies() {
  const movies = JSON.parse(fs.readFileSync('./resources/movies.json'));
  const database = await getDatabase();
  await database.collection(collectionName).insertMany(movies);
}

// functions below are for automatic usage, so because of that they doesn't have safeguards
export async function getMovies(queryValue) {
  const database = await getDatabase();
  moviesLimit = 20;
  sortedByTitleAlphabetically = false;
  sortedByPublicationYearDescending = false;
  var query = {};
  if(queryValue != null){
    let reg = ".*" + queryValue.toString() + ".*";
    query = { "title": { $regex: reg}};
  }
  return await database.collection(collectionName).find(query).limit(moviesLimit).toArray();
}

export async function getMoreMovies(queryValue) {
  const database = await getDatabase();
  moviesLimit = moviesLimit + 20;
  var query = {};
  if(queryValue != null){
    let reg = ".*" + queryValue.toString() + ".*";
    query = { "title": { $regex: reg}};
  }
  if(sortedByTitleAlphabetically){
    return await database.collection(collectionName).find(query, options1).limit(moviesLimit).toArray();
  } else if (sortedByPublicationYearDescending){
    return await database.collection(collectionName).find(query, options2).limit(moviesLimit).toArray();
  } else {
    return await database.collection(collectionName).find(query).limit(moviesLimit).toArray();
  }
}

export async function getMoviesSortedByTitleAlphabetically(queryValue) {
  const database = await getDatabase();
  moviesLimit = 20;
  sortedByTitleAlphabetically = true;
  if(sortedByPublicationYearDescending) {
    sortedByPublicationYearDescending = false;
  }
  var query = {};
  if(queryValue != null){
    let reg = ".*" + queryValue.toString() + ".*";
    query = { "title": { $regex: reg}};
  }
  return await database.collection(collectionName).find(query, options1).limit(moviesLimit).toArray();
}

export async function getMoviesSortedByPublicationYearDescending(queryValue) {
  const database = await getDatabase();
  moviesLimit = 20;
  sortedByPublicationYearDescending = true;
  if(sortedByTitleAlphabetically){
    sortedByTitleAlphabetically = false;
  }
  var query = {};
  if(queryValue != null){
    let reg = ".*" + queryValue.toString() + ".*";
    query = { "title": { $regex: reg}};
  }
  return await database.collection(collectionName).find(query, options2).limit(moviesLimit).toArray();
}

export async function getMovie(id) {
  const database = await getDatabase();
  const options = {projection: { "_id": 0, "rank": 0, "director": 0, "writer": 0, "imdbRating": 0, "actors": 0}}
  moviesLimit = 20;
  sortedByTitleAlphabetically = false;
  sortedByPublicationYearDescending = false;
  return await database.collection(collectionName).findOne({ _id : ObjectId(id)}, options);
}

// functions below will be used manually on admin level and because of that they have safeguards
export async function insertMovie(movie) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(movie);
  return insertedId;
}

export async function updateMovie(id, body) {
  const database = await getDatabase();
  delete body._id;
  try {
    const update = await database.collection(collectionName).updateOne({_id: ObjectId(id)}, {$set: body});
    if(update.matchedCount == 1){
      return {StatusCode: 200, Body: await database.collection(collectionName).findOne({ _id : ObjectId(id)})};
    } else {
      return {StatusCode: 404, Body: "Not found"};
    }
  } catch (error) {
    console.log(error);
    return {StatusCode: 500, Body: "Internal Server Error"};
  }
}

export async function deleteMovie(id) {
  const database = await getDatabase();
  try {
    const remove = await database.collection(collectionName).deleteOne({_id: ObjectId(id)});
    if(remove.deletedCount == 1){
      return {StatusCode: 204, Body: "Ok"};
    } else {
      return {StatusCode: 404, Body: "Not found"};
    }
  } catch (error) {
    console.log(error);
    return {StatusCode: 500, Body: "Internal Server Error"};    
  }
}