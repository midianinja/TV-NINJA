module.exports = {
    plugins: [
        ['@electron-forge/plugin-webpack', {
            mainConfig: './webpack.main.config.js',
            renderer: {
                config: './webpack.config.js',
                entryPoints: [{
                    html: './index.html',
                    js: './index.js',
                    name: 'main_window'
                }]
            }
        }]
    ],
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin', 'linux'],
            config: {
                // Config here
            }
        }, {
            name: '@electron-forge/maker-flatpak',
            config: {
                options: {
                    categories: ['Video'],
                    mimeType: ['video/h264']
                }
            }
        }, {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    maintainer: 'Niv Sardi',
                    homepage: 'https://butterproject.org'
                }
            }
        }, {
            name: '@electron-forge/maker-dmg',
            config: {
                background: './assets/dmg-background.png',
                format: 'UFLO'
            }
        }, {
            name: '@electron-forge/maker-wix',
            config: {
                language: 1033,
                manufacturer: 'Butter Project'
            }
        }, { // PUBLISHING
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'xaiki',
                    name: 'tvninja'
                },
                prerelease: true
            }
        }
    ]
}
