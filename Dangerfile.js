// Dangerfile.js
// This is a basic Danger.js configuration for automating code review tasks.

import { danger, warn, fail, message } from 'danger';

// Warn if there are changes to package.json without changes to pnpm-lock.yaml
const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('pnpm-lock.yaml');
if (packageChanged && !lockfileChanged) {
  warn('Changes were made to package.json, but not to pnpm-lock.yaml. Did you forget to run `pnpm install`?');
}

// Warn if there are large PRs
const bigPRThreshold = 500;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn('This PR is relatively large. Consider splitting it into smaller PRs if possible.');
}

// Ensure a changelog entry for user-facing changes
const hasChangelog = danger.git.modified_files.includes('CHANGELOG.md');
if (!hasChangelog) {
  warn('Please consider adding a changelog entry for user-facing changes.');
}

// Message for successful Danger.js setup
message('Danger.js is successfully set up and running!');
