# Job Stack
## _CV submission tracking application_

#### Live demo build: [https://jobstack-5nto.onrender.com/](https://jobstack-5nto.onrender.com/)
<hr />

Job Stack will be a cloud-enabled, mobile-ready,
ReactJS- and ExpressJS-powered web application.
- Easily add a record of applying for a job opening.
- You will always be informed about the submitted applications and won't submit an application twice.
- It's more convenient than Excel.
- ✨It adds fun to the tedious process.✨

>"Your time is limited, don't waste it living someone else's life." 
> Steve Jobs

## Features

- The record of the response to the vacancy is added in just two fields - the title and the main text description of the vacancy.
- You can simply copy and paste the text from the vacancy page into the main text field. No formatting is needed - the search always works!
- Instant search in one field simultaneously by title and description.
- It will take approximately 2 seconds to determine whether you have submitted an application there or not!
- Reliable data storage in PostgreSQL.
- Local and cloud data backup.

>"Success is not final, failure is not fatal: It is the courage to continue that counts."
>Winston Churchill

## Tech

Job Stack uses a number of open source projects to work properly:

- [ReactJS](https://react.dev/) - HTML enhanced for web apps! JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static typing and other advanced features for building scalable and maintainable applications.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- [Daisy UI](https://daisyui.com/) - A modern and user-friendly design system.
- [node.js](https://nodejs.org/) - A runtime environment for building scalable network applications.
- [Express](https://expressjs.com/) - Fast, minimalist web framework for Node.js.
- [PostgreSQL](https://www.postgresql.org/) - Powerful open-source relational database management system.


And of course Job Stack itself is open source with a [public repository](https://github.com/Rizz071)
 on GitHub.

## Installation

The Job Stack application consists of frontend and backend parts. It also requires a PostgreSQL database for operation.

The frontend startup commands are:
```
cd JobStack-frontend
npm install
npm run dev
```

The backend startup commands are:
```
cd JobStack-backend
npm install
npm run dev
```

## Development

Want to contribute? Great!
You are welcome!


## Docker

Job Stack is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

Be sure to swap out `${package.json.version}` with the actual
version of Job Stack.

## License

GPL

**Free Software, Hell Yeah!**
