# Oracle Rest Data Services - NodeJS API

This package allows a user to call a Oracle REST Data Service using standards based REST processes. It exposes processes
to allow for calling:

- GET
- PUT
- POST
- DELETE

## GET

There are a few types of messages you can create using this package.

- You can call a method to get all entities
- You can call a method to get one entity
- You can call methods to filter using the query string

> All of these methods other than the GET one allow for paging. See the documentation on **offset** and **limit** to
> understand more about how to page results.

### Paging

Each GET method allows for request parameters. The request parameters look like the following:

````
interface IOrdsPagingParams {
    offset: number
    limit: number
}
````

Setting the offset, tells the ORDS server to skip that number of records.
Setting the limit tells the ORDS server how many records to take

### Responses

There is one main response returned by the API: IResponse. However, the IResponse
does contain a child response that mimics a call to an ORDS enabled API.

#### IResponse

The main response from a call to an ORDS API is an IResponse.
This interface defines both a response from an ORDS API and an error. If the call was successful,
the response will have an IOrdsResponse object in the ordsResponse property. If an error occurred pre,
during or post call, the error property will be valued.

````
export interface IResponse<T extends IEntity> {
  ordsResponse: IOrdsResponse<T>
  error?: AxiosError
}
````

#### IOrdsResponse

This is the value returned by the ORDS API. It tells you if the
call was successful by containing a list of items of type T.  **T must extend IEntity.**  The entity type should have an
id property.
This property should be the identifier of the row in the table/view.
The rest of the properties are self-explanatory. The limit is the number
of items returned by the call. The offset is the page. hasMore tells the caller
if there are any more items. The count tells the caller the number or entities returned
by the call. The links property contain relationship definitions of the entity. An example
of a link would be the following:

````
{
  "rel"; "self",
  "url": "https://ordsAPI.com/admin/entity/1
}
````

The below is the current definition of the IOrdsResponse interface

````
export interface IOrdsResponse<T extends IEntity> {
  items: T[]
  hasMore: boolean
  limit: number
  offset: number
  count: number
  links: IOrdsLink[]
}
````
