const jsonFileNames = [
  "start-profile",
  "start-profiles",
  "ezzy-dev-profiles",
  "dev-profiles"
];

let localProfiles;
for (const src of jsonFileNames.map(fn => `../../../${fn}.json`)) {
  try {
    localProfiles = require(src);
    break;
  } catch (e) {}
}

let profiles;
for (const src of jsonFileNames.map(fn => `../../${fn}.json`)) {
  try {
    profiles = require(src);
    break;
  } catch (e) {}
}

if (!profiles) {
  try {
    const pkg = require("../../package.json");
    for (const scope of jsonFileNames) {
      if (pkg[scope] !== "undefined") {
        profiles = pkg[scope];
      }
    }
  } catch (e) {}
}

if (!profiles) {
  console.log(
    "No development profiles exist. " +
      "Visit https://github.com/ezzygemini/ezzy-dev-profiles " +
      "for setup instructions."
  );
  process.exit();
} else if (localProfiles) {
  profiles = Object.assign(localProfiles, profiles);
}

const { normalize } = require("path");
const { log } = console;
const { execSync } = require("child_process");
const profileList = Object.keys(profiles);
const [defaultProfile] = profileList;
const cwd = normalize(__dirname + "/../../");
const runProfile = name => execSync(profiles[name], { stdio: "inherit", cwd });
const startupProfile = (process.argv[2] || "").toString().replace(/-+/g, "");
const logProfiles = () => {
  log("These are the profiles available:");
  profileList.forEach((profile, i) =>
    log(`  - ${profile}${!i ? " (default)" : ""}`)
  );
};
const askForProfile = () => {
  process.stdout.write("Profile name [optional]:");
  process.stdin.resume();
};

const parsePrompt = text => {
  const input = text
    .toString()
    .split(/\n/)
    .shift();
  switch (input) {
    case "help":
    case "list":
    case "ls":
    case "?":
    case "h":
      logProfiles();
      askForProfile();
      process.stdin.resume();
      break;

    case "default":
      runProfile(defaultProfile);
      break;

    case "quit":
      process.exit();
      break;

    default:
      if (!input) {
        log(`Starting ${defaultProfile} profile ...`);
        runProfile(defaultProfile);
      } else if (!profiles[input]) {
        log(`Sorry. Profile "${input}" doesn't exist.`);
        logProfiles();
        askForProfile();
      } else {
        log(`Starting Confluence in ${input} profile ...`);
        runProfile(input);
      }
  }
};

process.stdin.on("data", parsePrompt);

if (startupProfile) {
  parsePrompt(startupProfile);
} else {
  askForProfile();
}
