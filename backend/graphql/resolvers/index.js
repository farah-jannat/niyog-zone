import {
  applicationMutations,
  applicationQueries,
} from "./application.resolver.js";
import { companyMutations, companyQueries } from "./company.resolver.js";
import { jobMutations, jobQueries } from "./job.resolver.js";
import { userMutations } from "./user.resolver.js";

const resolvers = {
  Query: {
    ...jobQueries,
    ...companyQueries,
    ...applicationQueries,
  },
  Mutation: {
    ...userMutations,
    ...jobMutations,
    ...companyMutations,
    ...applicationMutations,
  },
};

export default resolvers;
