/**
 * This defines an entity.  All entities calling ORDS services, by default, must have an id property.  The id property must be a number and be unique,
 */
export default interface IEntity {
  id: number
}
