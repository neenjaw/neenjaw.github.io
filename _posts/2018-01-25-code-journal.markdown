---
layout: post
title: "Code Journal"
date: 2018-01-25 00:00:00 -0600
categories: coding
---

- Start Wes Bos’ 30-day challenge - Day 1 [done]
- RedHat Openshift Learning portal
- Getting Started with OpenShift for Developers
- CLI
- Dashboard

## Openshift Command Reference

- `oc login [--username <usr>] [--password <pw>] [url]`
- `oc whoami`
- `oc status`
- `oc logout`

- `oc new-project <project_name>`
- `oc project <project_name>`

- `oc config get-clusters`

- `oc adm policy add-role-to-user edit|view|admin <usr> -n <project>`

- `oc get all -o name`
- `oc get all --selector app=<appname> -o name`
- `oc delete`
- `oc expose`
- `oc describe`

## REST - Webdev Lecture 263/264

| Name    | Url            |  Verb  | Description                     | Mongoose properties                                        |
| ------- | -------------- | :----: | ------------------------------- | ---------------------------------------------------------- |
| INDEX   | /dogs          |  GET   | Display list of dogs            | Dog.find()                                                 |
| NEW     | /dogs/new      |  GET   | Displays form to make a new dog | N/A                                                        |
| CREATE  | /dogs          |  POST  | Add new dog to DB               | Dog.create                                                 |
| SHOW    | /dogs/:id      |  GET   | Shows info about one dog        | Dog.find({key:value}), Dog.findById()                      |
| EDIT    | /dogs/:id/edit |  GET   | Show Edit Form                  | Dog.find({key:value}), Dog.findById()                      |
| Update  | /dogs/:id      |  PUT   | Update dog, then redirect       | Dog.where({key:value}).update({}), Dog.findByIdAndUpdate() |
| Destroy | /dogs/:id      | DELETE | Delete a dog                    | Dog.where({key:value}).remove(), Dog.findByIdAndRemove()   |

Got the basic structure of the blog node/express/ejs/mongo/semantic-ui app started.
