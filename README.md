# Niyog Zone

A full-featured job board connecting Candidates & Recruiters. Includes advanced
search, applications, company management, applicant tracking, and networking.

This application is in development. It has already included all the features listed in [Done Stories](#done-stories). But soon Its going to have all features listed in [All Stories](#all-stories) 🚀.

<a id="toc"></a>

## Table Of Content

- [Technologies](#tech)
- [Done Stories](#done-stories)
- [All Stories](#all-stories)
- [Technical Architecture](#tech-arc)

<a id="tech"></a>

## Technologies

Backend: `Typescript` `Nodejs` `Bunjs` `Expressjs` `Drizzle` `PostgreSQL` `Typescript` `GraphQL`

Frontend: `Figma` `Nextjs` `Tanstack Query` `TailwindCSS` `Shadcn` `Zustand` `React Hook Form` `Zod`

Devops: `CI/CD` `VPS` `Docker` `SSH` `Vim`

<a id="done-stories"></a>

## Done Stories

- user can search jobs through **filter**
- user can see jobs in different pages means added **advanced pagination**
- user can see **similar jobs**
- user can visit **company profile** from **job desc**
- user can register as **recruiter** or **candidate**
- candidate can **apply to jobs**
- user can **login**
- user can **edit own profile**
- candidate can see all the **applied jobs** on own profile
- candidate can see if the job is **accepted** or **rejected** or **pending**
- recruiter can see his **companies** and **jobs** in his profile
- recruiter can **create** and **edit** his **companies**
- recruiter can **create** and **edit** his **jobs**
- recruiter can see the **applicants** in jobs
- recruiter can **accept** or **reject applicants** in his jobs

- [Go to **Table Of Content**](#toc)

<a id="all-stories"></a>

## All Stories

- user can search jobs through **filter**
- user can see jobs in different pages means added **advanced pagination**
- user can see **similar jobs**
- user can visit **company profile** from **job desc**
- user can register as **recruiter** or **candidate**
- candidate can **apply** to jobs
- user can **login**
- user can **edit own profile**
- candidate can see all the **applied jobs** on own profile
- candidate can **add resume** in profile
- candidate can see if the job is **accepted** or **rejected** or **pending**
- candidate can **delete** the applied jobs from his profile
- recruiter can see his **companies** and **jobs** in his profile
- recruiter can **create** and **edit** his **companies**
- recruiter can **create** and **edit** his **jobs**
- recruiter can see the **applicants** in jobs
- recruiter can **accept** or **reject applicants** in his jobs
- candidate gets notified of **jobs alert**
- candidate can **save fav jobs**
- user can **make friends**
- user can **chat** with friends
- user can see **who viewed their profile**
- user can **search other user**

- [Go to **Table Of Content**](#toc)

<a id="tech-arc"></a>

## Technical Architectures

- Enforces **separation of concerns** in the frontend, isolating **state/logic (Container)** from **UI rendering (Presenter)** for high **reusability** and **testability**.
- Organizes the frontend codebase around **business domains** (e.g., products, auth), enhancing **modularity** and supporting **code splitting** for better **performance**.
- Guarantees **Atomicity** by ensuring a sequence of database operations either **completes entirely or fails entirely**, preserving **data integrity**.
- Enables complex server-side data **querying** based on **multiple criteria** (e.g., range, field, sort), essential for professional data **tables**.
- **Limits the number of records** returned in an API response, drastically improving application **performance** and **scalability** for **large datasets**.
- Implements a **standardized, predictable format** (e.g., statusCode, errorCode, message) for all **API error responses**, simplifying frontend handling and **logging**.
- Provides a **centralized mechanism** on the backend to **catch unhandled errors**, log details, and transform them into the custom error structure.
- Uses **stateless JSON Web Tokens (JWT)** to **verify user identity**, avoiding server-side **session management overhead**.
- Leverages **claims** within the JWT to determine the user's **permissions** and **restrict access** to specific API routes or resources.
- Utilizes an **uncontrolled component** approach to minimize component **re-renders** and provide highly **performant form management** in React.
- Integrates a **schema-based validation library** with RHF to enforce the **correct structure** and **type** of form data, ensuring **type safety**.
- Optimizes the build process by separating the **build environment** from the smaller **runtime environment**, resulting in **slimmer**, more **secure deployment images**.
- **Automates the entire release process**—from testing and image building to **deployment on the VPS**—ensuring **fast, reliable**, and **consistent rollouts**.
- Provides a **cost-effective** and **controlled environment** for hosting the **Dockerized application**, offering **dedicated resources** without the complexity of managed container services.

- [Go to **Table Of Content**](#toc)
