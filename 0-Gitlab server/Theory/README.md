# Installation Guide

## Section Contents

In this chapter we go through the different software needed in the course of this tutorial.
First section indicates the pre-requisite namely the list of tools required to run the exercises and illustrations of the course.
Then we will go through the set up of Gitlab. Gitlab is code collaboration & version controlling tool, as well as a DevOps platform. At first we describe how to set up Gitlab Server using Docker. Then we go further we the installation of Gitlab Runner, a component used to run CICD jobs.

* [Pre-requisite](#Pre-requisite)
  * [Git](#git)
  * [Docker](#docker)
  * [Maven](#maven)
  * [IDE](#IDE)
* [Gitlab Server](#gitlab-server)
  * [Pods states](#pods-state)
* [Gitlab Runner](#gitlab-runner)
  * [Multicontainers Pod](#multicontainers-pod)
  * [Temporary pods](#temporary-pods)
* [HANDS_ON](#hands_on)

## Pre-requisite

### Git

First we need to set up the version controlling software.

OS  |  Commands
--|--
linux (Ubuntu)  |  `sudo apt-get install git`
MacOs  |  `sudo brew install git`
Windows  |  https://git-scm.com/download/win

### Docker

Docker will be used to deploy Gitlab Server and Gitlab Runner on local machines.
An entire section of this course is dedicated to Docker. As a result we are not going to develop concepts around Docker in current chapter. We stick to the set up of Docker Community Edition.

On **Ubuntu**, these are the steps that should be taken:
```
sudo apt-get update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt install docker-ce
  ```

On **MacOs**, we advise to use [Docker Desktop](https://docs.docker.com/docker-for-mac/install/#install-and-run-docker-desktop-on-mac). The Docker Desktop installation includes `Docker Engine`, Docker `CLI` client, `Docker Compose`, Notary, `Kubernetes`, and Credential Helper.

On **Windows**, [Docker Desktop](https://docs.docker.com/docker-for-windows/install/) exists as well.

### Maven

Maven is a powerful project management tool that is based on POM (project object model). It is used for projects build, dependency and documentation. Primarily Maven is used to build `Java` and `Scala` projects, even though it's language agnostic.

Maven will be used to illustrate some CICD features with Java and Scala projects, this is why it's part of the programs required for this course.

OS  |  Commands
--|--
linux (Ubuntu)  |  `sudo apt-get install maven`
MacOs  |  `sudo brew install maven`
Windows  |  https://www.javatpoint.com/how-to-install-maven

### IDE

IDE stands for Integrated Development Environment. We strongly advise to have at least one IDE set up on your machine in order to be able to execute, test, modify... code base of the illustrations and exercises all along the course.

**Intellij** is pretty useful for Java and Scala projects in particular, especially to run Unit Tests.
**VSCode** or **Atom** are good complement/alternatives.


## Gitlab Server

The actions we are about to take in this sections are specific to this e-learning context.
Let's go back to the global git schema.

![](pics/global_git_shcema.png)

In this section I'll explain how to set up a gitlab server on your local machine.
In the very most of your projects, you will never be required to set up a git server.
Anyway, even if you are required to do so, the central repository should never be installed on your local laptop:

![](pics/git_archi.png)

In addition to the versioning features, a git server, either installed on premises or hosted in the cloud, must be configured as a central repository which offers security as well as the possibility of collaborative working.
As a result it will never be set up on the same machine as the developer's workstation.

The point here is to avoid polluting the B&D's gitlab instance, so your laptop will be used as a developer workstation along with a git central repository.

### 1.1 Gitlab Server on Docker

The set up of the gitlab server instance is done as a set of docker containers made up of 3 different micro services based on 3 different docker images:

- Gitlab: container running core gitlab instance including the web UI, the git repositories, ssh, administration of users, groups, CI coordinator...
- PostgreSql: RDBMS used to persist configuration of Gitlab
- Redis: Job queuing

Basically, those 3 containers will run through the Docker daemon running on the OS of your local workstation, next to the local codebase project(s) we will use as illustrations.

![docker compose local workstation](pics/gitlab_docker_system.png)

We could have installed Gitlab server and its components as regular applications directly on the workstation OS.
We chose docker because

- portability: whatever your laptop OS, as long as Docker Engine is installed we can use the same docker-compose.yml file to get it up and running
- isolation: processes are isolated so it's easy to start/stop it only when needed without affecting your other applications
- easy resource allocation



Gros trucs à retenir:

extrait du dcoker-compose.yaml:
```yml
services:
  gitlab:
    restart: always
    image: sameersbn/gitlab:13.11.3
    hostname: localhost
    depends_on:
    - redis
    - postgresql
    ports:
    - "10080:80"
    - "10022:22"
```

docker ps:
```yml
CONTAINER ID   IMAGE                              COMMAND                  CREATED       STATUS                PORTS                                                                                       NAMES
55c6d4eb3b9d   sameersbn/gitlab:13.11.3           "/sbin/entrypoint.sh…"   2 weeks ago   Up 4 days (healthy)   443/tcp, 0.0.0.0:10022->22/tcp, :::10022->22/tcp, 0.0.0.0:10080->80/tcp, :::10080->80/tcp   gitlab-docker_gitlab_1
f227704b0555   sameersbn/postgresql:12-20200524   "/sbin/entrypoint.sh"    2 weeks ago   Up 4 days             5432/tcp                                                                                    gitlab-docker_postgresql_1
5203e9bca26c   redis:5.0.9                        "docker-entrypoint.s…"   2 weeks ago   Up 4 days             6379/tcp                                                                                    gitlab-docker_redis_1
```

Then I typed the
`docker inspect <containerId>`
command for each of the container:
![](pics/gitlab_docker_inspect.png)

I clearly noticed that docker engine created its own bridge network within which the containers received an IP address and the gateway is the IP of the Engine/host.
