import { jobQueries } from "./job.resolver.js";
import { userMutations } from "./user.resolver.js";

const resolvers = {
  Query: {
    ...jobQueries,
  },
    Mutation: {
      ...userMutations,
    },
};

export default resolvers;
