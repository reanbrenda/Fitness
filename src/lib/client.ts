import { getSdk } from "@/generated/graphql";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwudzzbi02zz07te2auwdw2a/master')

export const sdk = getSdk(client)