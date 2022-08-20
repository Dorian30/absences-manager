module.exports = {
  // 'src/**/*.{ts,tsx}': () => 'npm run typecheck',
  'src/**/*.{js,jsx,ts,tsx}': [
    () => 'npm run typecheck',
    'npm run lint',
    'npm run prettier'
  ]
};
