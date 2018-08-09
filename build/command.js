const devFn = require('webpack-server');
const program = require('commander')
const build = require('build');
program.version(require("../package").version)
  .usage('<command> [options]')
  .command('new', '生成新的component,container')
  .option('-b, --build <component>', '打包component')
  .option('-d, --dev <component>', '启动开发模式')
  .option('-p --port <port>', "配置端口号")
  .option('-t --type <type>', "类型")
  .option('-c --clean', "是否清除打包文件")
  .option('-x --pixel <pixel>', "REM项目基础值")
  .parse(process.argv);

if (program.dev) {
  devFn(program.dev, program.port, program.type, program.pixel);
}

if (program.build) {
  build(program.build, program.type, program.clean, program.pixel);
}