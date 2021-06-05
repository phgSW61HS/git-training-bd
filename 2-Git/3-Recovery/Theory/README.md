# Recovery (and undoing)

## Section Contents

Here is an example of content sections with titles, subtitles. Important to integrate fully guide hands-on sections.

* [Introduction](#Introduction)
  * [Yaml details](#yaml-details)

## Introduction

One of the key interest of Git is to allow you to come back to a previous version/snapshot/commit you did.
Basically you will ***go back in time to recover.***


## Uncommitted changes

Let's make some changes in our files and see how we could undo them.

Right now you should have two files in your testGit local repository

![](../pics/test_git_repo.png)

make some changes in those two files (edit them with some additional texts), see the changes you made, stage the 'first_file.py' and then visualize the git status

```
 <some file editions in first_file.py and third_file.js>
 git diff
 git add first_file.py
 git status
```

![](../pics/status_uncommitted.png)

Now, obviously you could decide to manually revert your changes by editing the files again; first it's really fastidious and you don't want to do that but also it's an important source of errors.

Git allows you to undo it via command-line:
-    changes in your working dir: **git checkout -p** or **git checkout $file** (working dir)
-    changes in your staging area: **git reset -p** or **git reset $file**

the -p command allows you to revert blocks by blocks the changes made inside wyour files.

> git checkout -p

![](../pics/checkout_uncommitted.png)

> git reset first_file.py

![](../pics/reset_uncommitted.png)

A reset will only remove your file from the staging area to put back the changes in your working dir. If you want to completely revert it, you'll need to then checkout it too.

## Revert commit

When trying to revert a commit, it is really important to pay attention on if you already pushed it or not to the remote repository. if you did, be careful as it could be a real mess.. Use it with cautious.

Let's delete the first_file.py and commit our changes.

```
 rm first_file.py
 git add first_file.py
 git commit -m "Delete unused first_file.py"
 git log --oneline
```

![](../pics/delete_log.png)

We see the history of the commits we did. Note that origin/master corresponds to the commit that is currently on our remote repository while the HEAD -> master in the last commit on our local working directory.

Now, we saw that it was a mistake and didn't want to delete that file, we need to revert that commit.

> git revert <Hash of the commit: 6801610 in my case>

![](../pics/git_revert_0.png)

When you did the revert, like a commit, you're asked to provide a revert message.

![](../pics/revert_commit.png)

You can now see the commit history again and see that a new commit has been added.
> git log

![](../pics/git_logs_1.png)

## Modify commit







## Git

#### Branches in Git

#### Environment in Git

## Starting with Git

lorem ipsum ...

## Basics commands
