local things = {

  2s
12s
2aa5d3a4a151: Verifying Checksum
2aa5d3a4a151: Download complete
923e91ae3a1b: Verifying Checksum
923e91ae3a1b: Download complete
eff15d958d66: Verifying Checksum
eff15d958d66: Download complete
bfc5cca7d80e: Verifying Checksum
bfc5cca7d80e: Download complete
bc64adf2d0b2: Verifying Checksum
bc64adf2d0b2: Download complete
3de8bab4ef37: Verifying Checksum
3de8bab4ef37: Download complete
eaf244cfcbea: Verifying Checksum
eaf244cfcbea: Download complete
4161dc190b28: Verifying Checksum
4161dc190b28: Download complete
9962a693def7: Verifying Checksum
9962a693def7: Download complete
a6023280dcfe: Verifying Checksum
a6023280dcfe: Download complete
eff15d958d66: Pull complete
923e91ae3a1b: Pull complete
2aa5d3a4a151: Pull complete
bc64adf2d0b2: Pull complete
bfc5cca7d80e: Pull complete
a6023280dcfe: Pull complete
3de8bab4ef37: Pull complete
4161dc190b28: Pull complete
eaf244cfcbea: Pull complete
9962a693def7: Pull complete
Digest: sha256:6d640f98eee14dd0998b7387470f0dfb4bc064a53f605ba2427786bc8462631e
Status: Downloaded newer image for ghcr.io/actions/jekyll-build-pages:v1.0.12
ghcr.io/actions/jekyll-build-pages:v1.0.12
1s
Run actions/checkout@v4
  
Syncing repository: DogDay-X-CatNap/d-code-inc-web
Getting Git version info
Temporarily overriding HOME='/home/runner/work/_temp/da790507-4db1-4c2d-b9a6-8715325d82dd' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
/usr/bin/git config --global --add safe.directory /home/runner/work/d-code-inc-web/d-code-inc-web
Deleting the contents of '/home/runner/work/d-code-inc-web/d-code-inc-web'
Initializing the repository
Disabling automatic garbage collection
Setting up auth
Fetching the repository
  /usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +refs/heads/main*:refs/remotes/origin/main* +refs/tags/main*:refs/tags/main*
  From https://github.com/DogDay-X-CatNap/d-code-inc-web
   * [new branch]      main       -> origin/main
Determining the checkout info
Checking out the ref
Setting up auth for fetching submodules
Fetching submodules
Persisting credentials for submodules
/usr/bin/git log -1 --format='%H'
'8cbf861c4d10304755fc4be860fc18121693a3a6'
3s
Run actions/jekyll-build-pages@v1
/usr/bin/docker run --name ghcrioactionsjekyllbuildpagesv1012_976e80 --label f74a11 --workdir /github/workspace --rm -e "INPUT_SOURCE" -e "INPUT_DESTINATION" -e "INPUT_FUTURE" -e "INPUT_BUILD_REVISION" -e "INPUT_VERBOSE" -e "INPUT_TOKEN" -e "HOME" -e "GITHUB_JOB" -e "GITHUB_REF" -e "GITHUB_SHA" -e "GITHUB_REPOSITORY" -e "GITHUB_REPOSITORY_OWNER" -e "GITHUB_REPOSITORY_OWNER_ID" -e "GITHUB_RUN_ID" -e "GITHUB_RUN_NUMBER" -e "GITHUB_RETENTION_DAYS" -e "GITHUB_RUN_ATTEMPT" -e "GITHUB_ACTOR_ID" -e "GITHUB_ACTOR" -e "GITHUB_WORKFLOW" -e "GITHUB_HEAD_REF" -e "GITHUB_BASE_REF" -e "GITHUB_EVENT_NAME" -e "GITHUB_SERVER_URL" -e "GITHUB_API_URL" -e "GITHUB_GRAPHQL_URL" -e "GITHUB_REF_NAME" -e "GITHUB_REF_PROTECTED" -e "GITHUB_REF_TYPE" -e "GITHUB_WORKFLOW_REF" -e "GITHUB_WORKFLOW_SHA" -e "GITHUB_REPOSITORY_ID" -e "GITHUB_TRIGGERING_ACTOR" -e "GITHUB_WORKSPACE" -e "GITHUB_ACTION" -e "GITHUB_EVENT_PATH" -e "GITHUB_ACTION_REPOSITORY" -e "GITHUB_ACTION_REF" -e "GITHUB_PATH" -e "GITHUB_ENV" -e "GITHUB_STEP_SUMMARY" 
Configuration file: none
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
  Logging at level: debug
      GitHub Pages: github-pages v231
      GitHub Pages: jekyll v3.9.5
             Theme: jekyll-theme-primer
      Theme source: /usr/local/bundle/gems/jekyll-theme-primer-0.6.0
         Requiring: jekyll-github-metadata
         Requiring: jekyll-seo-tag
         Requiring: jekyll-coffeescript
         Requiring: jekyll-commonmark-ghpages
         Requiring: jekyll-gist
         Requiring: jekyll-github-metadata
         Requiring: jekyll-paginate
         Requiring: jekyll-relative-links
         Requiring: jekyll-optional-front-matter
         Requiring: jekyll-readme-index
         Requiring: jekyll-default-layout
         Requiring: jekyll-titles-from-headings
   GitHub Metadata: Initializing...
            Source: /github/workspace/.
       Destination: /github/workspace/./_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
        Generating: JekyllOptionalFrontMatter::Generator finished in 2.4135e-05 seconds.
        Generating: JekyllReadmeIndex::Generator finished in 3.5086e-05 seconds.
        Generating: Jekyll::Paginate::Pagination finished in 2.675e-06 seconds.
        Generating: JekyllRelativeLinks::Generator finished in 1.1251e-05 seconds.
        Generating: JekyllDefaultLayout::Generator finished in 2.9024e-05 seconds.
        Generating: JekyllTitlesFromHeadings::Generator finished in 7.634e-06 seconds.
         Rendering: assets/css/style.scss
  Pre-Render Hooks: assets/css/style.scss
  Rendering Markup: assets/css/style.scss
           Writing: /github/workspace/_site/assets/css/style.css
                    done in 1.056 seconds.
 Auto-regeneration: disabled. Use --watch to enable.
1s
Run actions/upload-pages-artifact@v3
Run echo ::group::Archive artifact
Archive artifact
Run actions/upload-artifact@v4
  
With the provided path, there will be 1 file uploaded
Artifact name is valid!
Root directory input is valid!
Beginning upload of artifact content to blob storage
Uploaded bytes 99381
Finished uploading artifact content to blob storage!
SHA256 hash of uploaded artifact zip is 795241a209c628f69b4667a5dde9b216bec7fff34d25ffc89c535536172bfdbf
Finalizing artifact upload
Artifact github-pages.zip successfully finalized. Artifact ID 1326006401
Artifact github-pages has been successfully uploaded! Final size is 99381 bytes. Artifact ID is 1326006401
Artifact download URL: https://github.com/DogDay-X-CatNap/d-code-inc-web/actions/runs/8281340190/artifacts/1326006401
0s
Post job cleanup.
/usr/bin/git version
git version 2.43.2
Temporarily overriding HOME='/home/runner/work/_temp/ef1b4e8d-4beb-4e6e-8ed8-eaae79736666' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
/usr/bin/git config --global --add safe.directory /home/runner/work/d-code-inc-web/d-code-inc-web
/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
0s
Cleaning up orphan processes
  
}
