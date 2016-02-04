# Sip

### A WordPress Theme Using _s, Bourbon + Neat and Gulp

Description
---------------

Hi. I'm `sip`. I'm a theme meant for hacking so don't use me as a Parent Theme. Instead try turning me into the next, most awesome, WordPress theme out there. That's what I'm here for.

My ultra-minimal SCSS might make me look like theme tartare but that means less stuff to get in your way when you're designing your awesome theme. Here are some of the other more interesting things you'll find here:

* Bourbon (http://bourbon.io), Neat (http://neat.bourbon.io), Bitters (http://bitters.bourbon.io) and Refills (http://refills.bourbon.io) â€” Bourbon provides a lightweight Sass library (similar to Compass).

	* Neat extends bourbon and provides a nice and lightweight grid framework as a base for this project. Refills and Bitters provide additional styling and UI elements. I suggest you visit each of these projects to learn more and how to use them.

	* Bitters is baked-in, too! You get some basic nifty styles out of the gate.

* Underscores (_s) based theme. Smarter folks than me building great shit (http://underscores.me)
	
	* A just right amount of lean, well-commented, modern, HTML5 templates.
	* A helpful 404 template.
	* A sample custom header implementation in `inc/custom-header.php` that can be activated by uncommenting one line in `functions.php` and adding the code snippet found in the comments of `inc/custom-header.php` to your `header.php` template.
	* Custom template tags in `inc/template-tags.php` that keep your templates clean and neat and prevent code duplication.
	* Some small tweaks in `inc/extras.php` that can improve your theming experience.
	* A script at `js/navigation.js` that makes your menu a toggled dropdown on small screens (like your phone), ready for CSS artistry. It's enqueued in `functions.php`.
	* 2 sample CSS layouts in `layouts/` for a sidebar on either side of your content.
	* Smartly organized starter CSS in `style.css` that will help you to quickly get your design off the ground.
	* Licensed under GPLv2 or later. :) Use it to make something cool.

* Sass. We're using it and to update this theme you should be cozy with it or get ready to learn how to use. If you don't know Sass, you should definitely jump in. The water's fine and you'll thank me later. I accept thanks in tacos and tea: Earl Gray, hot.

* Gulpjs Task Automation â€” This has been a biggy! Lots of work done and yet to-do. Your gulpjs file will help automate nifty
tasks such as autoprefixing, compiling and minifying Sass files; cleaning up your theme directory and even packaging/zipping
your theme! Cool. Right?

Getting Started
---------------
There's a lot to this theme, but don't be intimidated, even if you're not an "advanced-level" developer, you got this! I'll be honest with you, I don't know how half the stuff here works, it just sorta does. =)

Bourbon and Neat are used for providing simple Sass mixins and leverages a simple grid system that let's you markup your theme how you want, while you use their math, unlike Bootstrap and Foundation, presently.

There are things you need to install before you hack away at things. There are three package managers to install: Node (which installs the NPM package manager), Bower and Composer. Each of these have dependencies that also need to be installed. Fortunately, this is all "fairly easy".

* #### Prerequisites
  * You'll need to download and install [Node](https://nodejs.org/)
  * You will also need to download and install [Sass](http://sass-lang.com/install)

* #### Getting and Installing the Theme
  * The first thing youâ€™ll want to do is grab a copy of the theme and then rename the directory to the name of your theme or website.

* #### Install Gulpjs, Composer and Bower + Dependencies

  Once you have Node, Sass and the theme installed, the next step is simple enough.

   **_(note - you may have to run the following commands as admin or sudo)_**

  * **Install Gulp** â€” Open a command prompt/terminal and navigate to your theme's root directory and run this command: `npm install` - This installs all the necessary Gulp plugins to help with task automation such as Sass compiling and browser-sync! You'll need to run this step on each of your projects, going forward.

 * #### Set your project configuration in Gulpfile.js!!
_Be sure to go into gulpfile.js and setup the project configuration variables._

 	* This is important for using Browser-Sync with your project. Make sure in gulpfile.js that you set the `project` variable to the appropriate name for your project URL. Default is "yourlocal.dev"

 * #### Generating your styles
   * In pre 1.1.11 builds of Sip, Style.scss would process/compile all of your changes to the various Sass files. This has changed in 1.1.11. We have added rtl
   support using a set of mixins from the Bi-App-Sass [view](http://anasnakawa.github.io/bi-app-sass/) project which helps us generate styles for RTL configurations. All LTR styles are output to style.css and RTL styles are output to rtl.css.

* #### Gulp Tasks
There are a couple of tasks built into Sip to help get you going.
  * `gulp` This command simply starts up Gulp and watches your scss, js and php filder for changes, writes them out and refreshes the browser for you.
  * `gulp build` This command removes unneccessary files and packs up the required files into a nice and neat, installable, zip package.

Each task such as 'js', 'images' or 'browser-sync' may be started individually. Although, the only one of them you'd do that with is the 'images' task since that's not auto-optimizing at the moment.

* #### Theme Development, Minification and You
When developing your theme note that the output style.css file and production.js file are in expanded (readable) format if WP_DEBUG is set to true in wp-config.php. If WP_DEBUG is NOT set to true, then style.css and production.js are minified for you. While developing your theme, I recommend that WP_DEBUG is set to true. Just a good practice anyway.

* **A Note About Javascript Files** - If you have JS files that are not managed by Bower or npm, you should place those files inside the assets/js/app folder. Why? Gulp runs a task that concatenates js files in that directory and checks them for errors, which is pretty nifty. You can modify Gulp task behavior to suit your tastes, of course.

* **Extra Note!** If you've set WP Debug true, the concatenated file is unminified and if set to false, then the concatenated file is minified. If you don't intend to use this functionality, you should comment-out or remove the lines referring to development.js and production-min.js.

### Infinite Scroll and Jetpack
---------------
Infinite Scroll is now supported. Requires that you have Jetpack installed and have configured the plugin to use Infinite Scroll. Additionally, you'll need to go into the Customizer to add theme support. Why? While redundant, didn't really want code running that wasn't in use... Aaand seemed like a nice use of the Customizer. If you hate it, open an issue. =)

### Bourbon and Neat
---------------
Why use these in this project? It's a philosophical thing. I've used Foundation and Bootstrap before. I like them; they're both great, great projects run by smarter people than myself. So what's the philosophical bit? To achieve the responsiveness required of various projects, I would have to tear up my HTML, input my own selector classes and what have you, in addition to changing my css. I didn't like it. I heard about Neat (http://neat.bourbon.io) and really liked their approach to a grid framework. You keep your HTML structure the way you like and all of the styling in your Sass files

### Use as a Parent Theme?
---------------
I don't see why not. I'd say 'Sip' would make for a good Parent Theme for your project and certainly more ideal if you're going to make significant edits (and why wouldn't you? By default it looks like poo!).

License
---------------

This theme is based on Underscores, (C) 2012-2015 Automattic, Inc.
 - Source: http://underscores.me/
 - License: GNU GPL, Version 2 (or later)
 - License URI: license.txt

Flexnav, Copyright 2014 Jason Weaver.
 - Source: http://jasonweaver.name/lab/flexiblenavigation/
 - License: GNU GPL, Version 2 (or later)
 - License URI: https://github.com/

TGM Plugin Activation, Copyright 2014 Thomas Griffin Media, Inc.
 - Source: http://tgmpluginactivation.com/
 - License: GNU GPL, Version 2 (or later)
 - License URI: http://tgmpluginactivation.com/#license

Bourbon
 - Source: http://bourbon.io, Â© 2013 thoughtbot
 - License: The MIT License
 - License URI: https://github.com/thoughtbot/bourbon/blob/master/LICENSE

Neat
 - Source: http://neat.bourbon.io, Â© 2013 thoughtbot
 - License: The MIT License
 - License URI: https://github.com/thoughtbot/neat/blob/master/LICENSE

Gulpjs
 - Source: http://gulpjs.com, Copyright (c) 2014 Fractal <contact@wearefractal.com>
 - License: The MIT License
 - License URI: https://github.com/gulpjs/gulp/blob/master/LICENSE

Hover Intent
 - Source: https://github.com/tristen/hoverintent
 - License: the MIT
 - License URI: license.txt


