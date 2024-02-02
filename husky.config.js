const runYarnLock = 'yarn install --frozen-lockfile';

export const hooks = {
  'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runYarnLock}; fi`,
  'post-merge': runYarnLock,
  'post-rebase': 'yarn install',
  'pre-commit': 'lint-staged'
};