const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const auth = require('../../middlewares/auth');
const { parseGameData } = require('../../src/parsers');
const { getNewestGames, getHotThisWeekGames, getRandomGames, getPopularGames, getQueryGames } = require('../../src/discovery');

let isDev = process.env.NODE_ENV !== 'prod';

router.route('/newest/:page')
    .get(auth.optionalToken, getNewestHandler);

router.route('/hotThisWeek/:page')
    .get(auth.optionalToken, getHotThisWeekHandler);

router.route('/random/:page')
    .get(auth.optionalToken, getRandomHandler);

router.route('/popular/:page')
    .get(auth.optionalToken, getPopularHandler);

router.route('/find')
    .post(auth.optionalToken, postFindHandler);

/**
 * @api {get} /discovery/newest Get the 12 newest games
 * @apiName GetNewestGames
 * @apiGroup Discovery
 * @apiPermission Public
 * 
 * @apiHeader {String} x-access-token (Optional) JWT Token for authentication
 * @apiParam {Integer} page Page (wraps every 12 games)
 * 
 * @apiSuccess (200) {Array} games Array of Games
 */
 async function getNewestHandler(req, res) {
    if(isDev) console.log(chalk.grey("[mgg-server] (Discovery) Newest->Get"));

    if(req.params.page == undefined) {
        req.params.page = 0;
    }

    let gamesData = await getNewestGames(parseInt(req.params.page));

    gamesData = parseGameData(gamesData);

    res.status(200).json(gamesData);
}

/**
 * @api {get} /discovery/hotThisWeek Get the 12 most popular games released this week
 * @apiName GetHotThisWeekGames
 * @apiGroup Discovery
 * @apiPermission Public
 * 
 * @apiHeader {String} x-access-token (Optional) JWT Token for authentication
 * @apiParam {Integer} page Page (wraps every 12 games)
 * 
 * @apiSuccess (200) {Array} games Array of Games
 */
 async function getHotThisWeekHandler(req, res) {
    if(isDev) console.log(chalk.grey("[mgg-server] (Discovery) HotThisWeek->Get"));

    if(req.params.page == undefined) {
        req.params.page = 0;
    }

    let gamesData = await getHotThisWeekGames(parseInt(req.params.page));

    gamesData = parseGameData(gamesData);

    res.status(200).json(gamesData);
}

/**
 * @api {get} /discovery/random Get the 12 random games
 * @apiName GetRandomGames
 * @apiGroup Discovery
 * @apiPermission Public
 * 
 * @apiHeader {String} x-access-token (Optional) JWT Token for authentication
 * @apiParam {Integer} page Page (wraps every 12 games)
 * 
 * @apiSuccess (200) {Array} games Array of Games
 */
async function getRandomHandler(req, res) {
    if(isDev) console.log(chalk.grey("[mgg-server] (Discovery) Random->Get"));

    if(req.params.page == undefined) {
        req.params.page = 0;
    }

    let gamesData = await getRandomGames(req.params.page);

    gamesData = parseGameData(gamesData);

    res.status(200).json(gamesData);
}

/**
 * @api {get} /discovery/popular Get the 12 most popular games
 * @apiName GetPopularGames
 * @apiGroup Discovery
 * @apiPermission Public
 * 
 * @apiHeader {String} x-access-token (Optional) JWT Token for authentication
 * @apiParam {Integer} page Page (wraps every 12 games)
 * 
 * @apiSuccess (200) {Array} games Array of Games
 */
async function getPopularHandler(req, res) {
    if(isDev) console.log(chalk.grey("[mgg-server] (Discovery) Popular->Get"));

    if(req.params.page == undefined) {
        req.params.page = 0;
    }

    let gamesData = await getPopularGames(req.params.page);

    gamesData = parseGameData(gamesData);

    res.status(200).json(gamesData);
}

/**
 * @api {post} /discovery/find Find games based on a condition
 * @apiName FindGames
 * @apiGroup Discovery
 * @apiPermission Public
 * 
 * @apiHeader {String} x-access-token (Optional) JWT Token for authentication
 * @apiParam {String} query Search Query
 * 
 * @apiSuccess (200) {Array} games Array of Games
 */
 async function postFindHandler(req, res) {
    if(isDev) console.log(chalk.grey("[mgg-server] (Discovery) Find->Post"));

    if(req.body.query === '') {
        res.status(400).json({name: "MISSING_FIELDS", text: "Required fields: query"});
        return;
    }

    let gamesData = await getQueryGames(req.body.query, req.userId, req.userRoles);

    gamesData = parseGameData(gamesData);

    res.status(200).json(gamesData);
}

module.exports = router;