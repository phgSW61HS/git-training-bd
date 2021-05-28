# Introduction

## Section Contents

Here is an example of content sections with titles, subtitles. Important to integrate fully guide hands-on sections.

* [Workspace](#Workspace)

## Workspace

The workspace is the place were we store our files. Git gives us an idea of what is in our workspace. Basically it is our folder.
We have different way of modifying the state of our workspace: create, edit or delete an existing file.

One role of Git is therefore to take track of those modifications between your workplace (your local repository) and the git versionned repo.
On the previous introduction section, we created a repository and we commited two files (first_file.py and second_file.txt).
By doing a commit for those two files, we tell Git that the versionned repo should contain those two files with the content that was on it at that time.

Right now, if we edit/delete those two files or create a new file, we don't have the same version between our local repository and what Git commited (the status of the file Git saved).
Let's do some modification and see for each of them the **git status**

```
  cd /home/username/testGit
  git status
  echo "first edit" > first_file.py
  rm second_file.txt
  echo "test" > third_file.js
  git status

```
![](../pics/status_workspace_0.png)

Git is pointing out the difference between our local folders and the versioned folder. It is divided into two areas, the changes that need to be staged and the untracked file.

![](../pics/areas_0.jpg)

In a directory, the

Unmodified: This file is identical in the workspace and in currently checked-out commit in the repository.

Modified: This file is present in both workspace and repository, but is different.

Staged: This file is in the workspace, current commit, and stage. Note that the file can be different in all three locations.

Untracked: This file is in the workspace, but not in the current commit.
