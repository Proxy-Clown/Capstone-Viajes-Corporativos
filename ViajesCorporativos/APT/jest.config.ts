import type {Config} from "jest"
import nextJest from "next/jest.js"

const createJestConfig=nextJest({
dir: './'
})
const config: Config={
  coverageProvider:'v8',
  testEnvironment:"jsdom",
  preset:'ts-jest',
  setupFilesAfterEnv:['./jest.setup.ts']
}
export default createJestConfig(config)

//Archivo de configuracion de pruebas unitarias
