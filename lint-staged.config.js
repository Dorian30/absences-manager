module.exports = {
  '*.{js,jsx,ts,tsx}': [
    () => 'npm run typecheck:staged',
    'npm run lint:staged',
    'npm run test:staged',
    'npm run prettier:staged'
  ]
};
