import { ReportAggregator, HtmlReporter} from '@rpii/wdio-html-reporter' ;

exports.config = {
    runner: 'local',
    specs: [
        './test/specs/hackathon/*.e2e.js'
    ],
    exclude: [
        './test/specs/examples/**/*'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome', // firefox, MicrosoftEdge
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                // '--window-size=1920,1080',
                //'--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: [
                // '-headless'
            ]
        }
    }],
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'http://czechitas-datestovani-hackathon.cz',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['spec',
        [HtmlReporter, {
                debug: true,
                outputDir: './reports/html-reports/',
                filename: 'report.html',
                reportTitle: 'Test Report Title',
                showInBrowser: true,
                useOnAfterCommandForScreenshot: true
            }
        ]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: function (config, capabilities) {

        let reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Master Report',
            browserName : capabilities.browserName,
            collapseTests: true,
        });
        reportAggregator.clean() ;
        global.reportAggregator = reportAggregator;
    },
    
    onComplete: function(exitCode, config, capabilities, results) {
        (async () => {
            await global.reportAggregator.createReport();
        })();
    },

    afterTest: function (
        test,
        context,
        { error, result, duration, passed, retries }
      ) {
        // take a screenshot anytime a test fails and throws an error
        if (error) {
          browser.saveScreenshot('error_' + new Date().toISOString() + '.png'); 
        }
      },
}
