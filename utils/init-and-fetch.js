'use strict';

// USAGE: node utils/init-and-fetch.js NAME
// where NAME is an assignment object defined in `asignments.json`

// should be able to reduce this list. 
const classroom = require('classroom_helper'),
      shell = require('shelljs'),
      fs = require('fs'),
      path = require('path'),
      // these are all paths
      envFile = "/home/matt/DH/.env",
      dotenv = require ('dotenv').config({path: envFile}),
      ghu = process.env.githubUsername,
      githubUser = ghu,
      ghp = process.env.githubPassword,
      org = process.env.githubOrganization,
      token = process.env.ghOauth,
      assignJsonPath = "/home/matt/DH/Assignments.json";

// console.log(JSON.stringify([process.env, 'hi', ghu, ghp, org]));

let jsonString = fs.readFileSync(assignJsonPath, 'utf8');
let assignments = JSON.parse(jsonString);
let args = require('minimist')(process.argv.slice(2)),
    aName = args._[0];
// set the assignment
let assignment = assignments[aName],
    { baseDir } = assignments;

// not currently in use
// let thisSubmission = 'submission',
//     thisComments = 'teacher-comments';


// assignment.mainTests = `node node_modules/mocha/bin/mocha -t 0 --reporter mochawesome --reporter-options reportDir=TestResults,reportFilename=testresults test/test.js`;

/**

End setup. Begin actual work. 

**/

( async () => {
  // always need to instantiate the octokit object now
  classroom.initOcto (token);

  // Step one: clone the base assignment in the basedir.
  // Also install npm dependencies.
  classroom.initGradingRepo (assignment, baseDir);

  // step 2: cd back into that dir just in case
  shell.cd(path.join(baseDir, assignment.cloneAs));

// step 4: check to mak sure everything is working. 
  classroom.getRepos(assignment, org, githubUser).
   then ((data) =>
     { console.log (`${assignment.basename} has ${data.length} repos associated with it`)});

// step 5: updat test files
  


  // step 5: do any updates (ugh) resultingfrom your screwups.
  // note that the repo location is ignored -- got fix this sometime
//   // final null: don't push changes to file, just keep local
//   classroom.getReposAndUpdate(assignment,
//                               org, githubUser,  ['test/test.js', 'package.json'], null);


//  step 6: Get all repos as branches and run tests.
  // get branches
  await classroom.getAllAsBranches(assignment, org, githubUser);
  // retrieve branch list
  let branchList = await classroom.getAllBranches(assignment, baseDir);

})();
