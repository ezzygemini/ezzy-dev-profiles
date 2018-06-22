# ezzy-dev-profiles

[![Greenkeeper badge](https://badges.greenkeeper.io/ezzygemini/ezzy-dev-profiles.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/ezzygemini/ezzy-dev-profiles.svg?branch=master)](https://travis-ci.org/ezzygemini/ezzy-dev-profiles)
[![Coverage Status](https://coveralls.io/repos/github/ezzygemini/ezzy-dev-profiles/badge.svg)](https://coveralls.io/github/ezzygemini/ezzy-dev-profiles)

Developers can now start the application with various profiles to avoid running different flavors of the application using random environment variables or different processes.

# package.json

This dependency allows you 
This PR provides a new yarn script called "start-profile". This will allow node to ask the developer of which profile would they like to run; making it easier for experienced developers to setup the initial command script.

### Prompt

The first step is to prompt the developer for the desired profile.

```bash
$ yarn start-profile
yarn run v1.5.1
$ node ./scripts/profiles
Profile name [optional]:
```

### Runner

After prompt, they can enter any profile name they want and if it's available in our list of `startup-profiles.json`, then the script will simply run the command desired.

```bash
$ yarn start-profile
yarn run v1.5.1
$ node ./scripts/profiles
Profile name [optional]:pug
Starting Confluence in pug profile ...
$ ./scripts/precommand.sh && ./scripts/packages.sh start --full-parallel
./scripts/packages.sh
./scripts/packages.sh: starting command processes for packages
yarn workspace @atlassian/confluence-dev-proxy start
yarn workspace @atlassian/confluence-rest-api start
yarn workspace @atlassian/confluence-static-assets start
yarn workspace @atlassian/confluence-stub-helpers start
...
```

### Help

For new devs, a help command is available that will give them a list of profiles. This command can be achieved by using any of the following reserved words: "help", "h", "list", "ls", "?".

```bash
$ yarn start-profile
yarn run v1.5.1
$ node ./scripts/profiles
Profile name [optional]:help
These are the profiles available:
  - simplify (default)
  - pug
  - tango
Profile name [optional]:
```

### Shortcut

Finally a shortcut is available for those who want to avoid the prompt by simply passing the name of the profile right after the yarn script name.

```bash
$ yarn start-profile pug
yarn run v1.5.1
$ node ./scripts/profiles pug
Starting Confluence in pug profile ...
$ ./scripts/precommand.sh && ./scripts/packages.sh start --full-parallel
./scripts/packages.sh
./scripts/packages.sh: starting command processes for packages
yarn workspace @atlassian/confluence-dev-proxy start
yarn workspace @atlassian/confluence-rest-api start
yarn workspace @atlassian/confluence-static-assets start
yarn workspace @atlassian/confluence-stub-helpers start
yarn workspace @atlassian/eslint-plugin-confluence-es6 start
yarn workspace @atlassian/confluence-graphql start
yarn workspace @atlassian/confluence-shared start
yarn workspace @atlassian/confluence-editor start
yarn workspace @atlassian/confluence-fabric-editor start
...
```
