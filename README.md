# Prozxt

Build your portfolio and documentation your important projects. Prozxt provides with a markdown editor so that you can design your portfolio with ease. (Block Editor coming soon)

## Why Use Prozxt

Most of the service that helps developers and designers to create a portfolio has a common problem. They do not provide any support to organize their portfolio and projects. Prozxt solves this problem by providing the developer and designer with a platform that only facilitates a portfolio and projects. The developer and designer can now easily showcase their portfolio and projects without worrying about messing their other profiles.

## Quick Start

You can visit **[Prozxt form here](https://prozxt.vercel.app/)**

To run the project on your local machine, see Contribute section.

## Technologies

Prozxt made with these following technologies:

- **[Nextjs](https://nextjs.org/)**
- **[Shadcn/ui](https://ui.shadcn.com/)**
- **[TailwindCSS](https://tailwindcss.com/)**
- **[prisma](https://www.prisma.io/)**
- **[Lucia Auth](https://lucia-auth.com/)**
- **[CockroachDB](https://www.cockroachlabs.com/)**

## Usage

1. Create portfolio with rich text editor
2. Describe the most important projects with rich text editor
3. Create post for about relevant topics.
4. Support projects.

## Contribute

To run the project on your local machine you need [git](https://git-scm.com/downloads), [nodejs](https://nodejs.org/en/download), [pnpm](https://pnpm.io/installation), and [cockroachDB](https://www.cockroachlabs.com/) or [cockroachDB binary](https://www.cockroachlabs.com/docs/releases/). make sure you have these installed in your system.

Now clone the project using the following command:

```
git clone https://github.com/StepAsideLiL/prozxt.git
```

When the cloning is completed, go to `prozxt` directory:

```
cd prozxt
```

Then run the following command to install all the dependencies:

```
pnpm i
```

Create a database called `prozxt` with `CockroachDB`. Create a `.env` to put `DATABASE_URL`. Since I am using local `CockroachDB`, my database url looks like this:

```
DATABASE_URL="postgresql://root@localhost:26257/prozxt?sslmode=disable"
```

Put appropriate url of your database.

Finally, the project is ready to run on your machine:

```
pnpm run dev
```

### If you find any bugs, please make an issue.

### If you want to contribute, please reach out to me. I will be happy to have you on my journey.
