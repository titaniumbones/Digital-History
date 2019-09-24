
// should be able to reduce this list. 
const classroom = require('./classroom_helper'),
      shell = require('shelljs'),
      fs = require('fs'),
      path = require('path');
      // these are all paths
      envFile = "/home/matt/DH/.env",
      dotenv = require ('dotenv').config({path: envFile}),
      ghu = githubUser =  process.env.githubUsername,
      ghp = process.env.githubPassword,
      org = process.env.githubOrganization,
      token = process.env.ghOauth,
      assignJsonPath = "/home/matt/DH/Assignments.json";

// console.log(JSON.stringify([process.env, 'hi', ghu, ghp, org]));

let jsonString = fs.readFileSync(assignJsonPath, 'utf8');
let assignments = JSON.parse(jsonString);

// set the assignment
let assignment = assignments.git,
    { baseDir } = assignments;

// not currently in use
// let thisSubmission = 'submission',
//     thisComments = 'teacher-comments';


// assignment.mainTests = `node node_modules/mocha/bin/mocha -t 0 --reporter mochawesome --reporter-options reportDir=TestResults,reportFilename=testresults test/test.js`;

/**

End setup. Begin actual work. 

**/


// helper
function writeResultsfile (testResults) {
  let resultsJS = JSON.stringify (testResults, null, 2);
  fs.writeFile('/home/matt/DH/Grades/00-results.json', resultsJS, err => {
    if (err) {
      console.log('Error writing file', err);
      return err;
    } else {
      console.log('Successfully wrote file');
      return 0;
    }
  });
}

let results;

( async () => {
// always need to instantiate the octokit object now
classroom.initOcto (token);

// Step one: clone the base assignment in the basedir.
// Also install npm dependencies.
// classroom.initGradingRepo (assignment, baseDir);

// step 2: cd back into that dir just in case
shell.cd(path.join(baseDir, assignment.cloneAs));

// step 4: check to mak sure everything is working. 
// classroom.getRepos(assignment, org, githubUser).
//    then ((data) =>
//      { console.log (`${assignment.basename} has ${data.length} repos associated with it`)});

// step 5: updat test files
  


  // step 5: do any updates (ugh) resultingfrom your screwups.
  // note that the repo location is ignored -- got fix this sometime
//   // final null: don't push changes to file, just keep local
//   classroom.getReposAndUpdate(assignment,
//                               org, githubUser,  ['test/test.js', 'package.json'], null);


//  step 6: Get all repos as branches and run tests.
  // get branches
  // await classroom.getAllAsBranches(assignment, org, githubUser);
  // retrieve branch list
  // let branchList = await classroom.getAllBranches(assignment, baseDir);
  // update test files
  // let upates = classroom.updateFilesAllBranches (assignment, baseDir, ['test/test.js'], branchList );
  // await classroom.updateFilesAllBranches (assignment,baseDir, ['test/test.js'], branchList);
  
  // run tests and collect data
  // let testResults = classroom.testAllBranches(assignment, baseDir, branchList);
  // let tests = classroom.updateFilesAllBranches(assignment,baseDir, ['test/test.js'])
  // writeresultsfile(testResults);
  
  // console.log(JSON.stringify(testResults, null, 2));
// // gather all the js info and images if poss
//   // shell commands
  shell.exec('git checkout master; for ref in $(git for-each-ref --format=\'%(refname:short)\' refs/heads  ) ; do git checkout $ref --   images/${ref%-master}.jpg ; done');
  shell.exec('git checkout master; for ref in $(git for-each-ref --format=\'%(refname:short)\' refs/heads  ) ; do git checkout $ref --   students/${ref%-master}.json ; done');
// for ref in $(git for-each-ref --format='%(refname:short)' refs/heads  ) ; do git checkout $ref --   images/${ref%-master}.jpg ; done
// for ref in $(git for-each-ref --format='%(refname:short)' refs/heads  ) ; do git checkout $ref --   students/${ref%-master}.json ; done

// also run npm run collectjsoninstructor & save allstudents.js as ~/DH/students-local.json,
// shell.cp();
// after removing initial `var allstudents = `
})();
