# gulpify

:zap: ***The full-stack Gulp.js boilerplate.***

[![Build Status](https://travis-ci.com/arakilian0/gulpify.svg?branch=master)](https://travis-ci.com/arakilian0/gulpify) [![GitHub release](https://img.shields.io/github/release/arakilian0/gulpify.svg)](https://github.com/arakilian0/gulpify/releases/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/arakilian0/gulpify/blob/master/LICENSE.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/arakilian0/gulpify/blob/master/CONTRIBUTING.md)

*Note: This project has only been tested on **MacOS**. If you would like to contribute to making it cross-platform, please read [CONTRIBUTING.md](https://github.com/arakilian0/gulpify/blob/master/CONTRIBUTING.md)*

## Requirements

1. Node.js - [install for MacOS](https://treehouse.github.io/installation-guides/mac/node-mac.html)


 *Quick Install Node.js*

 ```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install node
$ node -v
$ npm -v
 ```

## Installation

I've created a [Command Line Interface](https://github.com/arakilian0/gulpify-cli) which downloads the latest version, and installs all depenendecies of this repository. Once installed you can run:

```
$ gulpify init my-project
```

## Usage
***Note: This project uses [Gulp.js](https://gulpjs.com/)*** (an amazingly powerful node.js based task runner). ***If you are not familiar with gulp, I would definitely suggest checking out the [docs](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles) for a mind blowing experience :open_mouth: . Nevertheless, this project can definitely be used without any gulp knowledge.***

#### Help

Run the following command to get help text:

```
$ gulp
```

To get help text for specific tasks run:

```
$ gulp create
$ gulp build
...
```

No need for any `--help` flags. In fact, if you run `gulp --help`, gulp-cli help text gets printed to the console. All [gulp-cli](https://npmjs.com/package/gulp-cli) commands and flags are available to use as normal.

#### Views

This project uses [Pug](https://pugjs.org/api/getting-started.html) and [YAML](https://yaml.org/) to create html pages.

###### 1. Creating Views

Regarding this project, a **view** is simply a Pug file that has a corresponding YAML file. Pass data from example.yml to example.pug to use throughout the document.

```
$ gulp create --view index
```

Several things just happened:

- *First of all you should've got an error because the index view is already created for you (all filenames must be unique just like a normal directory) so use a different filename and continue - keep in mind all views get built to HTML in the end and they keep the same name*
- *If all is well the following happens:*
- *the view was registered to ```config/template.yml```*
- *2 files are created: ```example.pug``` and ```example.yml```*
- *Pug files get created in ```src/```*
  - *extends from ```src/assets/components/template.pug```*
- *YAML files get created in ```src/assets/data```*
  - *extends from ```config/template.boiler.yml```*
- *The destinations are configurable with ```config/paths/_paths.js```*

You can create directory deep views with this pattern:

```
$ gulp create --view blog/blog-posts/post1
```

- *If the directories don't exist, they are created for you*
- *The last path will become the file name*
- *```blog/blog-posts/post1``` gets registered to ```config/template.yml```*
- *```src/blog/blog-posts/post1.pug``` is created*
- *```src/assets/data/blog/blog-posts/post1.yml``` is created*

*Note: When you create a new view, a boilerplate yaml file ```config/template.boiler.yml``` gets copied for each new view. This is used for the template extending feature of Pug. You can add as much data as you want to these files and grab it from the related pug files.*

*Tip: Configure `config/template.boiler.yml` and your main template file `src/assets/components/template.pug` for each new project.*

###### 2. Building Views

Regarding this project, **build** simply means run a process. In this case we're processing the ```views```. Since we're using Pug and YAML, we need to compile the pug code into HTML.

```
$ gulp build --views
```

- Builds all views listed in ```config/template.yml```
- Produces the HTML files in ```dist/```
- Prints status messages for each view during build process (currently working on a logger feature to log messages to Markdown files)

*Caveat:*
Only the views registered in ```config/template.yml``` get compiled. If you manually created a view, make sure to register it!

#### Server
This project uses [BrowserSync](https://browsersync.io/) for serving static content on a local development server. There is an `options` object configured for running BrowserSync with default options: ```config/options/browser-sync.js```

```
$ gulp runserver -d
```

- spins up a local server using default options
- edit ```config/options/browser-sync.js``` to meet your needs

Here is an example of initializing a new server **with arguments**:

```
$ gulp runserver -p dist/docs --4200 -o
```

- uses given path for server initialization *(dist/docs)*
- uses given port for server initialization *(4200)*
- opens your default browser (browser does not open by default)

*Caveat:*
If the ```--default``` argument is caught in the command, all other arguments are ignored and the server is iniated with default options. *The following two examples do the exact same thing.*

```
$ gulp runserver -p dist/docs -o --4200 -d
```

```
$ gulp runserver -d
```

*Note: More tasks and options coming soon.* :coffee:

## License

MIT License

Copyright (c) 2019 Michael Arakilian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## More

#### Resources

- Gulp - [read the docs](https://gulpjs.com/docs/en/api/concepts)
- Pug - [read the docs](https://pugjs.org/api/getting-started.html)
- YAML - [read the docs](https://learnxinyminutes.com/docs/yaml/)
- BrowserSync - [read the docs](https://www.browsersync.io/docs/options)
