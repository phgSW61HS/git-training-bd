# Introduction

## Section Contents

Here is an example of content sections with titles, subtitles. Important to integrate fully guide hands-on sections.

* [Version control tool](#Version-control-tool)
  * [What is version control](#What-is-version-control)
  * [The well known, Git](#The-well-known,-Git)
* [Repositories](#Repositories)
* [Git Basics by example](#Git-Basics-by-example)
  * [Branches in Git](#Branches)
  * [Environment](#Environment)
  * [Hands on](#Starting-hands-on)

## Version control tool

#### What is version control

Version control, also known as source control, is the practice of tracking and managing changes to software code.
Version control systems are software tools that help software teams manage changes to source code over time.

Some of the key benefices of source control - that we will highlight further - can be summarize below:
- Prevent code loss
- Allowing several developpers/teams to work on the same project by keeping track of all changes
- Ensuring that no developers change the same part of codes without validated them
- Helping Devops team to automatically test and deploy codes
- ... many more.

#### The well known, Git

In the Dev community, Git is the version controller that you will encounter in any project.
Git is a mature, actively maintained open source project originally developed in 2005 by Linus Torvalds, the famous creator of the Linux operating system kernel.

Basically, Git consists of **saving / backing up / versioning a directory**, originally stored on a local machine (your machine), on a **remote server**. The server can be any machine on which git "server" is running, even though most of the time you use a cloud provider such as **Github, Gitlab, Bitbucket**,...

The content of this "directory" can consist of many different type of things.
Most of the time though it consists of source code that can be built (interpreted or compiled) and usually the content of the code is handled through an IDE (Intellij, Visual Studio, Atom, ...) which offers various facilities to manage, run and test code.

## Repositories

Before diving more into Git, we thought important to go back to the understanding of what is a repository and how is generally organize a source code.

@PH to add information here, I propose to not introduce .gitignore here but come back to it at the end of this introduction section :)

## Git Basics by example

Before diving into the Git way of working, let's create our first project tracked by git.

- On your local machine, on the home of your user, create a folder we will use along that training for example purposes and let's initiate Git
Note that the path/command could change depending on your OS. (on Windows, do it with Git Bash)
> mkdir /home/username/testGit
> cd /home/username/testGitmkdir /home/username/testGit
> cd /home/username/testGit
> git init
> ls -lart Git
W git status
