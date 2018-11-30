This is a Laravel-PHP port of the original portfolio by Roman Nurik ([here](https://github.com/romannurik/portfolio) )

You can find a demo of this application [here](https://laravel-portfolioapp.herokuapp.com), hosted on Heroku!


### Features

- Dynamic content, with projects and website info pulled from a database like MySQL or Postgres database.
- Add projects and website meta-data (title, description, footer, etc) by populating a simple JSON file.
- Enable/disable certain projects directly from database.
- Easy to setup, just clone and you're good to go!

### Instructions

1. Install [Laravel-PHP](https://laravel.com/docs/5.7).

2. Clone this repository
    ```
    git clone https://github.com/josephdalughut/laravel-portfolio.git
    ```

3. Rename the **.env.example** file in the root folder to **.env**
4. Generate an **APP_KEY** for your shiny new Laravel application.
    ```
    php artisan key:generate 
    ```
5. Populate your **.env** with your environment variables. You'll need to have a database (obviously) setup first. Either MySQL or PostGres db is fine:
    ```
    DB_CONNECTION=mysql #or pgsql for postgres
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=YOUR_DATABASE_NAME
    DB_USERNAME=YOUR_DATABASE_USERNAME
    DB_PASSWORD=YOUR_DATABASE_PASSWORD
    ```
    
    If you're deploying this somewhere other than on your localhost, you'll need to change the *DB_HOST* above to your database host.

6. Run migrations to populate your database with the tables needed.

    ```
    php artisan migrate
    ```

7. Seed the database with the initial dummy content provided by [Roman](https://github.com/romannurik/portfolio):

    ```
    php artisan db:seed
    ```

8. Serve / deploy your shiny new portfolio and look at it! Such awesomeness!
    ```
    php artisan serve
    ```
    
    
### Customizing the Portfolio

Once you have all setup, you'll probably want to add your own projects and modify other stuff such 
as the title, description, etc. of the page. 

#### Customizing Meta-data

There's a simple database structure which holds the following customizable parts of the portfolio:
- Title
- Subtitle
- Description
- Footer

You can either modify this from the database table called *"metas"* directly, or customize the json seeder file:

1. Open the file *database/seeds/meta.json*
2. Modify the json structure and add fields according to your taste:
    ```
    {
      "portfolio_title": "Your Custom new Title!",
      "portfolio_subtitle": "Some kind of Subtitles!",
      "portfolio_description": "A description which can include links like <a href=http://www.google.com>this</a>",
      "portfolio_footer": "A footer which can include links also, like <a href=http://www.google.com>this</a>"
    }
    ```
3. Seed your database. Be sure to delete previous content first if you've already seeded before
    ```
    php artisan migrate:refresh  // <- clears tables
    php artisan db:seed
    ```
    

#### Adding Projects

Each project has the following json structure:

- "title": A title for the project
- "description": A description for the project which can contain html content
- "start": A date formatted in the style *yyyy-mm-dd* specifying when the project started
- "end": A date formatted in the style *yyyy-mm-dd* specifying when the project ended. You can leave this empty.
- "ongoing": A boolean value specifying this project is currently in progress. This would show *ongoing* in the project subtitle.
- "actions": An object where each *key* is the title of the action and the *value* is the link to open when the action is clicked. for example:
    ```
    "actions": {
        "Action 1": "http://www.google.com",
        "Action 2": "http://www.google.com"
    }
    ```
    
- pages: An array of *project pages* to showcase some parts of the project. This naturally appears beside the project description if set, 
or is omitted if no pages are added. See the section below for more info about project pages.

#### Project Pages

Each project can have several pages which showcase parts of the project. Each page can house different content:
- A screenshot/video of a mobile app which can be framed with several devices.
- A screenshot/video of a website which can be framed in a browser device.
- An image or video without a frame.

Here are the customization options for each page:
- "background_color": Hex color for page background
- "foreground_color": Hex color for page foreground actions, e.g for play button
- "thumbnail": Path to placeholder image displayed in page. This would also be the placeholder for any additional video you add to the page
- "content_type": Type of content to display. Can be either **image** or **video**
- "content": Path to image/video to display in the page
- "device": An optional frame to embed the content (and thumbnail) above. Here are the options:
    ```
    device_browser              // browser frame
    device_browser_light        // light browser frame
    device_chromebook           // chromebook frame
    device_chromebook_light     // light chromebook frame
    device_nexus5               // nexus 5 frame
    device_nexus5_light         // light nexus 5 frame
    device_wear_round           // round wearable frame
    device_wear_round_light     // light wearable frame
    
    ```
- "style": Any additional html styles you want to add to page content.

You can populate projects by editing the json seeder file at *database/seeds/projects.json*. After that, just seed your database again to 
display content:

    php artisan migrate:refresh  // <- clears tables
    php artisan db:seed


You can look at the current json structure to understand better how to build your project pages.
    