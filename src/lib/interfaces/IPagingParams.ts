/**
 * This defines the params that tell ORDS how to page results
 */
export default interface IPagingParams {
  /**
   * The number of records to take from the database
   */
  limit: number
  /**
   * The number of records to skip
   */
  offset: number
}
