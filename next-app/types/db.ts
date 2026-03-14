import { BlogPostModel } from './blog'

export type DbClause = {
  keyword: string,
  predicate: DbClausePredicateValue | DbClausePredicateArray | DbClausePredicateEquality[],
}

export type DbClausePredicateValue = string
export type DbClausePredicateArray = string[]
export type DbClausePredicateEquality = {
  key: string,
  value: string,
}

export type DbWhereCondition = DbClausePredicateEquality

export type DbQuery = string
export type DbQueryStatement = string

export type DbQueryValue = string
export type DbQueryValues = DbQueryValue[]

export type DbBlogPost = BlogPostModel
