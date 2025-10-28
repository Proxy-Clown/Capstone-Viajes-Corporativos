/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Asegura que Jest transforme también los módulos ESM de estas dependencias
  transformIgnorePatterns: [
    '/node_modules/(?!(better-auth|@noble|jose)/)',
  ],
  // Opcional: mejora el rendimiento al limpiar el caché de Jest
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // Si usas imports con alias, puedes agregarlos aquí
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
  '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
//life is pain