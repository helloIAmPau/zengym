# Zengym

or how a nerd can be fit and stick on his target.

## Table of Contents

* [What is the goal?](#what-is-the-goal)
* [Oh, shut up and give me the app](#oh-shut-up-and-give-me-the-app)
   * [Base tools](#base-tools)
   * [Launch the server](#launch-the-server)
   * [Apply migrations](#apply-migrations)
      * [Openfood data](#openfood-data)
   * [Build the mobile app](#build-the-mobile-app)
      * [Android](#android)
* [Fitness stuff](#fitness-stuff)
* [Nerd stuff](#nerd-stuff)

## What is the goal?

Staying in shape and maintaining a healthy lifestyle is always a challenge for nerds who constantly deal with mental stress during their workdays.
After a day spent designing and building amazing software, we have no energy left to calculate calories, select foods that match our macros, or create a training plan.

That’s why I decided to build a new app (see the irony?) to help me stay on track with my fitness plan, allowing me to focus on the fun part—exercising and eating well.

And no, this is not the usual AI-powered app that dumps all data into an LLM and spits out a set of unreliable, generated results. Here, fundamental fitness principles are applied, and AI is discreetly integrated to enhance the process.

## Oh, shut up and give me the app

For non-nerds (also known as sane people), a public version of the app is available at [zengym.io](https://zengym.io), where you can find the latest build to download.

If you care about your privacy and don't even trust me, you can run a personal version of the app by cloning this repo and hosting it on your own server.
In the next section, I'll explain how to set up the environment and run the stable version (or even the development version, I won't judge) of the app.

### Base tools

I think it’s always best practice, especially in the open-source world, to provide software that is as simple as possible to run.
The complexity of deploying an app—especially when it wasn’t written by you—adds unnecessary barriers to adopting a solution that could potentially solve someone's problem.

That’s why I always make an effort to create software that you can run with just one command.
However, even for software designed this way, a minimal set of dependencies must be installed to make the magic happen.

For the server side of Zengym, you only need to install three pieces of software to get everything up and running. And if you don’t already have these on your machine, you’re probably not as nerdy as you think:

* [__git__](https://git-scm.com/downloads): to clone the repo to your server
* [__node__](https://nodejs.org/en/download): to run the scripts
* [__docker__](https://docs.docker.com/engine/install/): to launch the entire infrastructure

Oh, and of course, I developed and tested the app on Linux. By design, it should run on Windows as well, but do you really want to start a web server on Windows? Your choice.

To build the mobile app, however, you’ll need to set up the React Native environment. You shouldn’t do this on your server, and it can be quite annoying.
That said, there’s a [great guide](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local) on how to set up the environment on the Expo website.

### Launch the server

As the first step, we need to set some environment variables that Zengym uses to configure the environment. The simplest way is to create a file, let’s call it deploy.env, in your home folder:

```
export ZENGYM_POSTGRES_DB=zengym
export ZENGYM_POSTGRES_PASSWORD=averyhardtoguesspassword
export ZENGYM_POSTGRES_USER=zengym
export ZENGYM_HOSTNAME=http://zengym.io
export EXPO_PUBLIC_ZENGYM_API_URL=https://zengym.io
```

Of course, replace the variables with your desired values. Then, clone the repo into the same folder:

```bash
git clone https://github.com/helloiampau/zengym
```
Next, start the application server:

```bash
cd zengym && source ~/deploy.env && npm start
```

Done. Simple, right?

### Apply migrations

The app requires minimal database configuration. You’ll probably need to run this hook after every update.
Following my "just run a single command" philosophy, migrations are applied by simply running:

```bash
source ~/deploy.env && npm run migrate
```

Easy.

#### Openfood data

``
ToDo: add git LFS reference
``

Zengym uses OpenFood data as the initial food database. They’re not essential, but having a starting dataset can be handy.
The import process is quite heavy, so we’ve set up a separate procedure that you can run in the background while doing more useful things, like living a happy life.

And guess what? How do you start the import?
That’s right, with just one command.

```bash
source ~/deploy.env && npm run import-openfood
```

The procedure runs in batches and you can stop and restart it at any moment.

### Build the mobile app

I’m assuming you’re a good person and followed the Expo installation guide correctly. Now, it’s time to build the mobile app.

#### Android

The first step is to create a production deploy key. If you’ve installed the Android Studio framework properly, just run:

```
keytool -genkey -v -keystore production.keystore -alias zengym -keyalg RSA -keysize 2048 -validity 10000
```

Next, create the following variables in `~/.gradle/gradle.properties`
(If the file doesn’t exist, create it; otherwise, append these variables to the existing content):

```
ZENGYM_UPLOAD_STORE_FILE="/absolute/path/to/your/production.keystore"
ZENGYM_UPLOAD_KEY_ALIAS="zengym"
ZENGYM_UPLOAD_STORE_PASSWORD="thepasswordyouchooseinkeytool"
ZENGYM_UPLOAD_KEY_PASSWORD="thepasswordyouchooseinkeytool"
```

Finally, go to the `Zengym/` folder and run

```bash
source ~/deploy.env && npm run android:build-release
```

After some terrifying messages, your APK, located in `Zengym/android/app/build/outputs/apk/release`, will be ready to upload and install on your device.

## Fitness stuff

In this section, I'll outline the principles around which the entire application is designed and that I personally follow to achieve my fitness goals.

## Nerd stuff

In this section, I'll provide information on how I built the entire application, covering technologies, architecture, and design choices.

### Vectorial search
