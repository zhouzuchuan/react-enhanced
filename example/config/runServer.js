import WebpackDevServer from 'webpack-dev-server'
import openBrowser from 'react-dev-utils/openBrowser'
import clearConsole from 'react-dev-utils/clearConsole'
import chokidar from 'chokidar'
import chalk from 'chalk'
import paths from './paths'

let compiler

const isInteractive = process.stdout.isTTY
const rcConfig
// function readRcConfig() {
//     try {
//       rcConfig = getConfig(process.env.NODE_ENV, cwd);
//     } catch (e) {
//       console.log(chalk.red('Failed to parse .roadhogrc config.'));
//       console.log();
//       console.log(e.message);
//       process.exit(1);
//     }
//   }

function clearConsoleWrapped() {
    if (process.env.CLEAR_CONSOLE !== 'none') {
        clearConsole()
    }
}
function runDevServer(host, port, protocol) {
    const devServer = new WebpackDevServer(compiler, {
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appPublic,
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: /node_modules/
        },
        https: protocol === 'https',
        host,
        proxy: rcConfig.proxy
    })

    // addMiddleware(devServer)
    applyMock(devServer)

    devServer.listen(port, '0.0.0.0', err => {
        if (err) {
            return console.log(err)
        }

        process.send('READY')

        if (isInteractive) {
            clearConsoleWrapped()
        }
        console.log(chalk.cyan('Starting the development server...'))
        console.log()
        if (isInteractive) {
            outputMockError()
        }

        openBrowser(`${protocol}://${host}:${port}/`)
    })

    // setupWatch(devServer, port)
}

function setupWatch(devServer) {
    const files = [
        paths.resolveApp('.roadhogrc'),
        paths.resolveApp('.roadhogrc.js'),
        paths.resolveApp('webpack.config.js')
    ].concat(
        typeof rcConfig.theme === 'string'
            ? paths.resolveApp(rcConfig.theme)
            : []
    )
    const watcher = chokidar.watch(files, {
        ignored: /node_modules/,
        persistent: true
    })
    watcher.on('change', path => {
        console.log(
            chalk.green(
                `File ${path.replace(
                    paths.appDirectory,
                    '.'
                )} changed, try to restart server`
            )
        )
        watcher.close()
        devServer.close()
        process.send('RESTART')
    })
}

function run(port) {
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const host = process.env.HOST || 'localhost';
    setupCompiler(host, port, protocol);
    runDevServer(host, port, protocol);
  }

run()