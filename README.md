# ACE - Ops

## Tech
> NodeJS, ExpressJS, TypeScript, Nodemailer, Paseto-Auth Tokens, DrizzleORM,
PostgreSQL, Docker

## Overview
The server-side application serving the back-end requirements for 
Amrita Center for Entrepreneurship's website and administration portal. The 
server currently powers the following :

- Authentication
- Event Organization
- Attendance Management in Real-Time
- Mailing of Newsletters, Campaigns, etc. 
- Event Registration
- Payments and Transactions

A complete documentation for this application can be found [here](https://github.com/IAmRiteshKoushik/ace-docs)

## Setup
In order to get started with development on your local machine, make sure you 
have typescript installed globally.
```bash
npm i -g typescript
```
Clone the repository
```bash
# Using Git
git clone https://github.com/IAmRiteshKoushik/ace-ops
# Using GitHub CLI
gh repo clone IAmRiteshKoushik/ace-ops
```
Move into the root folder
```bash
cd ace-ops
```
Install required dependencies using `npm`, `pnpm` or `bun`
```bash
# Using npm
npm i
# Using pnpm
pnmp install
# Using bun
bun install
```
Fill in the required credentials inside `.env.example` and rename it to `.env`.
All required fields with default values are mentioned inside the file. Make sure
never to commit SECRETS and always `.gitignore` them.

To run the development server - `Nodemon`
```bash
nodemon
# The default port configured is 8080. Feel free to change it based 
# on your requirements.
```
To compile the typescript into a distributable and then run it
```bash
# Using npm (similar steps for pnpm and bun)
npm run build
node dist/index.js
```

## Authors
This application has been authored by - 
1. [Ritesh Koushik (ASC 2022-26)](https://github.com/IAmRiteshKoushik)
2. [Shrish Kumar Lohchab (ASC 2022-26)](https://github.com/Shrishkumar22)
