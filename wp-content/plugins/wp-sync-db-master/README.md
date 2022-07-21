# WP Sync DB

> Note: This is the combination of WP-Sync-DB and 2 of its Addons: Media Files and CLI.

Copy your database from one WP install to another with a few clicks in your dashboard.

Especially handy for syncing a local development database with a live site.

![](https://raw.github.com/hrsetyono/cdn/master/sync-db/migration-process.png)

**TABLE OF CONTENTS**

1. [How to Use](#how-to-use)
1. [Sync Media Files](#sync-media-files)
1. [WP-CLI Integration](#wp-cli-integration)
1. [Help Videos](#help-videos)
1. [How it Works](#how-it-works)
1. [Features Detail](#features-detail)

## How to Use

The guide below assume you're using it to sync online db with local one.

1. Install this plugin on BOTH your online and local installation.

1. In your online installation, go to Tools > Migrate DB > Settings tab. Tick all: "Accept pull", "Accept push", and "Enable SSL".

1. Copy the **Connection Info**.

1. In your local installation, go to Tools > Migrate DB > Migrate tab. Choose Pull or Push and paste in the Connection Info.

    > **PULL** means downloading the online db and use it to overwrite your local db.  
    > **PUSH** is uploading your local db to overwrite online db.

1. Configure the Search & Replace. Usually you also need to replace "https" to "http" or vice versa.

1. Click "Migrate DB" and wait for it to finish.

## Sync Media Files

Tick "Media Files" when pulling / pushing. 

![](https://raw.github.com/hrsetyono/cdn/master/sync-db/media-files.png)

Currently doesn't seem to work for multisite.

## WP-CLI Integration

1. First you need to install WP-CLI. ([Guide for Windows10 »](https://github.com/hrsetyono/wordpress/wiki/Installing-WP-CLI-on-Windows-10))

1. Create a migration profile in WP-Admin.

    ![](https://raw.github.com/hrsetyono/cdn/master/sync-db/profiles.png)

1. Choose the migration profile you want to do and take note of the number. You will use it in the command:

    ```
    wp wpsdb migrate [profile-number]
    ```

    For example `wp wpsdb migrate 2` will do the migration "Pull from example production".

-----

## Help Videos

| Title | Description | Link |
| --- | --- | --- |
| Feature Walkthrough | A brief walkthrough of the WP Sync DB plugin showing all of the different options and explaining them. | [Youtube](https://www.youtube.com/watch?v=u7jFkwwfeJc) |
| Pulling Live Data Into Your Local Development Environment | This screencast demonstrates how you can pull data from a remote, live WordPress install and update the data in your local development environment. | [Youtube](http://www.youtube.com/watch?v=IFdHIpf6jjc) |
| Pushing Local Development Data to a Staging Environment | This screencast demonstrates how you can push a local WordPress database you've been using for development to a staging environment. | [Youtube](http://www.youtube.com/watch?v=FjTzNqAlQE0) |
| Media Files Addon Demo | A short demo of how the [Media Files addon](https://github.com/hrsetyono/wp-sync-media) allows you to sync up your WordPress Media Libraries. | [Youtube](http://www.youtube.com/watch?v=0aR8-jC2XXM) |


## How it works

WP Sync DB exports your database as a MySQL data dump (much like phpMyAdmin), does a find and replace on URLs and file paths, then allows you to save it to your computer, or send it directly to another WordPress instance. It is perfect for developers who develop locally and need to move their WordPress site to a staging or production server.

## Features Detail

- **Selective Sync**

  WP Sync DB lets you choose which DB tables are migrated. Have a huge analytics table you'd rather not send? Simply deselect it and it won't be synced.

- **Pull: Replace a Local DB with a Remote DB**

  If you have a test site setup locally but you need the latest data from the production server, just install WP Sync DB on both sites and you can pull the live database down, replacing your local database in just a few clicks.

- **Push: Replace a Remote DB with a Local DB**

  If you're developing a new feature for a site that's already live, you likely need to tweak your settings locally before deploying. Once you've perfected your configuration on your development machine, it's easy to send the settings to your production server. Just push to the server, replacing your remote database with your local one.

- **Database Export & Backup**

  Not only can WP Sync DB pull and push your DB: it can export your DB to an SQL file that you can save and backup wherever you want. No need to ssh into your machine or open up phpMyAdmin.

- **Encrypted Transfers**

  All data is sent over SSL to prevent your database from being read during the transfer. WP Sync DB also uses HMAC encryption to sign and verify every request. This ensures that all requests are coming from an authorized server and haven't been tampered with en route.

- **Automatic Find & Replace**

  When migrating a WordPress site, URLs in the content, widgets, menus, etc need to be updated to the new site's URL. Doing this manually is annoying, time consuming, and very error-prone. WP Sync DB does all of this for you.

- **Stress Tested on Massive Sites**

  Huge database? No prob. WP Sync DB has been tested with tables several GBs in size.

- **Detect Limitations Automatically**

  WP Sync DB checks both the remote and local servers to determine limitations and optimize for performance. For example, we detect the MySQL `max_allowed_packet_size` and adjust how much SQL we execute at a time.