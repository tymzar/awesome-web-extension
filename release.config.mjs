/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
    repositoryUrl: "https://github.com/tymzar/starter-web-extension",
    tagFormat: "v${version}",
    branches: [
        "master",
        {
            name: "rc/*",
            channel: "rc",
            prerelease: true
        }
    ],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md"
            }
        ],
        [
            "@semantic-release/npm",
            {
                npmPublish: true
            }
        ],
        [
            "@semantic-release/git",
            {
                assets: [
                    "CHANGELOG.md",
                    "package.json"
                ],
                message: "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}"
            }
        ],
        [
            "@semantic-release/github",
            {
                failComment: false
            }
        ]
    ]
};
