
# Branching

## Section Contents

Here is an example of content sections with titles, subtitles. Important to integrate fully guide hands-on sections.

* [Branches](#Branches)
  * [Introduction](#Introduction)
  * [Practical](#Practical)
* [Checkout](#Checkout)
* [Merging and graph](#Merging-And-Graph)
* [Push](#Push-a-branch)
* [Conflicts](#Rollback to past commit)
* [Merge requests](#merge-requests)
* [More advanced notions](#More-advanced-notions)
  * [stash](#Stash)
  * [Fast forward merge](#Fast-forward-merge)
  * [fetch and pull](#Fetch-and-pull)
  * [rebase](#Rebase)
* [Key commands](#Key commands)


## Branches

#### Introduction

Software development is often not linear:

    We typically need at least one version of the code to “work” (to compile, to give expected results, …).
    At the same time we work on new features, often several features concurrently. Often they are unfinished.
    We need to be able to separate different lines of work really well.

The strength of version control is that it permits the researcher to isolate different tracks of work, which can later be merged to create a composite version that contains all changes.

In the following example, we can see the development of two new features that are finally merged in the master branch. Note that the two merges below can happened at a different time.

![](../pics/octopus.png)

- Main line development is often called master.
- Other than this convention there is nothing special about master, it is just a branch.
- Commits form a directed acyclic graph.

**A group of commits that create a single narrative are called a branch.** There are different branching strategies, but it is useful to think that a branch tells **the story of a feature**, e.g. “fast sequence extraction” or “Python interface” or “fixing bug in matrix inversion algorithm”.

In practice, you will try to only develop one feature per branch for better versioning.

#### Practical

Let's check our current branch:
> git branch



- This command shows where we are, it does not create a branch.
- There is only master and we are on master (star represents the HEAD).

Creation of a new branch called *section-four* and setting it at your current branch

```
git branch section-four
git checkout section-four
```
*it is also possible to directly create and checkout to it with:*
> git checkout **-b** section-four

By re-doing `git branch` we can observe that we now have two branches and that the `HEAD` is on the newly branch


## Checkout

We saw that `git checkout` can be used in quite some occasions with git:

- Switch to a branch (-b for creating it):
`git checkout <branch_name>`

- Bring the working tree to a specific commit:
`git checkout <commit_hash>`

- Set a path/file to a specific state (to throw away all unstaged/uncommitted changes):
`git checkout <path/file>`

Picture git checkout as an operation that brings the working tree to a specific state. The state can be a commit or a branch (pointing to a commit).

TODO add illustrations

## Merging and Graph

Merging a branch into another one is the action of **adding all the commits** (and their changes) into **another branch**.

What happens internally when you merge two branches is that Git **creates a new commit**, attempts to **incorporate changes from both branches** and records the state of all files in the new commit. While a regular commit has one parent, a merge commit has two (or more) parents.

You can create alias in Git, let's create one for visualizing the logs with some specific params.
> git config --global alias.graph "log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all"

> git graph

![](../pics/graph_00.png)


Now from `section-four` and do two successive commits. Then, we will checkout back to `master` and do one commit to finally merge `section-four` into `master`. Let's look at the graph generated afterwards.


```
touch file1.sh
git add .
git commit -m "section four file 1 creation"

touch file2.scala
git add .
git commit -m "section four file 2 creation"

git checkout master
touch file3.js
git add .
git commit -m "creation of file 3 onb master for section four"

git merge section-four
git graph
```
![](../pics/graph_22.png)

We see in the `git graph` output below that we can visualize the different branches, the commits we made and when the merge happened between our branches:

- (HEAD -> master): status of the branch master locally, it refers to the last commit used when we did the `git merge`

- (section-four): the branch we created and we can see from which commits it started (**8095618** in our case)

- (origin/master): the commit that corresponds to master on the remote server (Gitlab server in our case).

![](../pics/graph_11.png)

You can see all the branch merged into the current branch with:
`git branch --merged`

## Push a branch

From the branch master, push your changes :
> git push

Now go to `Gitlab-server` and check if your branch has been `section-four` has been versionned.

![](../pics/branch_0.png)

The `section-four` branch does not exist on gitlab server. By default `git push` will push the branch on which you are checked out.

You can either `git checkout section-four && git push` or `git push origin section-four`.

![](../pics/push_0.png)

we can now see both of the branch on gitlat server.

![](../pics/branch_1.png)





## Conflicts

It's great we saw how we can develop a new functionnality without impacting the current code. **Yet, what happen if two developers while developing their features both make a change to the same file or even to the same functions?**

Git will create what is call a conflict and ask you to solve it. Let's see it via an example:

We will create two branches and delete a file on one of them while modifying that same file in the second branch. Finally we will try to merge them.
As Git can't know which version is correct or not, it will ask us to decide.

```
git branch firstChange
git branch secondChange

git checkout firstChange
rm file1.sh
git add .
git commit -m "Delete file1.sh for creating conflict"

git checkout secondChange
ls
echo "some changes for conflicts" >> file1.sh
git status
git add .
git commit -m "Change file1.sh for creating conflict"

git merge firstChange
git status
```

When switching to our second branch as it was created from the master branch, we can see that the file is not deleted and we can make a change into it.

![](../pics/conflicts_00.png)


In our two branches, we made changes to the same file so if we try to merge our branches how can Git knows which version should be kept. We just created a conflict that we need to solve by **committing** it in order to **complete the merge**.
In the following example, we decided to keep the file.

![](../pics/conflicts_11.png)


#### Illustrations

In the example above, we deleted a file in one branch and make a modification in the same file in the other branch before merging them.

What happen if in two different branches, we make some changes to the same lines in a file? How will we fix the conflicts.

 - checkout to the `master` branch, create two branches `firstConflict` and `secondConflict`, on each branch do a modification to the same line of a file and commit it. Finally merge `secondConflict` into `firstConflict`.


 **Can you solve the conflicts and successfully merge the two branches ?**

 > Hint: if you open the project in a IDE, it could help, you should select the adequate version.



## MERGE REQUEST


## More advanced notions

#### Stash


- **Create a stash**

Sometimes you've been working on changes on a branch but you've been asked to deploy quickly a hotfix for a production issue. You can't commit your current work cause it's not tested and not complete.
You need to `stash` your work.

    Stashing is handy if you need to quickly switch context and work on something else,
    but you're mid-way through a code change and aren't quite ready to commit.

First let's see what happens when you have unstaged work and you switch from one branch (`secondChange` in the example) to master.

```
git checkout secondChange
echo "some changes to stash" >> first_file.py
git checkout master
git status
```

![](../pics/stash_0.png)

As seen your unstagged changes are also moved to master. If we delete them on master by checking them out as seen on the 3-Recovery section, if see that they are no longer available on the branch `secondChange`.

![](../pics/stash_1.png)

We need to stash them, we can see it as a temporary commit to which we can refer afterwards.

```
echo "some changes to stash" >> first_file.py
git stash
git status
```

![](../pics/stash_00.png)

After stashing, the status of the branch is the one before we did the unstagged changes. We can create a second change and stash it as well but by giving the name we want for better identifying it.

```
echo "another change to stash" >> third_file.js
git stash save "second stash for demo"
```
![](../pics/stash_save_0.png)

As we now have several stash, we can list them and access one or the other by their name. If not specifying in a stash argument, **by default it will take the latest stash ref**.

![](../pics/stash_list_0.png)

***Note: for stashing untracked file, you need to specify `-u`***

- **access a stash**

You can do a diff on a stash ref.

> git stash show -p

![](../pics/stash_diff_0.png)

> git stash show -p stash@{1}

![](../pics/stash_diff_1.png)

You can then take back your changes by using:

     git stash pop <stash_ref> or default to latest one,
     this will restore your changes and delete the stash

     git stash apply <stash_ref> or default to latest one,
     this will restore your changes and keep the ref

Let's try it:
```
git stash pop stash@{1}
git stash apply
```
![](../pics/stash_pop_0.png)

By listing the stash, only one remains.

```
git stash list
```

![](../pics/stash_list_2.png)

We can also go to a complete different branch and restore the changes of the remaining stash.

Let's commit our current work on secondChange first, then checkout to master and restore the work.

![](../pics/stash_master_0.png)

We can also have a look at the graph and see that it starts to be a bit more complex. We have several branches besides `master` but also our `ref/stash`

![](../pics/graph_stash_0.png)

TODO: add section about ff merge, rebase and fetch

https://stackoverflow.com/questions/34526346/git-pull-asks-me-to-write-merge-message

git pull is basically two actions at once: git fetch followed by a git merge (unless you use git pull --rebase, in which case you can guess what happens).

The reason you're seeing this is because Git can't do a fast-forward merge, like it can most of the time. The reason for that is usually because you've git committed locally to the branch you're trying to pull, and now you need to merge the remote changes with your local ones.

It's also worth noting that Git pre-populated the merge message for you, so you don't really need to type anything. Just save and exit, and the merge should be complete. (Unless, of course, there are merge conflicts).

#### Fast forward merged

@PH TODO

#### Fetch and pull

@PH TODO

#### Rebase

@PH TODO




TODO:

- create new branch
- git graph
=> exo several branches (master, feature_branch)
- switch branch with uncommited changes (git stash => https://www.atlassian.com/git/tutorials/saving-changes/git-stash)

- merge request (USER1 DEV 1, user2 REVIEWER)
- merge request with conflicts

- delete branch after merge request

## SUMMARY

#### Key commands

```
git branch <branch_name>          => create a new branch
git branch --merged               => see the branch and the merged ones
git checkout <branch_name>        => switch to an existing branch
git config --global alias.<alias_name> "<git command>"  => create an alias for git
git push <destination> <branch>   => undo staged changes by blocks
git merge <branch>                => merge a branch into your current git git fetch                         =>
git pull                          =>
git rebase                        =>
git stash                         =>
```

#### Next sections

You can now go to the next sections: [4-Branching](4-Branching)
